CREATE OR REPLACE FUNCTION public.get_registration_counts(event_ids uuid[])
RETURNS TABLE(event_id uuid, count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT r.event_id, COUNT(*)::bigint
  FROM public.registrations r
  WHERE r.event_id = ANY(event_ids)
    AND r.status = 'registered'
  GROUP BY r.event_id
$$;