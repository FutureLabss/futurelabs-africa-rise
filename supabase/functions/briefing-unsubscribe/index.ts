// Unsubscribes a briefing contact by the token in their emails.
//   POST { token }                       from /unsubscribe (the link in the email body)
//   POST ?token=…  List-Unsubscribe=One-Click   from mail clients (RFC 8058 one-click)
import { json, preflight } from '../_shared/http.ts';
import { db } from '../_shared/licenses.ts';
import { contactsConfigured, unsubscribeContact } from '../_shared/contacts.ts';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  const early = preflight(req);
  if (early) return early;

  try {
    let token = new URL(req.url).searchParams.get('token') ?? '';
    if (!token && req.headers.get('content-type')?.includes('application/json')) {
      const body = await req.json().catch(() => ({}));
      token = typeof body.token === 'string' ? body.token : '';
    }
    if (!UUID.test(token)) return json({ error: 'This unsubscribe link is not valid.' }, 400);

    const supabase = db();
    const { data: rows, error } = await supabase
      .from('briefing_signups')
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq('unsubscribe_token', token)
      .select('email');
    if (error) throw error;
    if (!rows?.length) return json({ error: 'This unsubscribe link is not valid.' }, 404);

    if (contactsConfigured()) await unsubscribeContact(rows[0].email);
    return json({ ok: true });
  } catch (err) {
    console.error('briefing-unsubscribe', err);
    return json({ error: 'Something went wrong. Please try again, or reply to any of our emails.' }, 500);
  }
});
