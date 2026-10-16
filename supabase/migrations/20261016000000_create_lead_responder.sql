-- Instant Lead Responder: answers website enquiries for client businesses within seconds,
-- notifies the business, and follows up once if the enquirer hasn't opened the booking link.
-- Only the lead-* edge functions write here (service role); admins can read and manage.

CREATE TABLE IF NOT EXISTS public.lead_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- Public key used by the embed script, e.g. 'button-law'.
    slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]{2,40}$'),
    -- Business name shown in emails, e.g. 'The Button Law Firm'.
    name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
    -- Where new-lead alerts go.
    notify_email TEXT NOT NULL CHECK (char_length(notify_email) <= 254),
    -- Consultation booking page (Calendly, Acuity, the firm's own page...).
    booking_url TEXT NOT NULL CHECK (booking_url ~ '^https://'),
    -- One or two sentences in the business's voice, used in the instant reply.
    reply_intro TEXT NOT NULL DEFAULT 'Thank you for reaching out. A member of our team will review your message shortly.'
        CHECK (char_length(reply_intro) <= 600),
    -- Hours to wait before the single follow-up.
    follow_up_hours INTEGER NOT NULL DEFAULT 24 CHECK (follow_up_hours BETWEEN 1 AND 168),
    -- Sites allowed to submit (exact origins, e.g. 'https://www.buttonlawfirm.com'). Empty = any.
    allowed_origins TEXT[] NOT NULL DEFAULT '{}',
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    client_id UUID NOT NULL REFERENCES public.lead_clients (id) ON DELETE CASCADE,

    name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
    -- Stored lower-cased by the edge function.
    email TEXT NOT NULL CHECK (char_length(email) <= 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
    phone TEXT CHECK (char_length(phone) <= 40),
    message TEXT CHECK (char_length(message) <= 4000),
    -- Page the enquiry came from.
    page_url TEXT CHECK (char_length(page_url) <= 500),

    replied_at TIMESTAMP WITH TIME ZONE,
    notified_at TIMESTAMP WITH TIME ZONE,
    -- When the single follow-up is due; cleared once sent or no longer needed.
    follow_up_at TIMESTAMP WITH TIME ZONE,
    followed_up_at TIMESTAMP WITH TIME ZONE,
    -- Set when the enquirer opens the booking link from either email.
    booking_clicked_at TIMESTAMP WITH TIME ZONE,
    -- Set when the enquirer replies STOP or the business closes the lead.
    closed_at TIMESTAMP WITH TIME ZONE,
    -- Unguessable token for the tracked booking link.
    token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE
);

CREATE INDEX IF NOT EXISTS leads_client_created_idx ON public.leads (client_id, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_follow_up_due_idx ON public.leads (follow_up_at)
    WHERE follow_up_at IS NOT NULL AND followed_up_at IS NULL;

ALTER TABLE public.lead_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view lead clients" ON public.lead_clients FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert lead clients" ON public.lead_clients FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update lead clients" ON public.lead_clients FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete lead clients" ON public.lead_clients FOR DELETE USING (public.is_admin());

CREATE POLICY "Admins can view leads" ON public.leads FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update leads" ON public.leads FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE USING (public.is_admin());

-- FutureLabs' own demo client: powers the live demo on /studio/lead-responder.
INSERT INTO public.lead_clients (slug, name, notify_email, booking_url, reply_intro, follow_up_hours, allowed_origins)
VALUES (
    'futurelabs-demo',
    'FutureLabs Studio',
    'manny@futurelabs.africa',
    'https://futurelabs.africa/contact',
    'Thanks for trying the Instant Lead Responder. This reply reached you seconds after you pressed send, which is exactly what your own website visitors would experience.',
    24,
    ARRAY['https://futurelabs.africa', 'https://www.futurelabs.africa']
)
ON CONFLICT (slug) DO NOTHING;
