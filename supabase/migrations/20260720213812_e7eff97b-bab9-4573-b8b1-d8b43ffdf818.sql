ALTER TABLE public.bookings
  ADD COLUMN payment_method text,
  ADD COLUMN payment_status text NOT NULL DEFAULT 'pending';

UPDATE public.bookings
  SET payment_method = 'pay_later', payment_status = 'not_required'
  WHERE payment_method IS NULL;

COMMENT ON COLUMN public.bookings.payment_method IS 'Customer chosen payment method: revolut or pay_later';
COMMENT ON COLUMN public.bookings.payment_status IS 'payment status: pending, paid, not_required';
