-- Fixes from the Supabase security advisor.

-- Pin search_path on the two updated_at trigger functions.
ALTER FUNCTION public.update_tutor_applications_updated_at() SET search_path = public;
ALTER FUNCTION public.update_tutor_requests_updated_at() SET search_path = public;

-- handle_new_user only runs as the auth.users trigger; nobody should call it over the API.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- has_role(user, role) would let anyone probe whether a given user is an admin.
-- is_admin() (SECURITY DEFINER) still calls it internally.
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;

-- Intentionally callable without signing in, so the advisor warnings for these are expected:
--   is_admin()                    used by the admin UI and inside RLS policies (returns false for visitors)
--   get_registration_counts(...)  attendee counts on event pages
--   get_event_attendee_avatars()  attendee avatars on event pages
