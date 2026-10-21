import { getBookingPrice } from "@/config/payments";

export interface PricedBooking {
  service_type: string;
  duration_minutes: number;
  price_eur: number | null;
  payment_status: string;
  status: string;
}

export interface StatementBooking extends PricedBooking {
  name: string;
  email: string;
  phone: string | null;
  dog_name: string;
  walk_date: string;
  walk_time: string;
}

export interface CustomerOwed {
  email: string;
  name: string;
  phone: string | null;
  owed: number;
  items: StatementBooking[];
}

export function bookingPrice(booking: PricedBooking): number {
  return booking.price_eur ?? getBookingPrice(booking.service_type === "visit" ? "visit" : "walk", booking.duration_minutes);
}

export function isBookingPaid(booking: PricedBooking): boolean {
  return ["paid_cash", "paid_transfer", "paid", "paid_revolut"].includes(booking.payment_status);
}

export function bookingAmountOwed(booking: PricedBooking): number {
  return booking.status === "cancelled" || isBookingPaid(booking) ? 0 : bookingPrice(booking);
}

export function totalAmountOwed(bookings: PricedBooking[]): number {
  return bookings.reduce((total, booking) => total + bookingAmountOwed(booking), 0);
}

export function monthOf(isoDate: string): string {
  return isoDate.slice(0, 7);
}

export function owedInMonth<T extends StatementBooking>(bookings: T[], month: string): T[] {
  return bookings.filter((booking) => monthOf(booking.walk_date) === month && bookingAmountOwed(booking) > 0);
}

export function totalOwedInMonth<T extends StatementBooking>(bookings: T[], month: string): number {
  return owedInMonth(bookings, month).reduce((total, booking) => total + bookingAmountOwed(booking), 0);
}

export function owedByCustomer<T extends StatementBooking>(bookings: T[], month: string): CustomerOwed[] {
  const byEmail = new Map<string, CustomerOwed>();
  for (const booking of owedInMonth(bookings, month)) {
    const key = booking.email.toLowerCase();
    const existing = byEmail.get(key);
    if (existing) {
      existing.owed += bookingAmountOwed(booking);
      existing.items.push(booking);
    } else {
      byEmail.set(key, {
        email: booking.email,
        name: booking.name,
        phone: booking.phone,
        owed: bookingAmountOwed(booking),
        items: [booking],
      });
    }
  }
  return [...byEmail.values()].sort(
    (a, b) => b.owed - a.owed || a.name.localeCompare(b.name),
  );
}
