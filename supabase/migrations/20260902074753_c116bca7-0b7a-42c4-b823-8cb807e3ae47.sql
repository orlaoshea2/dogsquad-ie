CREATE TABLE public.consult_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.consult_messages TO anon, authenticated;
GRANT SELECT ON public.consult_messages TO service_role;

ALTER TABLE public.consult_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send a consult message"
  ON public.consult_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read consult messages"
  ON public.consult_messages
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
