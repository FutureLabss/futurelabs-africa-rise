// Customer emails go through Resend when RESEND_API_KEY is set. Without it,
// emails are skipped: buyers still see their key on the checkout page and
// Paystack still sends its own receipts.
// Returns false if Resend rejected the email (true when sent or skipped).
export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  opts: { html?: string; headers?: Record<string, string>; from?: string; replyTo?: string } = {},
) {
  const key = Deno.env.get('RESEND_API_KEY');
  if (!key) {
    console.warn(`email skipped (no RESEND_API_KEY): ${subject}`);
    return true;
  }
  const from = opts.from ?? Deno.env.get('EMAIL_FROM') ?? 'FutureLabs Studio <studio@futurelabs.africa>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, text, ...(opts.html ? { html: opts.html } : {}), ...(opts.headers ? { headers: opts.headers } : {}), ...(opts.replyTo ? { reply_to: opts.replyTo } : {}) }),
  });
  if (!res.ok) {
    console.error('email failed', res.status, await res.text());
    return false;
  }
  return true;
}
