import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const PAYMENT_STATUSES = ["unpaid", "paid_cash", "paid_transfer", "pending", "not_required"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

async function ensureAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

export const listAllBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await ensureAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("bookings")
      .select("id, name, email, phone, dog_name, dog_breed, walk_date, walk_time, duration_minutes, notes, status, payment_method, payment_status, created_at, service_type, pickup_address, dropoff_address, distance_km, price_eur")
      .order("walk_date", { ascending: false })
      .order("walk_time", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateBookingPaymentStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; paymentStatus: PaymentStatus }) =>
    z
      .object({
        id: z.string().uuid(),
        paymentStatus: z.enum(PAYMENT_STATUSES),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await ensureAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("bookings")
      .update({ payment_status: data.paymentStatus })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const listConsultMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await ensureAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("consult_messages")
      .select("id, name, email, phone, message, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) return { isAdmin: false };
    return { isAdmin: Boolean(data) };
  });
