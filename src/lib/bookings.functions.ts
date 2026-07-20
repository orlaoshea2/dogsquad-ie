import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  dogName: z.string().min(1, "Dog name is required"),
  dogBreed: z.string().optional(),
  walkDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Valid date is required"),
  walkTime: z.string().regex(/^\d{2}:\d{2}$/, "Valid time is required"),
  durationMinutes: z.number().int().min(30).max(180).default(60),
  notes: z.string().optional(),
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
        duration_minutes: data.durationMinutes,
        notes: data.notes || null,
      })
      .select("id")
      .single();

    if (error || !booking) {
      console.error("Booking insert error:", error);
      throw new Error(error?.message || "Failed to create booking");
    }

    return { id: booking.id };
  });

const slotSchema = z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) });

export const getAvailableSlots = createServerFn({ method: "POST" })
  .validator({ parse: slotSchema.parse })
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error("Backend configuration missing");

    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false },
      global: { fetch: createSupabaseFetch(key) },
    });

    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("walk_time")
      .eq("walk_date", data.date)
      .neq("status", "cancelled");

    if (error) {
      console.error("Slot query error:", error);
      throw new Error(error.message);
    }

    const allSlots = [
      "08:00", "09:00", "10:00", "11:00", "12:00",
      "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
    ];

    const booked = new Set(bookings?.map((b) => b.walk_time) ?? []);
    return allSlots.map((time) => ({ time, available: !booked.has(time) }));
  });
