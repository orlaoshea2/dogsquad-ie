CREATE TABLE public.dogs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  breed text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.dogs TO authenticated;
GRANT ALL ON public.dogs TO service_role;
ALTER TABLE public.dogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own dogs" ON public.dogs FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all dogs" ON public.dogs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));