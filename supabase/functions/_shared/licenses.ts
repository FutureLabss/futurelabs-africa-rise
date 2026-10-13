import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { planCodeOf } from './paystack.ts';
import { sendEmail } from './email.ts';

export const db = () => createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
type DB = ReturnType<typeof db>;

export const GRACE_DAYS = 7;
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://futurelabs.africa';
const PRODUCT_NAMES: Record<string, string> = {
  newstheme: 'NewsTheme Pro',
  'futurelabs-ai-seo': 'FutureLabs AI SEO Pro',
};
export const productName = (id: string) => PRODUCT_NAMES[id] ?? id;
/** max_sites null = unlimited. */
export const sitesLabel = (n: number | null) => (n === null ? 'unlimited sites' : `${n} site${n > 1 ? 's' : ''}`);

// No 0/O/1/I so keys can be read out or typed without mistakes.
const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
export function generateKey() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const chars = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
  return `FL-${chars.match(/.{4}/g)!.join('-')}`;
}

export function addInterval(from: Date, interval: string) {
  const d = new Date(from);
  if (interval === 'year') d.setUTCFullYear(d.getUTCFullYear() + 1);
  else d.setUTCMonth(d.getUTCMonth() + 1);
  return d;
}

/** A license works until GRACE_DAYS after the paid period ends, unless an admin revoked it. */
export function licenseState(license: { status: string; period_end: string }) {
  const validUntil = new Date(new Date(license.period_end).getTime() + GRACE_DAYS * 86_400_000);
  const valid = license.status !== 'revoked' && validUntil > new Date();
  return { valid, valid_until: validUntil.toISOString(), status: valid ? license.status : license.status === 'revoked' ? 'revoked' : 'expired' };
}

export async function latestRelease(supabase: DB, product: string) {
  const { data } = await supabase
    .from('pro_releases')
    .select('version, storage_path, released_at')
    .eq('product', product)
    .order('released_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

/** Latest Pro build as a 10-minute signed URL, or null if none is uploaded yet. */
export async function signedDownload(supabase: DB, product: string) {
  const release = await latestRelease(supabase, product);
  if (!release) return null;
  const { data, error } = await supabase.storage.from('pro-downloads').createSignedUrl(release.storage_path, 600);
  if (error) {
    console.error('signed URL failed', error.message);
    return null;
  }
  return { version: release.version, url: data.signedUrl };
}

/** What a buyer is allowed to see about their own license. */
export async function publicLicense(supabase: DB, license: any) {
  const [{ data: sites }, download] = await Promise.all([
    supabase.from('license_activations').select('site_url, activated_at').eq('license_id', license.id),
    signedDownload(supabase, license.product),
  ]);
  const state = licenseState(license);
  return {
    key: license.key,
    product: license.product,
    product_name: productName(license.product),
    tier: license.tier,
    interval: license.interval,
    max_sites: license.max_sites,
    sites: sites ?? [],
    period_end: license.period_end,
    renews: license.status === 'active' || license.status === 'past_due',
    ...state,
    download,
  };
}

async function waitForLicense(supabase: DB, orderId: string) {
  // Another request (webhook vs. checkout page) may be creating it right now.
  for (let i = 0; i < 5; i++) {
    const { data } = await supabase.from('licenses').select('*').eq('first_order_id', orderId).maybeSingle();
    if (data) return data;
    await new Promise((r) => setTimeout(r, 400));
  }
  return null;
}

/**
 * Turns a successful checkout transaction into a license. Safe to call more than
 * once for the same reference: only the call that moves the order from pending
 * to paid creates the license; the others return it.
 * Returns null when the reference isn't one of our checkouts (a renewal).
 */
export async function applyFirstCharge(supabase: DB, tx: any) {
  const { data: order } = await supabase.from('orders').select('*').eq('reference', tx.reference).maybeSingle();
  if (!order || order.kind !== 'first') return null;
  if (order.status === 'paid') return { license: await waitForLicense(supabase, order.id), order };

  if (tx.status !== 'success') return { error: `Payment ${tx.status ?? 'not completed'}`, order };
  if (tx.amount !== order.amount || String(tx.currency).toUpperCase() !== order.currency) {
    console.error('amount mismatch', { reference: tx.reference, got: [tx.amount, tx.currency], want: [order.amount, order.currency] });
    await supabase.from('orders').update({ status: 'failed', paystack_payload: tx }).eq('id', order.id).eq('status', 'pending');
    return { error: 'Payment amount did not match the order', order };
  }

  const { data: claimed } = await supabase
    .from('orders')
    .update({ status: 'paid', paystack_payload: tx })
    .eq('id', order.id)
    .eq('status', 'pending')
    .select('id');
  if (!claimed?.length) return { license: await waitForLicense(supabase, order.id), order };

  const { data: price } = await supabase
    .from('product_prices')
    .select('sites, paystack_plan_code')
    .match({ product: order.product, tier: order.tier, interval: order.interval, currency: order.currency })
    .single();

  const row = {
    first_order_id: order.id,
    email: order.email,
    name: order.name,
    product: order.product,
    tier: order.tier,
    interval: order.interval,
    currency: order.currency,
    amount: order.amount,
    // A missing price row should never grant unlimited sites.
    max_sites: price ? price.sites : 1,
    period_end: addInterval(new Date(), order.interval).toISOString(),
    paystack_customer_code: tx.customer?.customer_code ?? null,
    paystack_plan_code: planCodeOf(tx) ?? price?.paystack_plan_code ?? null,
  };
  let license = null;
  for (let attempt = 0; attempt < 3 && !license; attempt++) {
    const { data, error } = await supabase.from('licenses').insert({ ...row, key: generateKey() }).select('*').single();
    if (error) console.error('license insert failed', error.message);
    license = data;
  }
  if (!license) throw new Error(`Could not create a license for order ${order.id}`);
  await supabase.from('orders').update({ license_id: license.id }).eq('id', order.id);

  const name = productName(license.product);
  await sendEmail(
    license.email,
    `Your ${name} license key`,
    [
      `Thanks for subscribing to ${name}.`,
      '',
      `License key: ${license.key}`,
      `Plan: ${license.tier} (${sitesLabel(license.max_sites)}), billed every ${license.interval}`,
      '',
      `Download the Pro add-on and manage your subscription at ${SITE_URL}/studio/account`,
      'In WordPress, install the add-on, then paste your key on its settings page.',
    ].join('\n'),
  );
  return { license, order };
}

/** An automatic renewal charge: extend the matching license by one billing period. */
export async function applyRenewal(supabase: DB, tx: any) {
  const planCode = planCodeOf(tx);
  const customer = tx.customer?.customer_code;
  if (!planCode || !customer) return false;
  const { data: license } = await supabase
    .from('licenses')
    .select('*')
    .match({ paystack_customer_code: customer, paystack_plan_code: planCode })
    .neq('status', 'revoked')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!license) return false;

  // The unique reference makes a replayed webhook a no-op.
  const { data: inserted } = await supabase
    .from('orders')
    .upsert(
      {
        reference: tx.reference,
        email: license.email,
        name: license.name,
        product: license.product,
        tier: license.tier,
        interval: license.interval,
        currency: String(tx.currency).toUpperCase(),
        amount: tx.amount,
        status: 'paid',
        kind: 'renewal',
        license_id: license.id,
        paystack_payload: tx,
      },
      { onConflict: 'reference', ignoreDuplicates: true },
    )
    .select('id');
  if (!inserted?.length) return true;

  const from = new Date(Math.max(new Date(license.period_end).getTime(), Date.now()));
  await supabase
    .from('licenses')
    .update({ period_end: addInterval(from, license.interval).toISOString(), status: 'active' })
    .eq('id', license.id);
  return true;
}
