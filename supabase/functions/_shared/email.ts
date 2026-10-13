// Customer emails go through Resend when RESEND_API_KEY is set. Without it,
// emails are skipped: buyers still see their key on the checkout page and
// Paystack still sends its own receipts.
export async function sendEmail(to: string, subject: string, text: string) {
  const key = Deno.env.get('RESEND_API_KEY');
  if (!key) {
    console.warn(`email skipped (no RESEND_API_KEY): ${subject}`);
    return;
  }
  const from = Deno.env.get('EMAIL_FROM') ?? 'FutureLabs Studio <studio@futurelabs.africa>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });
  if (!res.ok) console.error('email failed', res.status, await res.text());
}
