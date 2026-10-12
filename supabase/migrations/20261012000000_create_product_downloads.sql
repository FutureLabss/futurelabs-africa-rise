-- Emails collected before a free product download on /studio.
-- Anyone can add a row (the download form); only admins can read or delete them,
-- because the list holds personal data.

CREATE TABLE IF NOT EXISTS public.product_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    email TEXT NOT NULL CHECK (char_length(email) <= 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
    name TEXT CHECK (name IS NULL OR char_length(name) <= 120),
    organisation TEXT CHECK (organisation IS NULL OR char_length(organisation) <= 160),

    -- Which product and release was downloaded, e.g. 'newstheme' / '1.1.1'.
    product TEXT NOT NULL CHECK (char_length(product) <= 60),
    version TEXT CHECK (version IS NULL OR char_length(version) <= 20),

    -- Ticked "send me product updates" (unticked by default on the form).
    marketing_opt_in BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS product_downloads_created_at_idx ON public.product_downloads (created_at DESC);
CREATE INDEX IF NOT EXISTS product_downloads_email_idx ON public.product_downloads (lower(email));

ALTER TABLE public.product_downloads ENABLE ROW LEVEL SECURITY;

-- The public download form can only add rows, never read them back.
CREATE POLICY "Anyone can record a download" ON public.product_downloads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view downloads" ON public.product_downloads
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can delete downloads" ON public.product_downloads
    FOR DELETE USING (public.is_admin());
