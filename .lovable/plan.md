
## Add "Dog Taxi" service

A new service where customers request a pickup → drop-off transport, with the price calculated from the Google Maps driving distance.

### Pricing tiers
- Under 5 km — €15
- 5–10 km — €20
- 10–20 km — €25
- Over 20 km — show a "contact to arrange" message (no auto-price)

### What to build

1. **Google Maps connector**
   - Connect the Lovable-managed Google Maps Platform connector (browser key for autocomplete, server key via gateway for distance).
   - Uses Places API (New) `PlaceAutocompleteElement` for the two address inputs.
   - Uses Routes API `computeRouteMatrix` via the gateway to get driving distance in km.

2. **New server function** `src/lib/dogTaxi.functions.ts`
   - Input: pickup + dropoff (place IDs or lat/lng).
   - Calls Routes API through the connector gateway, returns `{ distanceKm, priceEur }` (or `{ contactRequired: true }` when >20 km).

3. **New component** `src/components/DogTaxiRequest.tsx`
   - Two address autocomplete fields (Pickup / Drop-off).
   - "Get quote" button → shows distance + price.
   - Date, time, dog name/breed, notes, contact fields (pre-filled if signed in, same pattern as `BookingForm`).
   - Payment choice: Pay with Revolut / Pay later (reuse existing pattern).
   - Submits a booking row.

4. **Booking storage**
   - Reuse the existing `bookings` table. Add a migration to include:
     - `service_type text` (values: `walk`, `home_visit`, `dog_taxi`) — default `walk`
     - `pickup_address text`, `dropoff_address text`
     - `distance_km numeric`, `price_eur numeric`
   - Existing bookings default to `walk`. No changes to RLS structure; keep existing policies.

5. **Site surfaces**
   - **Services page** (`src/routes/services.tsx`) + **Services section** (`src/components/Services.tsx`): add a "Dog Taxi" card listing the three price tiers.
   - **Home page**: add the Dog Taxi request block near the booking calendar (or as its own section) so visitors can get an instant quote.
   - **Header / nav**: no new route needed; the service lives inside the Services page and home page. A route can be added later if wanted.
   - **FAQ**: one entry explaining how the taxi pricing works (distance-based, quote before booking, >20 km on request).
   - **Admin dashboard** (`/admin`): show the extra taxi fields (pickup, dropoff, distance, price) on taxi bookings.

### Technical notes
- Google Maps: browser key via `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` (Places autocomplete only); server calls go through `https://connector-gateway.lovable.dev/google_maps/routes/directions/v2:computeRouteMatrix` inside the server function.
- Price mapping (server-side, source of truth): `<5→15`, `<10→20`, `≤20→25`, `>20→contact`. Client shows the same value but the server recomputes on submit so users can't tamper with the price.
- No changes to existing walk / home visit flows.

### Open question
Do you want the dog-taxi request form on the home page as well, or only on the Services page? Default in the plan: both (Services page card + a request form on the home page).
