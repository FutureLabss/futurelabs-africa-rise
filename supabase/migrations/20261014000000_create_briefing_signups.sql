-- Sign-ups for email-gated research briefings (Research page).
-- Only the briefing-signup / briefing-unsubscribe edge functions write here
-- (service role); admins can read and delete, because the list holds personal data.

CREATE TABLE IF NOT EXISTS public.briefing_signups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- Stored lower-cased by the edge function.
    email TEXT NOT NULL CHECK (char_length(email) <= 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
    -- Which briefing, e.g. 'ai-economy-briefing'.
    source TEXT NOT NULL CHECK (char_length(source) <= 60),
    -- When the visitor ticked the consent box (latest sign-up).
    consent_at TIMESTAMP WITH TIME ZONE NOT NULL,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    unsubscribe_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,

    UNIQUE (email, source)
);

CREATE INDEX IF NOT EXISTS briefing_signups_created_at_idx ON public.briefing_signups (created_at DESC);

ALTER TABLE public.briefing_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view briefing signups" ON public.briefing_signups
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can delete briefing signups" ON public.briefing_signups
    FOR DELETE USING (public.is_admin());

-- Private bucket for briefing PDFs; files are only reachable through signed URLs.
-- Upload ai-economy-launch/ai-economy-briefing-2026-10.pdf here.
INSERT INTO storage.buckets (id, name, public)
VALUES ('briefings', 'briefings', false)
ON CONFLICT (id) DO NOTHING;
