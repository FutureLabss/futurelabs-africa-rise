-- Instant Lead Responder: run lead-followups every 15 minutes.
-- The shared secret is generated here and kept in Vault; the edge function verifies it
-- through lead_cron_secret_ok(), which only the service role can call.

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

SELECT vault.create_secret(encode(extensions.gen_random_bytes(32), 'hex'), 'lead_cron_secret',
    'x-cron-secret for the lead-followups edge function')
WHERE NOT EXISTS (SELECT 1 FROM vault.secrets WHERE name = 'lead_cron_secret');

CREATE OR REPLACE FUNCTION public.lead_cron_secret_ok(s TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT coalesce(length(s) > 0 AND s = (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'lead_cron_secret'), false);
$$;

REVOKE ALL ON FUNCTION public.lead_cron_secret_ok(TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.lead_cron_secret_ok(TEXT) TO service_role;

SELECT cron.unschedule('lead-followups') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'lead-followups');
SELECT cron.schedule(
    'lead-followups',
    '*/15 * * * *',
    $$
    SELECT net.http_post(
        url := 'https://xgemmlbsmmqwysatmbvz.supabase.co/functions/v1/lead-followups',
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'lead_cron_secret')
        ),
        body := '{}'::jsonb
    );
    $$
);
