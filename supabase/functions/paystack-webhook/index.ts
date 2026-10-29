// Paystack events. Set this function's URL as the webhook in the Paystack
// dashboard (Settings → API Keys & Webhooks). Every handler is safe to run
// twice, because Paystack retries until it gets a 200.
//
// Paystack allows one webhook URL per account and mode, and other FutureLabs
// systems on the same account need the events too. Every signed event is
// forwarded unchanged (same body and signature) to the URLs in the
// PAYSTACK_FORWARD_URLS secret (comma-separated, https only). If our handling
// or any forward fails we answer 500, so Paystack retries for everyone; the
// receivers must therefore be idempotent, as Paystack already requires.
import { json } from '../_shared/http.ts';
import { verifySignature } from '../_shared/paystack.ts';
import { applyFirstCharge, applyRenewal, db, productName } from '../_shared/licenses.ts';
import { sendEmail } from '../_shared/email.ts';

const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://futurelabs.africa';

const FORWARD_URLS = (Deno.env.get('PAYSTACK_FORWARD_URLS') ?? '')
  .split(',')
  .map((u) => u.trim())
  .filter((u) => /^(https:\/\/|http:\/\/localhost[:/])[^\s]+$/.test(u))
  // Never forward to ourselves: that would loop.
  .filter((u) => !u.includes('/functions/v1/paystack-webhook'));

/** Pass a signed event on, byte for byte, so the receiver can verify Paystack's signature. */
async function forward(raw: string, signature: string): Promise<boolean> {
  const results = await Promise.allSettled(
    FORWARD_URLS.map(async (url) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-paystack-signature': signature },
        body: raw,
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`${new URL(url).host} answered ${res.status}`);
    }),
  );
  const failed = results.filter((r) => r.status === 'rejected') as PromiseRejectedResult[];
  for (const f of failed) console.error('paystack-webhook forward failed:', String(f.reason));
  return failed.length === 0;
}

/** Our own handling of an event; returns false when it failed and Paystack should retry. */
async function handle(event: string, data: any): Promise<boolean> {
  const supabase = db();

  try {
    switch (event) {
      case 'charge.success': {
        const first = await applyFirstCharge(supabase, data);
        if (!first && !(await applyRenewal(supabase, data))) {
          console.warn('charge.success matched no order or license', data.reference);
        }
        break;
      }

      case 'subscription.create': {
        const { data: license } = await supabase
          .from('licenses')
          .select('id')
          .match({ paystack_customer_code: data.customer?.customer_code, paystack_plan_code: data.plan?.plan_code })
          .is('paystack_subscription_code', null)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (!license) {
          // Other FutureLabs products (e.g. the OpportunityLab Portal) share this Paystack
          // account; a plan we never sold is theirs, not a license still being created.
          const { count: ours } = await supabase
            .from('product_prices')
            .select('product', { count: 'exact', head: true })
            .eq('paystack_plan_code', data.plan?.plan_code ?? '');
          if (!ours) break;
          // Usually arrives just before charge.success has created the license; ask Paystack to retry.
          const { count } = await supabase
            .from('licenses')
            .select('id', { count: 'exact', head: true })
            .eq('paystack_subscription_code', data.subscription_code);
          if (!count) return false; // Not created yet: let Paystack retry.
          break;
        }
        await supabase
          .from('licenses')
          .update({ paystack_subscription_code: data.subscription_code, paystack_email_token: data.email_token })
          .eq('id', license.id);
        break;
      }

      case 'invoice.payment_failed': {
        const code = data.subscription?.subscription_code;
        const { data: license } = await supabase
          .from('licenses')
          .update({ status: 'past_due' })
          .eq('paystack_subscription_code', code)
          .eq('status', 'active')
          .select('email, product')
          .maybeSingle();
        if (license) {
          await sendEmail(
            license.email,
            `Your ${productName(license.product)} renewal didn't go through`,
            `We couldn't charge your card for ${productName(license.product)}. Your license keeps working for 7 more days.\n\nUpdate your card at ${SITE_URL}/studio/account`,
          );
        }
        break;
      }

      case 'subscription.not_renew':
      case 'subscription.disable': {
        await supabase
          .from('licenses')
          .update({ status: 'cancelled' })
          .eq('paystack_subscription_code', data.subscription_code)
          .neq('status', 'revoked');
        break;
      }
    }
  } catch (err) {
    console.error(`paystack-webhook ${event}:`, err);
    return false;
  }
  return true;
}


Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const raw = await req.text();
  if (!(await verifySignature(raw, req.headers.get('x-paystack-signature')))) {
    return json({ error: 'Invalid signature' }, 401);
  }

  const { event, data } = JSON.parse(raw);
  const [handled, forwarded] = await Promise.all([
    handle(event, data),
    forward(raw, req.headers.get('x-paystack-signature') ?? ''),
  ]);
  if (!handled || !forwarded) return json({ error: 'Not processed everywhere yet' }, 500);
  return json({ received: true });
});
