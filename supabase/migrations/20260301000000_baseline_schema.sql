-- Baseline schema: the tables, types and functions the original (Lovable-hosted)
-- project created outside this migrations folder, rebuilt from
-- src/integrations/supabase/types.ts and the code that uses them. It runs
-- before every other migration, so a fresh project can be built from this
-- folder alone. Admin access is checked with public.is_admin().

-- Types ---------------------------------------------------------------------
DO $$ BEGIN CREATE TYPE public.app_role AS ENUM ('admin', 'user'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE public.location_type AS ENUM ('in-person', 'virtual', 'hybrid'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE public.registration_status AS ENUM ('registered', 'cancelled', 'attended'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Shared updated_at trigger ---------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Roles -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- Users can see their own roles; only admins manage them.
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Profiles (staff accounts) -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Events ------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  location_type public.location_type NOT NULL DEFAULT 'in-person',
  location_details TEXT,
  image_url TEXT,
  capacity INTEGER CHECK (capacity IS NULL OR capacity > 0),
  featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID DEFAULT auth.uid() REFERENCES auth.users (id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX IF NOT EXISTS events_start_time_idx ON public.events (start_time DESC);

CREATE POLICY "Events are public" ON public.events FOR SELECT USING (true);
CREATE POLICY "Admins create events" ON public.events FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins update events" ON public.events FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete events" ON public.events FOR DELETE USING (public.is_admin());

-- Registrations ------------------------------------------------------------------
-- Written only by the register-event Edge Function (service role); the public
-- reads counts and avatars through SECURITY DEFINER functions, never the table.
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events (id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  status public.registration_status NOT NULL DEFAULT 'registered',
  check_in_token TEXT NOT NULL DEFAULT replace(gen_random_uuid()::text, '-', ''),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- `phone` is added by 20260312092728.
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER registrations_updated_at BEFORE UPDATE ON public.registrations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX IF NOT EXISTS registrations_event_idx ON public.registrations (event_id);

CREATE POLICY "Admins view registrations" ON public.registrations FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins update registrations" ON public.registrations FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
-- Delete policy is added by 20260528120000 and tightened to admins by 20261012000100.

-- Event images (public bucket; admins upload) -----------------------------------
INSERT INTO storage.buckets (id, name, public) VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;
-- No SELECT policy: a public bucket serves files by URL without one, and a
-- SELECT policy would also let anyone list every file in the bucket.
CREATE POLICY "Admins upload event images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'event-images' AND public.is_admin());
CREATE POLICY "Admins update event images" ON storage.objects FOR UPDATE USING (bucket_id = 'event-images' AND public.is_admin());
CREATE POLICY "Admins delete event images" ON storage.objects FOR DELETE USING (bucket_id = 'event-images' AND public.is_admin());
