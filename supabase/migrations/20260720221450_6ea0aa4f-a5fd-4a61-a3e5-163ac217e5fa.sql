-- Fix bookings RLS so customer data is not exposed to everyone.

-- 1. Tie future bookings to the authenticated user where possible.
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. SECURITY DEFINER helper for availability checks: only returns walk times, no PII.
CREATE OR REPLACE FUNCTION public.get_booked_slots(p_date date)
RETURNS TABLE(walk_time text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT walk_time
  FROM public.bookings
  WHERE walk_date = p_date
    AND status <> 'cancelled';
$$;

GRANT EXECUTE ON FUNCTION public.get_booked_slots(date) TO anon;
GRANT EXECUTE ON FUNCTION public.get_booked_slots(date) TO authenticated;

-- 3. Replace the overly permissive SELECT policy.
DROP POLICY IF EXISTS "Bookings are viewable by submitter and admin" ON public.bookings;

CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all bookings is already present from a previous migration.