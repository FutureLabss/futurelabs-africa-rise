// Instant Lead Responder: email templates and the tracked booking link.
// Used by lead-intake (instant reply + business alert) and lead-followups.

const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://futurelabs.africa';

export type LeadClient = {
  id: string;
  slug: string;
  name: string;
  notify_email: string;
  booking_url: string;
  reply_intro: string;
  follow_up_hours: number;
  allowed_origins: string[];
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  page_url: string | null;
  token: string;
};

/** Goes through lead-book, which records the click and redirects to the client's booking page. */
// Token in the path, not the query: Netlify's proxy copies a query string onto the
// redirect, which would leak it into the client's booking page URL.
export const bookingLink = (lead: Lead) => `${SITE_URL}/api/lead-book/${lead.token}`;

export const firstName = (name: string) => name.trim().split(/\s+/)[0] || 'there';

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Short, safe excerpt of what the enquirer wrote, so the reply shows it was read. */
function excerpt(message: string | null) {
  const m = (message ?? '').replace(/\s+/g, ' ').trim();
  if (!m) return '';
  return m.length > 160 ? `${m.slice(0, 157).trimEnd()}...` : m;
}

function shell(client: LeadClient, inner: string, footer: string) {
  return `<!doctype html><html><body style="margin:0;background:#F6F5F2;font-family:Helvetica,Arial,sans-serif;color:#2E2C27">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:28px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:6px">
<tr><td style="padding:28px 26px;font-size:15px;line-height:1.6">${inner}</td></tr></table>
<p style="max-width:560px;margin:14px auto 0;font-size:12px;line-height:1.6;color:#6B675F">${footer}</p>
</td></tr></table></body></html>`;
}

function button(href: string, label: string) {
  return `<p style="margin:22px 0"><a href="${href}" style="display:inline-block;background:#14130F;color:#FFFFFF;padding:13px 22px;border-radius:4px;font-size:14px;font-weight:600;text-decoration:none">${label}</a></p>`;
}

/** Sent to the enquirer seconds after they submit. */
export function instantReply(client: LeadClient, lead: Lead) {
  const link = bookingLink(lead);
  const said = excerpt(lead.message);
  const subject = `We received your message, ${firstName(lead.name)}`;
  const text = `Hi ${firstName(lead.name)},

${client.reply_intro}
${said ? `\nYou wrote: "${said}"\n` : ''}
The quickest way to speak with us is to book a time that suits you:
${link}

If you'd rather we contact you, simply reply to this email.

${client.name}

You're receiving this because you contacted ${client.name}. Reply STOP and we won't email you again.`;

  const html = shell(
    client,
    `<p style="margin:0 0 14px">Hi ${esc(firstName(lead.name))},</p>
<p style="margin:0 0 14px">${esc(client.reply_intro)}</p>
${said ? `<p style="margin:0 0 14px;padding:12px 14px;background:#F6F5F2;border-left:3px solid #C9C4B8;color:#5C5952">You wrote: "${esc(said)}"</p>` : ''}
<p style="margin:0">The quickest way to speak with us is to book a time that suits you:</p>
${button(link, 'Book a time')}
<p style="margin:0 0 14px">If you'd rather we contact you, simply reply to this email.</p>
<p style="margin:0">${esc(client.name)}</p>`,
    `You're receiving this because you contacted ${esc(client.name)}. Reply STOP and we won't email you again.`,
  );
  return { subject, text, html };
}

/** Sent once, follow_up_hours later, if the enquirer hasn't opened the booking link. */
export function followUp(client: LeadClient, lead: Lead) {
  const link = bookingLink(lead);
  const subject = `Following up on your message to ${client.name}`;
  const text = `Hi ${firstName(lead.name)},

Just checking you saw our reply. We'd be glad to help, and you can pick a time to speak here:
${link}

Or reply to this email with a good time to reach you.

${client.name}

Reply STOP and we won't email you again.`;
  const html = shell(
    client,
    `<p style="margin:0 0 14px">Hi ${esc(firstName(lead.name))},</p>
<p style="margin:0">Just checking you saw our reply. We'd be glad to help, and you can pick a time to speak here:</p>
${button(link, 'Book a time')}
<p style="margin:0 0 14px">Or reply to this email with a good time to reach you.</p>
<p style="margin:0">${esc(client.name)}</p>`,
    'Reply STOP and we won\'t email you again.',
  );
  return { subject, text, html };
}

/** Sent to the business the moment a lead arrives. Replying goes straight to the enquirer. */
export function leadAlert(client: LeadClient, lead: Lead) {
  const subject = `New enquiry: ${lead.name}`;
  const rows: [string, string][] = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone ?? '-'],
    ['Page', lead.page_url ?? '-'],
    ['Message', lead.message ?? '-'],
  ];
  const text = `New website enquiry for ${client.name}.

${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}

They've already received an instant reply with your booking link. Reply to this email to answer them directly.

Instant Lead Responder by FutureLabs`;
  const html = shell(
    client,
    `<p style="margin:0 0 14px;font-weight:600">New website enquiry for ${esc(client.name)}</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px">
${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6B675F;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}
</table>
<p style="margin:18px 0 0;color:#5C5952">They've already received an instant reply with your booking link. Reply to this email to answer them directly.</p>`,
    'Instant Lead Responder by FutureLabs · futurelabs.africa',
  );
  return { subject, text, html };
}
