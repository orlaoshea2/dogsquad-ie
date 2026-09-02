import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { SLOT_TIMES, isBookableDate, parseDateString } from "@/config/schedule";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  dogName: z.string().min(1, "Dog name is required"),
  dogBreed: z.string().optional(),
  walkDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Valid date is required"),
  walkTime: z.string().regex(/^\d{2}:\d{2}$/, "Valid time is required"),
  durationMinutes: z.number().int().min(20).max(180).default(75),
  notes: z.string().optional(),
  paymentMethod: z.enum(["revolut", "pay_later"]).default("pay_later"),
  serviceType: z.enum(["walk", "visit"]).default("walk"),
  pickupAddress: z.string().max(300).optional(),
  dropoffAddress: z.string().max(300).optional(),
  userId: z.string().uuid().optional(),
});

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

export const createBooking = createServerFn({ method: "POST" })
  .validator({ parse: bookingSchema.parse })
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error("Backend configuration missing");

    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false },
      global: { fetch: createSupabaseFetch(key) },
    });

    // Guests cannot read rows back (SELECT is restricted), so generate the id
    // here and insert without asking for a representation.
    const id = crypto.randomUUID();

    const { error } = await supabase.from("bookings").insert({
      id,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      dog_name: data.dogName,
      dog_breed: data.dogBreed || null,
      walk_date: data.walkDate,
      walk_time: data.walkTime,
      duration_minutes: data.durationMinutes,
      service_type: data.serviceType,
      pickup_address: data.pickupAddress?.trim() || null,
      dropoff_address: data.dropoffAddress?.trim() || null,
      notes: data.notes || null,
      payment_method: data.paymentMethod,
      payment_status: data.paymentMethod === "revolut" ? "pending" : "not_required",
      user_id: data.userId || null,
    });

    if (error) {
      console.error("Booking insert error:", error);
      throw new Error(error.message || "Failed to create booking");
    }

    return { id };
  });

const slotSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  serviceType: z.enum(["walk", "visit"]).default("walk"),
});

export const getAvailableSlots = createServerFn({ method: "POST" })
  .validator({ parse: slotSchema.parse })
  .handler(async ({ data }) => {
    const day = parseDateString(data.date);
    if (!isBookableDate(day)) return [];

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error("Backend configuration missing");

    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false },
      global: { fetch: createSupabaseFetch(key) },
    });

    const { data: bookedRows, error } = await supabase.rpc("get_booked_slots", {
      p_date: data.date,
    });

    if (error) {
      console.error("Slot query error:", error);
      throw new Error(error.message);
    }

    const allSlots = SLOT_TIMES[data.serviceType];

    const booked = new Set(
      (bookedRows ?? []).map((row: { walk_time: string }) => row.walk_time)
    );
    return allSlots.map((time) => ({ time, available: !booked.has(time) }));
  });

