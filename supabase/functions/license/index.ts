// Public license API, used by the Pro add-ons inside WordPress and by /studio/account.
//   activate   { key, site_url }  use one of the license's site slots
//   deactivate { key, site_url }  free a slot
//   check      { key, site_url }  status + latest version (+ download URL when valid and activated)
//   manage     { key, email }     everything the buyer may see, plus a Paystack link to cancel or change card
import { isEmail, json, preflight } from '../_shared/http.ts';
import { paystack } from '../_shared/paystack.ts';
import { db, latestRelease, licenseState, publicLicense, signedDownload, sitesLabel } from '../_shared/licenses.ts';

const hits = new Map<string, { count: number; reset: number }>();
function allowed(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now > h.reset) {
    hits.set(ip, { count: 1, reset: now + 3_600_000 });
    return true;
  }
  return ++h.count <= 120;
}

/** "https://www.Example.com/blog/" → "www.example.com/blog" */
function normaliseSite(v: unknown): string | null {
  if (typeof v !== 'string' || !v.trim()) return null;
  try {
    const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
    return `${u.host.toLowerCase()}${u.pathname.replace(/\/+$/, '')}`.slice(0, 255);
  } catch {
    return null;
  }
}

/** Subscription code from the webhook, or looked up on the Paystack customer if that webhook was missed. */
async function subscriptionCode(supabase: ReturnType<typeof db>, license: any): Promise<string | null> {
  if (license.paystack_subscription_code) return license.paystack_subscription_code;
  if (!license.paystack_customer_code) return null;
  const customer = await paystack(`/customer/${encodeURIComponent(license.paystack_customer_code)}`);
  const sub = (customer.subscriptions ?? []).find((s: any) => s.plan?.plan_code === license.paystack_plan_code);
  if (!sub) return null;
  await supabase
    .from('licenses')
    .update({ paystack_subscription_code: sub.subscription_code, paystack_email_token: sub.email_token })
    .eq('id', license.id);
  return sub.subscription_code;
}

Deno.serve(async (req) => {
  const early = preflight(req);
  if (early) return early;

  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!allowed(ip)) return json({ error: 'Too many requests. Try again later.' }, 429);

    const body = await req.json();
    const key = typeof body.key === 'string' ? body.key.trim().toUpperCase() : '';
    if (!/^FL-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key)) {
      return json({ error: 'That license key is not valid.' }, 400);
    }

    const supabase = db();
    const { data: license } = await supabase.from('licenses').select('*').eq('key', key).maybeSingle();
    if (!license) return json({ error: 'That license key is not valid.' }, 404);
    const state = licenseState(license);

    switch (body.action) {
      case 'activate': {
        const site = normaliseSite(body.site_url);
        if (!site) return json({ error: 'Send the site URL.' }, 400);
        if (!state.valid) return json({ error: `This license has ${state.status === 'revoked' ? 'been revoked' : 'expired'}.`, ...state }, 403);
        const { data: sites } = await supabase.from('license_activations').select('site_url').eq('license_id', license.id);
        const used = (sites ?? []).map((s) => s.site_url);
        if (!used.includes(site)) {
          if (license.max_sites !== null && used.length >= license.max_sites) {
            return json({ error: `This license is already active on ${sitesLabel(license.max_sites)}. Deactivate one first.`, sites: used }, 409);
          }
          await supabase.from('license_activations').insert({ license_id: license.id, site_url: site });
        }
        return json({ activated: true, site, ...state, max_sites: license.max_sites, sites_used: used.includes(site) ? used.length : used.length + 1 });
      }

      case 'deactivate': {
        const site = normaliseSite(body.site_url);
        if (!site) return json({ error: 'Send the site URL.' }, 400);
        await supabase.from('license_activations').delete().match({ license_id: license.id, site_url: site });
        return json({ deactivated: true, site });
      }

      case 'check': {
        const site = normaliseSite(body.site_url);
        const { count } = site
          ? await supabase.from('license_activations').select('site_url', { count: 'exact', head: true }).match({ license_id: license.id, site_url: site })
          : { count: 0 };
        const activated = !!count;
        const release = await latestRelease(supabase, license.product);
        const download = state.valid && activated ? await signedDownload(supabase, license.product) : null;
        return json({ ...state, product: license.product, activated, latest_version: release?.version ?? null, download_url: download?.url ?? null });
      }

      case 'manage': {
        if (!isEmail(body.email) || body.email.trim().toLowerCase() !== license.email.toLowerCase()) {
          return json({ error: 'That email and license key do not match.' }, 404);
        }
        let manage_link: string | null = null;
        try {
          const code = await subscriptionCode(supabase, license);
          if (code) manage_link = (await paystack(`/subscription/${encodeURIComponent(code)}/manage/link`)).link ?? null;
        } catch (err) {
          console.error('manage link failed:', err);
        }
        return json({ license: await publicLicense(supabase, license), manage_link });
      }

      default:
        return json({ error: 'Unknown action.' }, 400);
    }
  } catch (err) {
    console.error('license:', err);
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
});
