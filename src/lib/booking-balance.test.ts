import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import {
  totalAmountOwed,
  bookingAmountOwed,
  totalOwedInMonth,
  owedByCustomer,
  type PricedBooking,
  type StatementBooking,
} from "./booking-balance";

const walk: PricedBooking = { service_type: "walk", duration_minutes: 75, price_eur: 20, status: "pending", payment_status: "unpaid" };

const base: StatementBooking = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "0871234567",
  dog_name: "Buddy",
  walk_date: "2026-10-06",
  walk_time: "09:00",
  service_type: "walk",
  duration_minutes: 75,
  price_eur: 20,
  status: "pending",
  payment_status: "unpaid",
};

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

describe("month-end statement", () => {
  test("only the chosen month counts towards what is owed", () => {
    const september = { ...base, walk_date: "2026-09-28", price_eur: 20 };
    const october = { ...base, walk_date: "2026-10-14", service_type: "visit", duration_minutes: 60, price_eur: 30 };
    assert.equal(totalOwedInMonth([september, october], "2026-10"), 30);
    assert.equal(totalOwedInMonth([september, october], "2026-09"), 20);
  });

  test("one customer's walks and visits combine into a single statement total", () => {
    const another = { ...base, email: "sue@example.com", name: "Sue", walk_date: "2026-10-07", price_eur: 20 };
    const statements = owedByCustomer([base, { ...base, walk_date: "2026-10-13", walk_time: "14:00", service_type: "visit", duration_minutes: 60, price_eur: 30 }, another], "2026-10");
    assert.equal(statements.length, 2);
    assert.equal(statements[0].owed, 50, "the bigger balance is listed first");
    assert.equal(statements[0].items.length, 2);
    assert.equal(statements[0].email, "jane@example.com");
  });

  test("paid and cancelled bookings are left out of the month total", () => {
    const paid = { ...base, walk_date: "2026-10-08", payment_status: "paid_cash" };
    const cancelled = { ...base, walk_date: "2026-10-09", status: "cancelled" };
    assert.equal(totalOwedInMonth([base, paid, cancelled], "2026-10"), 20);
    assert.equal(owedByCustomer([paid, cancelled], "2026-10").length, 0);
  });
});
