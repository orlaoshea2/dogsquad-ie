// Dog taxi distance-based pricing.

export const TAXI_TIERS = [
  { label: "Under 5 km", maxKm: 5, price: 15 },
  { label: "5 – 10 km", maxKm: 10, price: 20 },
  { label: "10 – 20 km", maxKm: 20, price: 25 },
] as const;

export const TAXI_MAX_KM = 20;

/** Returns the price in euro, or null when the trip is beyond the priced range. */
export function getTaxiPrice(distanceKm: number): number | null {
  for (const tier of TAXI_TIERS) {
    if (distanceKm <= tier.maxKm) return tier.price;
  }
  return null;
}
