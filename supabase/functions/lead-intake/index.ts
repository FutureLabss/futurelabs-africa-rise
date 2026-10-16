// Instant Lead Responder: receives a website enquiry for a client business.
//   POST { client, name, email, phone?, message?, page?, website }  →  { ok: true }
// `client` is the business's public slug from the embed script. `website` is a honeypot:
// when it's filled we answer as if it worked and do nothing.
// Stores the lead, emails the enquirer an instant reply with a tracked booking link,
// alerts the business (reply-to set to the enquirer) and schedules one follow-up.
import { isEmail, json, preflight } from '../_shared/http.ts';
import { db } from '../_shared/licenses.ts';
import { sendEmail } from '../_shared/email.ts';
import { instantReply, leadAlert, type Lead, type LeadClient } from '../_shared/leads.ts';

const FROM_ADDRESS = Deno.env.get('LEAD_EMAIL_FROM_ADDRESS') ?? 'replies@futurelabs.africa';

// Per-instance limit: 5 enquiries per IP per 10 minutes.
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

const field = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// The business's name in the From line, our verified domain in the address.
const fromLine = (client: LeadClient) => `${client.name.replace(/["<>]/g, '')} <${FROM_ADDRESS}>`;

Deno.serve(async (req) => {
  const early = preflight(req);
  if (early) return early;

  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!allowed(ip)) return json({ error: 'Too many requests. Please try again in a few minutes.' }, 429);

    const body = await req.json().catch(() => ({}));
    if (typeof body.website === 'string' && body.website.trim()) return json({ ok: true });

    const slug = field(body.client, 40).toLowerCase();
    const name = field(body.name, 120);
    const email = field(body.email, 254).toLowerCase();
    const phone = field(body.phone, 40) || null;
    const message = field(body.message, 4000) || null;
    const page = field(body.page, 500) || null;

    if (!name) return json({ error: 'Please enter your name.' }, 400);
    if (!isEmail(email)) return json({ error: 'Enter a valid email address.' }, 400);

    const supabase = db();
    const { data: client } = await supabase
      .from('lead_clients')
      .select('id, slug, name, notify_email, booking_url, reply_intro, follow_up_hours, allowed_origins')
      .eq('slug', slug)
      .eq('active', true)
      .maybeSingle<LeadClient>();
    if (!client) return json({ error: 'This form is not set up yet.' }, 404);

    const origin = req.headers.get('origin');
    if (client.allowed_origins.length && (!origin || !client.allowed_origins.includes(origin))) {
      return json({ error: 'This form is not set up for this website.' }, 403);
    }

    const followUpAt = new Date(Date.now() + client.follow_up_hours * 3600_000).toISOString();
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({ client_id: client.id, name, email, phone, message, page_url: page, follow_up_at: followUpAt })
      .select('id, name, email, phone, message, page_url, token')
      .single<Lead>();
    if (error || !lead) throw new Error(`lead not saved: ${error?.message}`);

    const reply = instantReply(client, lead);
    const alert = leadAlert(client, lead);
    const [replied, notified] = await Promise.all([
      sendEmail(email, reply.subject, reply.text, { html: reply.html, from: fromLine(client), replyTo: client.notify_email }),
      sendEmail(client.notify_email, alert.subject, alert.text, {
        html: alert.html,
        from: `Instant Lead Responder <${FROM_ADDRESS}>`,
        replyTo: email,
      }),
    ]);

    const now = new Date().toISOString();
    await supabase
      .from('leads')
      .update({ replied_at: replied ? now : null, notified_at: notified ? now : null })
      .eq('id', lead.id);

    // The lead is saved either way, so the visitor sees success even if an email failed.
    return json({ ok: true });
  } catch (err) {
    console.error('lead-intake', err);
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
});
