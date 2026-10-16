// Instant Lead Responder: sends the single follow-up to leads that haven't opened the booking link.
//   POST (header x-cron-secret)  →  { sent, failed }
// Run every 15 minutes by the lead-followups pg_cron job, which reads the secret from
// Vault; lead_cron_secret_ok() checks it, so the value never leaves the database.
// Leads are claimed before sending (follow_up_at cleared), so overlapping runs never
// email anyone twice.
import { json } from '../_shared/http.ts';
import { db } from '../_shared/db.ts';
import { sendEmail } from '../_shared/email.ts';
import { followUp, type Lead, type LeadClient } from '../_shared/leads.ts';

const FROM_ADDRESS = Deno.env.get('LEAD_EMAIL_FROM_ADDRESS') ?? 'replies@futurelabs.africa';
const BATCH = 50;

type DueLead = Lead & { lead_clients: LeadClient | null };

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const supabase = db();
  const { data: authorized } = await supabase.rpc('lead_cron_secret_ok', { s: req.headers.get('x-cron-secret') ?? '' });
  if (authorized !== true) return json({ error: 'Unauthorized' }, 401);

  const { data: due, error } = await supabase
    .from('leads')
    .select('id, name, email, phone, message, page_url, token, lead_clients!inner(id, slug, name, notify_email, booking_url, reply_intro, follow_up_hours, allowed_origins, active)')
    .lte('follow_up_at', new Date().toISOString())
    .is('followed_up_at', null)
    .is('booking_clicked_at', null)
    .is('closed_at', null)
    .eq('lead_clients.active', true)
    .limit(BATCH)
    .returns<DueLead[]>();
  if (error) {
    console.error('lead-followups query', error);
    return json({ error: 'query failed' }, 500);
  }

  let sent = 0;
  let failed = 0;
  for (const lead of due ?? []) {
    const client = lead.lead_clients;
    if (!client) continue;
    // Claim it: only one run can clear follow_up_at for this row.
    const { data: claimed } = await supabase
      .from('leads')
      .update({ follow_up_at: null })
      .eq('id', lead.id)
      .not('follow_up_at', 'is', null)
      .select('id');
    if (!claimed?.length) continue;

    const mail = followUp(client, lead);
    const ok = await sendEmail(lead.email, mail.subject, mail.text, {
      html: mail.html,
      from: `${client.name.replace(/["<>]/g, '')} <${FROM_ADDRESS}>`,
      replyTo: client.notify_email,
    });
    if (ok) {
      await supabase.from('leads').update({ followed_up_at: new Date().toISOString() }).eq('id', lead.id);
      sent++;
    } else {
      failed++;
    }
  }
  return json({ sent, failed });
});
