-- Earlier migrations gave "authenticated" users read/update/delete access to
-- applications, submissions and CVs. Supabase lets anyone create an account
-- through the public Auth API unless sign-ups are disabled, so "authenticated"
-- is not the same as "admin". Restrict all of it to public.is_admin().

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['hackathon_submissions', 'tutor_applications', 'tutor_requests', 'events', 'registrations'] LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Enable select for authenticated users" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.%I', t);
  END LOOP;
END $$;

-- Submissions and applications: anyone may insert (existing policies), only admins read and manage.
CREATE POLICY "Admins view hackathon submissions" ON public.hackathon_submissions FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins delete hackathon submissions" ON public.hackathon_submissions FOR DELETE USING (public.is_admin());

CREATE POLICY "Admins view tutor applications" ON public.tutor_applications FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins update tutor applications" ON public.tutor_applications FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete tutor applications" ON public.tutor_applications FOR DELETE USING (public.is_admin());

CREATE POLICY "Admins view tutor requests" ON public.tutor_requests FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins update tutor requests" ON public.tutor_requests FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete tutor requests" ON public.tutor_requests FOR DELETE USING (public.is_admin());

-- Events and registrations already have admin policies from the baseline; this
-- only removes the "authenticated" delete policies 20260528120000 added.
CREATE POLICY "Admins delete registrations" ON public.registrations FOR DELETE USING (public.is_admin());

-- CVs and portfolios in the private tutor-applications bucket.
DROP POLICY IF EXISTS "auth select tutor-applications" ON storage.objects;
DROP POLICY IF EXISTS "auth delete tutor-applications" ON storage.objects;
CREATE POLICY "Admins read tutor application files" ON storage.objects
  FOR SELECT USING (bucket_id = 'tutor-applications' AND public.is_admin());
CREATE POLICY "Admins delete tutor application files" ON storage.objects
  FOR DELETE USING (bucket_id = 'tutor-applications' AND public.is_admin());
