// Instant Lead Responder: tracked booking link from the reply and follow-up emails.
//   GET ?t=<lead token>  →  302 to the client's booking page
// Records the first click so the follow-up isn't sent to people who already went to book.
import { db } from '../_shared/licenses.ts';

const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://futurelabs.africa';
const TOKEN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const redirect = (to: string) => new Response(null, { status: 302, headers: { Location: to, 'Cache-Control': 'no-store' } });

Deno.serve(async (req) => {
  if (req.method !== 'GET') return new Response('Method not allowed', { status: 405 });
  const token = new URL(req.url).searchParams.get('t') ?? '';
  if (!TOKEN.test(token)) return redirect(SITE_URL);

  try {
    const supabase = db();
    const { data: lead } = await supabase
      .from('leads')
      .select('id, booking_clicked_at, lead_clients(booking_url)')
      .eq('token', token)
      .maybeSingle<{ id: string; booking_clicked_at: string | null; lead_clients: { booking_url: string } | null }>();
    if (!lead?.lead_clients) return redirect(SITE_URL);

    if (!lead.booking_clicked_at) {
      await supabase.from('leads').update({ booking_clicked_at: new Date().toISOString(), follow_up_at: null }).eq('id', lead.id);
    }
    return redirect(lead.lead_clients.booking_url);
  } catch (err) {
    console.error('lead-book', err);
    return redirect(SITE_URL);
  }
});
