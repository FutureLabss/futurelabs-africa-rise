// Creates a Paystack Plan for every row in `product_prices` that doesn't have one
// yet, and saves the plan code back to the row. Run once with the test secret key
// and again with the live key (plans don't carry over between modes):
//
//   PAYSTACK_SECRET_KEY=sk_test_... SUPABASE_URL=https://<ref>.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=... deno run --allow-net --allow-env supabase/scripts/paystack-sync-plans.ts
//
// Rows in a currency the Paystack account can't take (USD until Paystack enables
// it) fail and are left without a plan code; checkout then charges the NGN price.
// Switching between test and live keys? Clear the codes first:
//   UPDATE product_prices SET paystack_plan_code = NULL;
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const NAMES: Record<string, string> = { newstheme: 'NewsTheme Pro', 'futurelabs-ai-seo': 'FutureLabs AI SEO Pro' };
const secret = Deno.env.get('PAYSTACK_SECRET_KEY');
const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
if (!secret) throw new Error('Set PAYSTACK_SECRET_KEY');

const { data: rows, error } = await supabase.from('product_prices').select('*').is('paystack_plan_code', null).eq('active', true);
if (error) throw error;
console.log(`${rows.length} price(s) without a Paystack plan`);

for (const row of rows) {
  const name = `${NAMES[row.product] ?? row.product} – ${row.tier} (${row.sites === null ? 'unlimited sites' : `${row.sites} site${row.sites > 1 ? 's' : ''}`}) – ${row.interval}ly ${row.currency}`;
  const res = await fetch('https://api.paystack.co/plan', {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      amount: row.amount,
      currency: row.currency,
      interval: row.interval === 'year' ? 'annually' : 'monthly',
    }),
  });
  const body = await res.json();
  if (!res.ok || !body.status) {
    console.error(`✗ ${name}: ${body.message}`);
    continue;
  }
  await supabase.from('product_prices').update({ paystack_plan_code: body.data.plan_code }).eq('id', row.id);
  console.log(`✓ ${name}: ${body.data.plan_code}`);
}
