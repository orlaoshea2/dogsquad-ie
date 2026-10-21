-- Orla's working account is the admin that records cash and bank-transfer payments.
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE lower(email) = 'orlaoshea2@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;