CREATE TABLE public.bookings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    dog_name text NOT NULL,
    dog_breed text,
    walk_date date NOT NULL,
    walk_time text NOT NULL,
    duration_minutes integer NOT NULL DEFAULT 60,
    notes text,
    status text NOT NULL DEFAULT 'pending',
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT ON public.bookings TO anon;
GRANT SELECT, INSERT ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Bookings are viewable by submitter and admin" 
ON public.bookings 
FOR SELECT 
TO anon, authenticated 
USING (true);