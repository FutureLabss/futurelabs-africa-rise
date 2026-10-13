-- Paid Pro tiers for the Studio WordPress products, sold as Paystack subscriptions.
-- Edge functions write everything with the service role. Visitors never read
-- these tables directly; admins can read them, and can revoke or extend licenses.

-- Prices the server trusts. Keep in step with `pricing` in src/data/products.ts.
-- Amounts are in minor units (kobo / cents). `paystack_plan_code` is filled by
-- supabase/scripts/paystack-sync-plans.ts; a row without a plan code can't be bought.
CREATE TABLE IF NOT EXISTS public.product_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product TEXT NOT NULL CHECK (char_length(product) <= 60),
    tier TEXT NOT NULL CHECK (tier IN ('personal', 'business', 'agency')),
    interval TEXT NOT NULL CHECK (interval IN ('month', 'year')),
    currency TEXT NOT NULL CHECK (currency IN ('NGN', 'USD')),
    amount INTEGER NOT NULL CHECK (amount > 0),
    -- NULL = unlimited sites.
    sites INTEGER CHECK (sites IS NULL OR sites > 0),
    paystack_plan_code TEXT UNIQUE,
    active BOOLEAN NOT NULL DEFAULT true,
    UNIQUE (product, tier, interval, currency)
);

INSERT INTO public.product_prices (product, tier, interval, currency, amount, sites) VALUES
    ('futurelabs-ai-seo', 'personal', 'month', 'USD', 500, 1),
    ('futurelabs-ai-seo', 'personal', 'year', 'USD', 4900, 1),
    ('futurelabs-ai-seo', 'business', 'month', 'USD', 1300, 5),
    ('futurelabs-ai-seo', 'business', 'year', 'USD', 12900, 5),
    ('futurelabs-ai-seo', 'agency', 'month', 'USD', 3000, NULL),
    ('futurelabs-ai-seo', 'agency', 'year', 'USD', 29900, NULL),
    ('futurelabs-ai-seo', 'personal', 'month', 'NGN', 700000, 1),
    ('futurelabs-ai-seo', 'personal', 'year', 'NGN', 6750000, 1),
    ('futurelabs-ai-seo', 'business', 'month', 'NGN', 1800000, 5),
    ('futurelabs-ai-seo', 'business', 'year', 'NGN', 17750000, 5),
    ('futurelabs-ai-seo', 'agency', 'month', 'NGN', 4100000, NULL),
    ('futurelabs-ai-seo', 'agency', 'year', 'NGN', 41000000, NULL),
    ('newstheme', 'personal', 'month', 'USD', 300, 1),
    ('newstheme', 'personal', 'year', 'USD', 2900, 1),
    ('newstheme', 'business', 'month', 'USD', 600, 5),
    ('newstheme', 'business', 'year', 'USD', 5900, 5),
    ('newstheme', 'agency', 'month', 'USD', 1000, NULL),
    ('newstheme', 'agency', 'year', 'USD', 9900, NULL),
    ('newstheme', 'personal', 'month', 'NGN', 400000, 1),
    ('newstheme', 'personal', 'year', 'NGN', 4000000, 1),
    ('newstheme', 'business', 'month', 'NGN', 800000, 5),
    ('newstheme', 'business', 'year', 'NGN', 8100000, 5),
    ('newstheme', 'agency', 'month', 'NGN', 1400000, NULL),
    ('newstheme', 'agency', 'year', 'NGN', 13500000, NULL)
ON CONFLICT (product, tier, interval, currency) DO NOTHING;

-- One row per charge: the first payment and every renewal.
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    reference TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL CHECK (char_length(email) <= 254),
    name TEXT CHECK (name IS NULL OR char_length(name) <= 120),
    product TEXT NOT NULL,
    tier TEXT NOT NULL,
    interval TEXT NOT NULL,
    currency TEXT NOT NULL,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
    -- 'first' for the checkout that created the subscription, 'renewal' for automatic charges.
    kind TEXT NOT NULL DEFAULT 'first' CHECK (kind IN ('first', 'renewal')),
    license_id UUID,
    paystack_payload JSONB
);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders (created_at DESC);

CREATE TABLE IF NOT EXISTS public.licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    key TEXT NOT NULL UNIQUE,
    -- The checkout that created this license; makes license creation idempotent.
    first_order_id UUID NOT NULL UNIQUE REFERENCES public.orders (id),
    email TEXT NOT NULL,
    name TEXT,
    product TEXT NOT NULL,
    tier TEXT NOT NULL,
    interval TEXT NOT NULL CHECK (interval IN ('month', 'year')),
    currency TEXT NOT NULL,
    amount INTEGER NOT NULL,
    max_sites INTEGER CHECK (max_sites IS NULL OR max_sites > 0), -- NULL = unlimited
    -- Paid up to here. The license stays valid for a 7-day grace period after it.
    period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'past_due', 'cancelled', 'revoked')),
    paystack_customer_code TEXT,
    paystack_plan_code TEXT,
    paystack_subscription_code TEXT UNIQUE,
    paystack_email_token TEXT
);

CREATE INDEX IF NOT EXISTS licenses_customer_plan_idx ON public.licenses (paystack_customer_code, paystack_plan_code);
CREATE INDEX IF NOT EXISTS licenses_email_idx ON public.licenses (lower(email));

ALTER TABLE public.orders
    ADD CONSTRAINT orders_license_id_fkey FOREIGN KEY (license_id) REFERENCES public.licenses (id);

CREATE TABLE IF NOT EXISTS public.license_activations (
    license_id UUID NOT NULL REFERENCES public.licenses (id) ON DELETE CASCADE,
    site_url TEXT NOT NULL CHECK (char_length(site_url) <= 255),
    activated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (license_id, site_url)
);

-- Pro builds. Upload the zip to the private `pro-downloads` bucket, then add a row.
-- The newest row per product is what buyers download and what update checks report.
CREATE TABLE IF NOT EXISTS public.pro_releases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product TEXT NOT NULL,
    version TEXT NOT NULL CHECK (char_length(version) <= 20),
    storage_path TEXT NOT NULL,
    released_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (product, version)
);

-- "Join the waitlist" while a Pro tier isn't on sale yet.
CREATE TABLE IF NOT EXISTS public.product_waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT NOT NULL CHECK (char_length(email) <= 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
    name TEXT CHECK (name IS NULL OR char_length(name) <= 120),
    product TEXT NOT NULL CHECK (char_length(product) <= 60),
    tier TEXT CHECK (tier IS NULL OR char_length(tier) <= 20)
);

ALTER TABLE public.product_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.license_activations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pro_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view prices" ON public.product_prices FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can view orders" ON public.orders FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can view licenses" ON public.licenses FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update licenses" ON public.licenses FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can view activations" ON public.license_activations FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can view releases" ON public.pro_releases FOR SELECT USING (public.is_admin());

-- The public waitlist form can only add rows, never read them back.
CREATE POLICY "Anyone can join the waitlist" ON public.product_waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view the waitlist" ON public.product_waitlist FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can delete waitlist rows" ON public.product_waitlist FOR DELETE USING (public.is_admin());

-- Private bucket for Pro zips; files are only handed out as short-lived signed URLs.
INSERT INTO storage.buckets (id, name, public)
VALUES ('pro-downloads', 'pro-downloads', false)
ON CONFLICT (id) DO NOTHING;
