Image migration
================
Migrated the Lovable-managed image assets into src/assets as local files.
The migrated files no longer depend on /__l5e/assets-v1/ URLs.

Migrated:
- dogsquad-logo.png
- about-walker.png
- ds-1.jpg
- ds-2.jpg
- ds-4.jpg
- ds-5.jpg
- ds-6.jpg
- real-1.png through real-9.png

Existing local assets were preserved.

Authentication migration
========================
Google OAuth now uses Supabase directly instead of Lovable's OAuth broker.
OAuth and email confirmation/reset links return to /auth on the current origin.

Cloudflare Pages/Workers production variables required:
- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY
- SUPABASE_URL
- SUPABASE_PUBLISHABLE_KEY

Do NOT put SUPABASE_SERVICE_ROLE_KEY in any VITE_* variable or client-side file.
If admin functionality is used and the server admin client is activated, keep
SUPABASE_SERVICE_ROLE_KEY server-side only.

Supabase dashboard requirements (must be configured by someone with access):
- Google provider enabled under Authentication > Providers.
- Site URL set to https://dogsquad.ie (or the intended canonical URL).
- Redirect URLs allow https://dogsquad.ie/auth and https://www.dogsquad.ie/auth
  if www is intended to be a valid OAuth return host.
- Password reset redirect: https://dogsquad.ie/reset-password.
- If using both apex and www, keep the preferred canonical host consistent.
