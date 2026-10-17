import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { SLOT_TIMES, isBookableDate, parseDateString } from "@/config/schedule";
import { getBookingPrice } from "@/config/payments";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

const multiBookingSchema = bookingSchema.omit({ walkDate: true, walkTime: true, durationMinutes: true, serviceType: true }).extend({
  items: z.array(bookingSchema.pick({ walkDate: true, walkTime: true, durationMinutes: true, serviceType: true })).min(1),
}).superRefine((data, ctx) => {
  const keys = new Set<string>();
  for (const [index, item] of data.items.entries()) {
    const key = `${item.walkDate}-${item.walkTime}`;
    if (keys.has(key)) ctx.addIssue({ code: "custom", path: ["items", index], message: "This time is already selected" });
    keys.add(key);
    const validDuration = item.serviceType === "walk" ? item.durationMinutes === 75 : [30, 60].includes(item.durationMinutes);
    if (!validDuration || !SLOT_TIMES[item.serviceType].includes(item.walkTime) || !isBookableDate(parseDateString(item.walkDate))) {
      ctx.addIssue({ code: "custom", path: ["items", index], message: "Please choose an available service time and duration" });
    }
  }
});

export const createBookings = createServerFn({ method: "POST" })
  .inputValidator((input: z.input<typeof multiBookingSchema>) => multiBookingSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error("Backend configuration missing");

    // Signed-in customers send a bearer token; act as that user so the row can
    // carry their user_id. Guests insert with user_id NULL.
    const authHeader = getRequestHeader("authorization");
    const token = authHeader?.toLowerCase().startsWith("bearer ")
      ? authHeader.slice(7).trim()
      : undefined;
    if (authHeader && !token) throw new Error("Please sign in again before booking");

    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false },
      global: {
        fetch: createSupabaseFetch(key),
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
      },
    });

    let ownerId: string | null = null;
    if (token) {
      const { data: userData, error: authError } = await supabase.auth.getUser(token);
      if (authError || !userData.user) throw new Error("Please sign in again before booking");
      ownerId = userData.user.id;
    }

    // Guests cannot read rows back (SELECT is restricted), so generate the id
    // here and insert without asking for a representation.
    const rows = data.items.map((item) => ({
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      dog_name: data.dogName,
      dog_breed: data.dogBreed || null,
      walk_date: item.walkDate,
      walk_time: item.walkTime,
      duration_minutes: item.durationMinutes,
      service_type: item.serviceType,
      price_eur: getBookingPrice(item.serviceType, item.durationMinutes),
      pickup_address: data.pickupAddress?.trim() || null,
      dropoff_address: data.dropoffAddress?.trim() || null,
      notes: data.notes || null,
      payment_method: data.paymentMethod,
      payment_status: data.paymentMethod === "revolut" ? "pending" : "unpaid",
      user_id: ownerId,
    }));
    const { error } = await supabase.from("bookings").insert(rows);

    if (error) {
      console.error("Booking insert error:", error);
      throw new Error(error.message || "Failed to create booking");
    }

    return { ids: rows.map((row) => row.id) };
  });

export const listMyBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from("bookings")
      .select("id, dog_name, walk_date, walk_time, duration_minutes, service_type, price_eur, payment_status, status, pickup_address, dropoff_address")
      .eq("user_id", context.userId)
      .order("walk_date", { ascending: false }).order("walk_time", { ascending: false });
    if (error) throw new Error("Unable to load your bookings. Please try again.");
    return data ?? [];
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

