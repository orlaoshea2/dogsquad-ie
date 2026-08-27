ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS service_type text NOT NULL DEFAULT 'walk',
  ADD COLUMN IF NOT EXISTS pickup_address text,
  ADD COLUMN IF NOT EXISTS dropoff_address text,
  ADD COLUMN IF NOT EXISTS distance_km numeric,
  ADD COLUMN IF NOT EXISTS price_eur numeric;