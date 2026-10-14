// Email-gated download for research briefings (Research page, #ai-economy-briefing).
//   POST { email, consent: true, website }  →  { downloadUrl }
// `website` is a honeypot: when it's filled we answer as if it worked and do nothing.
// Records consent in `briefing_signups`, adds the contact to the Resend segment,
// emails the link with an unsubscribe link, and returns a 48-hour signed URL to
// the PDF in the private `briefings` bucket.
import { isEmail, json, preflight } from '../_shared/http.ts';
import { db } from '../_shared/licenses.ts';
import { sendEmail } from '../_shared/email.ts';
import { contactsConfigured, ProviderError, upsertContact } from '../_shared/contacts.ts';

const SOURCE = 'ai-economy-briefing';
const TITLE = 'The AI Economy: Structure, Fragility and Opportunity';
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://futurelabs.africa';
const LINK_TTL = 48 * 3600;

// Per-instance limit: 5 sign-ups per IP per 10 minutes.
const hits = new Map<string, { count: number; reset: number }>();
function allowed(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now > h.reset) {
    hits.set(ip, { count: 1, reset: now + 600_000 });
    return true;
  }
  return ++h.count <= 5;
}

async function signedPdf(supabase: ReturnType<typeof db>) {
  const path = Deno.env.get('BRIEFING_PDF_PATH') ?? 'ai-economy-briefing-2026-10.pdf';
  const { data, error } = await supabase.storage.from('briefings').createSignedUrl(path, LINK_TTL, { download: path });
  if (error || !data) throw new Error(`signed URL failed: ${error?.message}`);
  // Hand out the link on our own domain (proxied by netlify.toml, which adds X-Robots-Tag: noindex).
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!.replace(/\/$/, '');
  return data.signedUrl.startsWith(`${supabaseUrl}/storage/v1/`)
    ? `${SITE_URL}/api/storage/${data.signedUrl.slice(`${supabaseUrl}/storage/v1/`.length)}`
    : data.signedUrl;
}

function confirmationEmail(downloadUrl: string, unsubscribeUrl: string) {
  const text = `Thanks for requesting ${TITLE}.

Download the briefing (PDF, link works for 48 hours):
${downloadUrl}

If the link has expired, request a new one at ${SITE_URL}/research-labs#ai-economy-briefing

You're getting this because you asked for the briefing on futurelabs.africa and agreed to research updates from FutureLabs.
Unsubscribe: ${unsubscribeUrl}

FutureLabs Africa · ${SITE_URL}`;

  const html = `<!doctype html><html><body style="margin:0;background:#FAF8F3;font-family:Helvetica,Arial,sans-serif;color:#2E2C27">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-top:3px solid #F58220">
<tr><td style="padding:32px 28px">
<p style="margin:0 0 12px;font:500 11px monospace;letter-spacing:.16em;text-transform:uppercase;color:#B85A0B">FutureLabs Intelligence</p>
<h1 style="margin:0 0 16px;font-size:24px;line-height:1.15;color:#14130F">${TITLE}</h1>
<p style="margin:0 0 24px;font-size:15px;line-height:1.6">Thanks for requesting the briefing. Your download link works for 48 hours.</p>
<p style="margin:0 0 24px"><a href="${downloadUrl}" style="display:inline-block;background:#F58220;color:#0C0C0A;padding:15px 24px;font-size:14px;font-weight:600;text-decoration:none">Download the PDF</a></p>
<p style="margin:0;font-size:13px;line-height:1.6;color:#5C5952">Link expired? <a href="${SITE_URL}/research-labs#ai-economy-briefing" style="color:#B85A0B">Request a new one</a>.</p>
</td></tr></table>
<p style="max-width:560px;margin:16px auto 0;font-size:12px;line-height:1.6;color:#6B675F">You're getting this because you asked for the briefing on futurelabs.africa and agreed to research updates from FutureLabs.
<a href="${unsubscribeUrl}" style="color:#6B675F">Unsubscribe</a>.</p>
</td></tr></table></body></html>`;
  return { text, html };
}

Deno.serve(async (req) => {
  const early = preflight(req);
  if (early) return early;

  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!allowed(ip)) return json({ error: 'Too many requests. Please try again in a few minutes.' }, 429);

    const body = await req.json().catch(() => ({}));
    // Honeypot filled: look successful, record nothing.
    if (typeof body.website === 'string' && body.website.trim()) return json({ downloadUrl: '' });

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!isEmail(email)) return json({ error: 'Enter a valid email address.' }, 400);
    if (body.consent !== true) return json({ error: 'Please agree to receive the briefing by email.' }, 400);

    const consentAt = new Date().toISOString();
    const supabase = db();

    const { data: row, error } = await supabase
      .from('briefing_signups')
      .upsert({ email, source: SOURCE, consent_at: consentAt, unsubscribed_at: null }, { onConflict: 'email,source' })
      .select('unsubscribe_token')
      .single();
    if (error || !row) throw new Error(`signup not saved: ${error?.message}`);

    if (contactsConfigured()) {
      await upsertContact(email, { source: SOURCE, consent_at: consentAt });
    } else {
      console.warn('contact not synced (RESEND_API_KEY or RESEND_SEGMENT_ID not set)');
    }

    const downloadUrl = await signedPdf(supabase);
    const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${row.unsubscribe_token}`;
    const oneClick = `${SITE_URL}/api/briefing-unsubscribe?token=${row.unsubscribe_token}`;
    const { text, html } = confirmationEmail(downloadUrl, unsubscribeUrl);
    // The visitor already has the link on screen, so a failed email doesn't fail the request.
    await sendEmail(email, `Your briefing: ${TITLE}`, text, {
      html,
      from: Deno.env.get('BRIEFING_EMAIL_FROM') ?? 'FutureLabs Intelligence <research@futurelabs.africa>',
      headers: { 'List-Unsubscribe': `<${oneClick}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
    });

    return json({ downloadUrl });
  } catch (err) {
    console.error('briefing-signup', err);
    if (err instanceof ProviderError) {
      return json({ error: "We couldn't add you to our list just now. Please try again in a minute." }, 502);
    }
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
});
