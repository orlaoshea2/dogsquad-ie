import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { totalAmountOwed, bookingAmountOwed, type PricedBooking } from "./booking-balance";

const walk: PricedBooking = { service_type: "walk", duration_minutes: 75, price_eur: 20, status: "pending", payment_status: "unpaid" };
describe("customer account amount owed", () => {
  test("several walks and home visits combine into one outstanding total", () => {
    assert.equal(totalAmountOwed([walk, walk, { ...walk, service_type: "visit", duration_minutes: 60, price_eur: 30 }]), 70);
  });
  test("cash and bank transfer payments no longer count as owed", () => {
    assert.equal(totalAmountOwed([{ ...walk, payment_status: "paid_cash" }, { ...walk, payment_status: "paid_transfer" }]), 0);
  });
  test("pay later and pending Revolut still count as owed", () => {
    assert.equal(totalAmountOwed([{ ...walk, payment_status: "not_required" }, { ...walk, payment_status: "pending" }]), 40);
  });
  test("cancelled bookings do not count as owed", () => {
    assert.equal(bookingAmountOwed({ ...walk, status: "cancelled" }), 0);
  });
  test("older bookings without a stored price use the service price", () => {
    assert.equal(bookingAmountOwed({ ...walk, service_type: "visit", duration_minutes: 60, price_eur: null }), 30);
  });
});