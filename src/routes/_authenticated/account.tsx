import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { CalendarDays, PawPrint, Home, RefreshCw } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listMyBookings } from "@/lib/bookings.functions";
import { bookingPrice, bookingAmountOwed, isBookingPaid, totalAmountOwed } from "@/lib/booking-balance";

export const myBookingsQuery = queryOptions({
  queryKey: ["account", "bookings"],
  queryFn: () => listMyBookings(),
  staleTime: 0,
  refetchOnWindowFocus: true,
  refetchInterval: 30000,
});

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [
    { title: "My account — Bookings & balance | Dog Squad Wicklow" },
    { name: "description", content: "Your Dog Squad walks, home visits, payment history and outstanding balance." },
    { property: "og:title", content: "My account — Bookings & balance | Dog Squad Wicklow" },
    { property: "og:description", content: "View your Dog Squad bookings and outstanding balance." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(myBookingsQuery),
  component: AccountPage,
  errorComponent: ({ reset }) => <main className="mx-auto max-w-3xl px-4 py-16"><h1 className="font-display text-2xl font-bold">Your bookings couldn’t be loaded</h1><Button className="mt-4" onClick={reset}>Try again</Button></main>,
});

function AccountPage() {
  const { data: bookings, refetch, isFetching } = useSuspenseQuery(myBookingsQuery);
  const owed = totalAmountOwed(bookings);
  return <div className="flex min-h-screen flex-col">
    <Header />
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-foreground">My account</h1>
        <Button asChild><Link to="/booking"><CalendarDays className="mr-2 h-4 w-4" />Book walks or visits</Link></Button>
      </div>
      <section className="my-8 border-y border-border py-6">
        <p className="text-sm font-medium text-muted-foreground">Total amount owed</p>
        <p className="mt-1 font-display text-4xl font-bold text-ocean" data-testid="total-owed">€{owed.toFixed(2)}</p>
        <p className="mt-2 text-sm text-muted-foreground">{owed > 0 ? "Cash or bank transfer — payments recorded by Orla appear here." : "No outstanding balance."}</p>
      </section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold">My bookings ({bookings.length})</h2>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}><RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />Refresh</Button>
      </div>
      {bookings.length === 0 ? <p className="py-8 text-muted-foreground">You haven’t booked any walks or home visits with this account yet.</p> : <div className="space-y-3">
        {bookings.map((b) => <article key={b.id} className="rounded-lg border border-border bg-card p-5" data-booking-id={b.id}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="flex items-center gap-2 font-semibold text-foreground">{b.service_type === "visit" ? <Home className="h-4 w-4 shrink-0 text-teal" /> : <PawPrint className="h-4 w-4 shrink-0 text-teal" />}{b.service_type === "visit" ? "Home visit" : "Dog walk"} · {b.dog_name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{format(parseISO(b.walk_date), "EEE d MMM yyyy")} · {b.walk_time} · {b.duration_minutes} minutes</p>
              {b.pickup_address && <p className="mt-2 break-words text-sm text-muted-foreground">Pick-up: {b.pickup_address}</p>}
              {b.dropoff_address && b.dropoff_address !== b.pickup_address && <p className="break-words text-sm text-muted-foreground">Drop-off: {b.dropoff_address}</p>}
            </div>
            <div className="text-right">
              <p className="font-semibold">€{bookingPrice(b).toFixed(2)}</p>
              <Badge variant="outline" className="mt-2">{b.status === "cancelled" ? "Cancelled" : isBookingPaid(b) ? "Paid" : b.payment_status === "pending" ? "Awaiting payment" : "Unpaid"}</Badge>
              <p className="mt-2 text-xs text-muted-foreground">Owed: €{bookingAmountOwed(b).toFixed(2)}</p>
            </div>
          </div>
        </article>)}
      </div>}
      <Button asChild variant="outline" className="mt-8"><Link to="/welcome">My dogs & contact details</Link></Button>
    </main>
    <Footer />
  </div>;
}