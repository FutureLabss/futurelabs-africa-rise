-- Drop the overly permissive registration SELECT policy
DROP POLICY IF EXISTS "Users can view their own registration by email" ON public.registrations;

-- The "Admins can view all registrations" policy already handles admin access
-- For public users, they can see registration count but not details
-- This is by design - registration details are private to admins