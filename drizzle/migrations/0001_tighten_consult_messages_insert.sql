DROP POLICY IF EXISTS "Anyone can send a consult message" ON public.consult_messages;

CREATE POLICY "Guests can send a consult message"
ON public.consult_messages FOR INSERT TO anon
WITH CHECK (
  user_id IS NULL
  AND length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 320
  AND length(message) BETWEEN 1 AND 5000
  AND (phone IS NULL OR length(phone) <= 50)
);

CREATE POLICY "Signed-in users can send a consult message"
ON public.consult_messages FOR INSERT TO authenticated
WITH CHECK (
  (user_id IS NULL OR user_id = auth.uid())
  AND length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 320
  AND length(message) BETWEEN 1 AND 5000
  AND (phone IS NULL OR length(phone) <= 50)
);