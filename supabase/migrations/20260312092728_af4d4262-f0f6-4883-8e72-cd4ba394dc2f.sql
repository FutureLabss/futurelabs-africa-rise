ALTER TABLE public.registrations ADD COLUMN phone text;

CREATE OR REPLACE FUNCTION public.get_event_attendee_avatars(p_event_id uuid)
RETURNS TABLE(email_hash text, initials text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT 
    md5(lower(trim(r.email))) as email_hash,
    upper(left(r.full_name, 1)) as initials
  FROM public.registrations r
  WHERE r.event_id = p_event_id AND r.status = 'registered'
  ORDER BY r.created_at DESC
  LIMIT 8
$$;