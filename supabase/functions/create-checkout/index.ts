// Starts a Paystack checkout for a Pro tier. Prices come from `product_prices`,
// never from the browser. Passing the plan code makes Paystack create the
// subscription after the first charge, so renewals happen automatically.
import { isEmail, json, preflight } from '../_shared/http.ts';
import { paystack } from '../_shared/paystack.ts';
import { db } from '../_shared/licenses.ts';

const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://futurelabs.africa';

const hits = new Map<string, { count: number; reset: number }>();
function allowed(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now > h.reset) {
    hits.set(ip, { count: 1, reset: now + 3_600_000 });
    return true;
  }
  return ++h.count <= 20;
}

Deno.serve(async (req) => {
  const early = preflight(req);
  if (early) return early;

  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!allowed(ip)) return json({ error: 'Too many attempts. Try again in an hour.' }, 429);

    const { product, tier, interval, currency, email, name } = await req.json();
    if (!isEmail(email)) return json({ error: 'Enter a valid email address.' }, 400);
    if (typeof product !== 'string' || !['personal', 'business', 'agency'].includes(tier) || !['month', 'year'].includes(interval)) {
      return json({ error: 'Unknown plan.' }, 400);
    }
    const wanted = currency === 'USD' ? 'USD' : 'NGN';

    const supabase = db();
    const { data: prices } = await supabase
      .from('product_prices')
      .select('*')
      .match({ product, tier, interval, active: true })
      .not('paystack_plan_code', 'is', null);
    // Until Paystack enables USD on the account there are no USD plans, so charge the naira price.
    const price = prices?.find((p) => p.currency === wanted) ?? prices?.find((p) => p.currency === 'NGN');
    if (!price) return json({ error: 'This plan is not on sale yet.' }, 404);

    const reference = `fl_${crypto.randomUUID().replace(/-/g, '')}`;
    const cleanName = typeof name === 'string' && name.trim() ? name.trim().slice(0, 120) : null;
    const { error: insertError } = await supabase.from('orders').insert({
      reference,
      email: email.trim().toLowerCase(),
      name: cleanName,
      product,
      tier,
      interval,
      currency: price.currency,
      amount: price.amount,
    });
    if (insertError) throw insertError;

    const checkout = await paystack<{ authorization_url: string }>('/transaction/initialize', {
      method: 'POST',
      body: {
        email: email.trim().toLowerCase(),
        amount: String(price.amount),
        currency: price.currency,
        plan: price.paystack_plan_code,
        // Only cards give Paystack a reusable authorization, so only cards can renew
        // the subscription automatically. Bank, transfer or USSD would pay once and
        // then fail at renewal.
        channels: ['card'],
        reference,
        callback_url: `${SITE_URL}/studio/checkout/complete`,
        metadata: { product, tier, interval, name: cleanName, cancel_action: `${SITE_URL}/studio#${product}` },
      },
    });

    return json({ authorization_url: checkout.authorization_url, reference, currency: price.currency });
  } catch (err) {
    console.error('create-checkout:', err);
    return json({ error: 'Could not start checkout. Please try again.' }, 500);
  }
});
