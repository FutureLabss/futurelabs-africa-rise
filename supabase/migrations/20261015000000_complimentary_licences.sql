-- Complimentary licences: free Pro licences for FutureLabs' own sites (opportunitylab.net,
-- staging), partners and reviewers. Created by admins from the Sales tab.
-- A comp licence has a zero-amount 'comp' order, unlimited sites, no Paystack
-- subscription and runs until 2099.

ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_kind_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_kind_check CHECK (kind IN ('first', 'renewal', 'comp'));

CREATE OR REPLACE FUNCTION public.create_comp_license(p_email TEXT, p_product TEXT, p_note TEXT DEFAULT NULL)
RETURNS public.licenses
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_alphabet CONSTANT TEXT := '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; -- no 0/O/1/I, as in the edge functions
    v_email TEXT := lower(trim(p_email));
    v_order public.orders;
    v_license public.licenses;
    v_key TEXT;
    v_bytes BYTEA;
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Only admins can create complimentary licences' USING ERRCODE = '42501';
    END IF;
    IF v_email IS NULL OR v_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
        RAISE EXCEPTION 'Enter a valid email address' USING ERRCODE = '22023';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.product_prices WHERE product = p_product) THEN
        RAISE EXCEPTION 'Unknown product %', p_product USING ERRCODE = '22023';
    END IF;

    INSERT INTO public.orders (reference, email, name, product, tier, interval, currency, amount, status, kind)
    VALUES ('comp_' || replace(gen_random_uuid()::TEXT, '-', ''), v_email, NULLIF(left(trim(p_note), 120), ''),
            p_product, 'agency', 'year', 'NGN', 0, 'paid', 'comp')
    RETURNING * INTO v_order;

    LOOP
        v_bytes := gen_random_bytes(16);
        v_key := 'FL';
        FOR i IN 0..15 LOOP
            IF i % 4 = 0 THEN
                v_key := v_key || '-';
            END IF;
            v_key := v_key || substr(v_alphabet, (get_byte(v_bytes, i) % 32) + 1, 1);
        END LOOP;
        EXIT WHEN NOT EXISTS (SELECT 1 FROM public.licenses WHERE key = v_key);
    END LOOP;

    INSERT INTO public.licenses (key, first_order_id, email, name, product, tier, interval, currency, amount, max_sites, period_end, status)
    VALUES (v_key, v_order.id, v_email, v_order.name, p_product, 'agency', 'year', 'NGN', 0, NULL, '2099-12-31T00:00:00Z', 'active')
    RETURNING * INTO v_license;

    UPDATE public.orders SET license_id = v_license.id WHERE id = v_order.id;
    RETURN v_license;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.create_comp_license(TEXT, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_comp_license(TEXT, TEXT, TEXT) TO authenticated;
