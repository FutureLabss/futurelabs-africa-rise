// Paystack events. Set this function's URL as the webhook in the Paystack
// dashboard (Settings → API Keys & Webhooks). Every handler is safe to run
// twice, because Paystack retries until it gets a 200.
import { json } from '../_shared/http.ts';
import { verifySignature } from '../_shared/paystack.ts';
import { applyFirstCharge, applyRenewal, db, productName } from '../_shared/licenses.ts';
import { sendEmail } from '../_shared/email.ts';

const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://futurelabs.africa';

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const raw = await req.text();
  if (!(await verifySignature(raw, req.headers.get('x-paystack-signature')))) {
    return json({ error: 'Invalid signature' }, 401);
  }

  const { event, data } = JSON.parse(raw);
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
          // Usually arrives just before charge.success has created the license; ask Paystack to retry.
          const { count } = await supabase
            .from('licenses')
            .select('id', { count: 'exact', head: true })
            .eq('paystack_subscription_code', data.subscription_code);
          if (!count) return json({ error: 'License not created yet' }, 409);
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
    return json({ error: 'Handler failed' }, 500);
  }

  return json({ received: true });
});
