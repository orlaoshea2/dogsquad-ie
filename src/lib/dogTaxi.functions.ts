import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { getTaxiPrice, TAXI_MAX_KM } from "@/config/taxi";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

const quoteSchema = z.object({
  pickup: z.string().min(4, "Pickup address is required").max(300),
  dropoff: z.string().min(4, "Drop-off address is required").max(300),
});

export type TaxiQuote =
  | { ok: true; distanceKm: number; price: number }
  | { ok: false; reason: "too_far" | "not_found" | "unavailable"; distanceKm?: number; message: string };

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    if (supabaseKey.startsWith("sb_") && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

async function computeDistanceKm(pickup: string, dropoff: string): Promise<number | null> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!lovableKey || !mapsKey) throw new Error("MAPS_NOT_CONFIGURED");

  const response = await fetch(`${GATEWAY_URL}/routes/distanceMatrix/v2:computeRouteMatrix`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": mapsKey,
      "Content-Type": "application/json",
      "X-Goog-FieldMask": "originIndex,destinationIndex,distanceMeters,condition",
    },
    body: JSON.stringify({
      origins: [{ waypoint: { address: pickup } }],
      destinations: [{ waypoint: { address: dropoff } }],
      travelMode: "DRIVE",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`Google Maps route matrix failed [${response.status}]: ${body}`);
    throw new Error("MAPS_REQUEST_FAILED");
  }

  const rows = (await response.json()) as Array<{ distanceMeters?: number; condition?: string }>;
  const row = Array.isArray(rows) ? rows[0] : undefined;
  if (!row || row.condition !== "ROUTE_EXISTS" || typeof row.distanceMeters !== "number") return null;
  return Math.round((row.distanceMeters / 1000) * 10) / 10;
}

export const quoteDogTaxi = createServerFn({ method: "POST" })
  .inputValidator((input: { pickup: string; dropoff: string }) => quoteSchema.parse(input))
  .handler(async ({ data }): Promise<TaxiQuote> => {
    let distanceKm: number | null;
    try {
      distanceKm = await computeDistanceKm(data.pickup, data.dropoff);
    } catch {
      return {
        ok: false,
        reason: "unavailable",
        message: "Instant quotes are temporarily unavailable — send your addresses and I'll confirm the price.",
      };
    }

    if (distanceKm === null) {
      return {
        ok: false,
        reason: "not_found",
        message: "I couldn't find a driving route between those addresses. Please check them and try again.",
      };
    }

    const price = getTaxiPrice(distanceKm);
    if (price === null) {
      return {
        ok: false,
        reason: "too_far",
        distanceKm,
        message: `That journey is ${distanceKm} km — over ${TAXI_MAX_KM} km. Get in touch and we'll arrange a price.`,
      };
    }

    return { ok: true, distanceKm, price };
  });

const taxiBookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().max(40).optional(),
  dogName: z.string().min(1, "Dog name is required"),
  dogBreed: z.string().max(80).optional(),
  pickup: z.string().min(4).max(300),
  dropoff: z.string().min(4).max(300),
  walkDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Valid date is required"),
  walkTime: z.string().regex(/^\d{2}:\d{2}$/, "Valid time is required"),
  notes: z.string().max(1000).optional(),
  paymentMethod: z.enum(["revolut", "pay_later"]).default("pay_later"),
  userId: z.string().uuid().optional(),
});

export const createTaxiBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => taxiBookingSchema.parse(input))
  .handler(async ({ data }) => {
    // Recompute the price server-side so it can't be tampered with.
    let distanceKm: number | null = null;
    try {
      distanceKm = await computeDistanceKm(data.pickup, data.dropoff);
    } catch {
      distanceKm = null;
    }
    const price = distanceKm === null ? null : getTaxiPrice(distanceKm);

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error("Backend configuration missing");

    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false },
      global: { fetch: createSupabaseFetch(key) },
    });

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        dog_name: data.dogName,
        dog_breed: data.dogBreed || null,
        walk_date: data.walkDate,
        walk_time: data.walkTime,
        duration_minutes: 30,
        notes: data.notes || null,
        service_type: "dog_taxi",
        pickup_address: data.pickup,
        dropoff_address: data.dropoff,
        distance_km: distanceKm,
        price_eur: price,
        payment_method: data.paymentMethod,
        payment_status: data.paymentMethod === "revolut" ? "pending" : "not_required",
        user_id: data.userId || null,
      } as never)
      .select("id")
      .single();

    if (error || !booking) {
      console.error("Taxi booking insert error:", error);
      throw new Error(error?.message || "Failed to create booking");
    }

    return { id: booking.id, distanceKm, price };
  });
