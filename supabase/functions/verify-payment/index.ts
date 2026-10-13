// Called by /studio/checkout/complete after Paystack redirects back. Verifies the
// transaction with Paystack and creates the license if the webhook hasn't yet.
import { json, preflight } from '../_shared/http.ts';
import { paystack } from '../_shared/paystack.ts';
import { applyFirstCharge, db, publicLicense } from '../_shared/licenses.ts';

Deno.serve(async (req) => {
  const early = preflight(req);
  if (early) return early;

  try {
    const { reference } = await req.json();
    if (typeof reference !== 'string' || !/^fl_[a-f0-9]{32}$/.test(reference)) {
      return json({ error: 'Unknown payment reference.' }, 400);
    }

    const tx = await paystack(`/transaction/verify/${encodeURIComponent(reference)}`);
    const supabase = db();
    const result = await applyFirstCharge(supabase, tx);
    if (!result) return json({ error: 'Unknown payment reference.' }, 404);
    if ('error' in result && result.error) return json({ error: result.error }, 402);
    if (!result.license) return json({ error: 'Your payment went through. Your license is still being created; refresh in a minute.' }, 202);

    return json({ license: await publicLicense(supabase, result.license), email: result.license.email });
  } catch (err) {
    console.error('verify-payment:', err);
    return json({ error: 'Could not check this payment. Refresh to try again.' }, 500);
  }
});
