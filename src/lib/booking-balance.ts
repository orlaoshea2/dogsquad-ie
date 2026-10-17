import { getBookingPrice } from "@/config/payments";

export interface PricedBooking {
  service_type: string;
  duration_minutes: number;
  price_eur: number | null;
  payment_status: string;
  status: string;
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