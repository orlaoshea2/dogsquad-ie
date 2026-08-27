import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShieldAlert } from "lucide-react";
import {
  listAllBookings,
  updateBookingPaymentStatus,
  type PaymentStatus,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Bookings | Dog Squad" }] }),
  component: AdminPage,
});

const STATUS_META: Record<PaymentStatus, { label: string; className: string }> = {
  unpaid: { label: "Unpaid", className: "bg-amber-100 text-amber-900 border-amber-300" },
  paid_cash: { label: "Paid — Cash", className: "bg-emerald-100 text-emerald-900 border-emerald-300" },
  paid_transfer: { label: "Paid — Transfer", className: "bg-emerald-100 text-emerald-900 border-emerald-300" },
  pending: { label: "Awaiting Revolut", className: "bg-sky-100 text-sky-900 border-sky-300" },
  not_required: { label: "Pay later", className: "bg-slate-100 text-slate-800 border-slate-300" },
};

function statusMeta(s: string | null | undefined) {
  const key = (s ?? "unpaid") as PaymentStatus;
  return STATUS_META[key] ?? STATUS_META.unpaid;
}

function AdminPage() {
  const fetchBookings = useServerFn(listAllBookings);
  const updateStatus = useServerFn(updateBookingPaymentStatus);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "bookings"],
    queryFn: () => fetchBookings(),
  });

  const mutation = useMutation({
    mutationFn: (vars: { id: string; paymentStatus: PaymentStatus }) =>
      updateStatus({ data: vars }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "bookings"] }),
  });

  const forbidden =
    isError && /Forbidden/i.test((error as Error | undefined)?.message ?? "");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Bookings</h1>
              <p className="text-sm text-muted-foreground">
                Mark bookings as paid once your client has paid by cash or bank transfer.
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading bookings…
            </div>
          )}

          {forbidden && (
            <Card className="border-destructive/40">
              <CardContent className="flex items-center gap-3 py-6 text-destructive">
                <ShieldAlert className="h-5 w-5" />
                You don't have admin access. Sign in as <strong>hello@dogsquad.ie</strong> to manage bookings.
              </CardContent>
            </Card>
          )}

          {isError && !forbidden && (
            <p className="text-destructive">Failed to load bookings.</p>
          )}

          {data && data.length === 0 && (
            <p className="text-muted-foreground">No bookings yet.</p>
          )}

          <div className="grid gap-3">
            {data?.map((b) => {
              const meta = statusMeta(b.payment_status);
              const isPaid = b.payment_status === "paid_cash" || b.payment_status === "paid_transfer";
              return (
                <Card key={b.id} className="border-border/60">
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="font-display text-lg font-semibold text-foreground">
                          {b.name} · {b.dog_name}
                          {b.dog_breed ? <span className="text-muted-foreground"> ({b.dog_breed})</span> : null}
                          {b.service_type === "dog_taxi" ? (
                            <span className="ml-2 rounded bg-teal/10 px-2 py-0.5 text-xs font-medium text-teal">Dog taxi</span>
                          ) : null}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(parseISO(b.walk_date), "EEE, MMM d yyyy")} · {b.walk_time} · {b.duration_minutes} min
                        </div>
                        {b.service_type === "dog_taxi" ? (
                          <div className="text-sm text-foreground/80">
                            {b.pickup_address} → {b.dropoff_address}
                            {b.distance_km != null ? ` · ${b.distance_km} km` : ""}
                            {b.price_eur != null ? ` · €${b.price_eur}` : ""}
                          </div>
                        ) : null}
                        <div className="text-sm text-muted-foreground">
                          {b.email}
                          {b.phone ? ` · ${b.phone}` : ""}
                        </div>
                        {b.notes ? (
                          <div className="mt-1 text-sm text-foreground/80">{b.notes}</div>
                        ) : null}

                      </div>
                      <Badge variant="outline" className={meta.className}>
                        {meta.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2 pt-0">
                    <Button
                      size="sm"
                      variant={b.payment_status === "paid_cash" ? "default" : "outline"}
                      onClick={() => mutation.mutate({ id: b.id, paymentStatus: "paid_cash" })}
                      disabled={mutation.isPending}
                      className={b.payment_status === "paid_cash" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    >
                      Paid — Cash
                    </Button>
                    <Button
                      size="sm"
                      variant={b.payment_status === "paid_transfer" ? "default" : "outline"}
                      onClick={() => mutation.mutate({ id: b.id, paymentStatus: "paid_transfer" })}
                      disabled={mutation.isPending}
                      className={b.payment_status === "paid_transfer" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    >
                      Paid — Transfer
                    </Button>
                    <Button
                      size="sm"
                      variant={b.payment_status === "unpaid" ? "default" : "outline"}
                      onClick={() => mutation.mutate({ id: b.id, paymentStatus: "unpaid" })}
                      disabled={mutation.isPending}
                    >
                      Mark Unpaid
                    </Button>
                    {isPaid && (
                      <span className="ml-auto self-center text-xs text-muted-foreground">
                        {b.payment_method === "revolut" ? "Booked via Revolut" : "Booked as pay later"}
                      </span>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
