// Revolut Business payment links
// Replace these placeholders with the links from your Revolut Business account.
// Each link can be created in Revolut Business → Merchant → Payment links.

export const REVOLUT_PAYMENT_LINKS = {
  // €20 dog walk (75 min)
  walk: "https://pay.revolut.com/r/YOUR_DOG_WALK_LINK",
  // €20 home visit (30 min)
  visit30: "https://pay.revolut.com/r/YOUR_HOME_VISIT_30_LINK",
  // €30 home visit (60 min)
  visit60: "https://pay.revolut.com/r/YOUR_HOME_VISIT_60_LINK",
  // Fallback if none of the above match
  default: "https://pay.revolut.com/r/YOUR_DEFAULT_LINK",
};

export type PaymentMethod = "revolut" | "pay_later";

// Revolut.me username (the part after revolut.me/). When set, customers are
// sent to Revolut with the exact booking total already filled in.
export const REVOLUT_ME_USERNAME = "";

/** Revolut link with the total due prefilled (amount in euro). */
export function getRevolutAmountLink(totalEur: number): string | null {
  if (!REVOLUT_ME_USERNAME || totalEur <= 0) return null;
  const cents = Math.round(totalEur * 100);
  return `https://revolut.me/${encodeURIComponent(REVOLUT_ME_USERNAME)}?amount=${cents}&currency=EUR`;
}


export function getRevolutPaymentLink(serviceType: "walk" | "visit", durationMinutes: number): string {
  if (serviceType === "walk") return REVOLUT_PAYMENT_LINKS.walk;
  if (durationMinutes === 30) return REVOLUT_PAYMENT_LINKS.visit30;
  if (durationMinutes === 60) return REVOLUT_PAYMENT_LINKS.visit60;
  return REVOLUT_PAYMENT_LINKS.default;
}

export function getBookingPrice(serviceType: "walk" | "visit", durationMinutes: number): number {
  if (serviceType === "walk") return 20;
  if (durationMinutes === 30) return 20;
  if (durationMinutes === 60) return 30;
  return 0;
}
