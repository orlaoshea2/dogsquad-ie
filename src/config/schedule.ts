// Availability rules for Dog Squad bookings.
// Walks and home visits run Monday to Friday only.

export type ServiceType = "walk" | "visit";

export const WALK_DURATION_MINUTES = 75;

export const SLOT_TIMES: Record<ServiceType, string[]> = {
  walk: ["09:00", "12:00", "15:00"],
  visit: ["11:00", "14:00"],
};

// Closed periods, recurring each year: [startMonth, startDay, endMonth, endDay]
// Months are 1-indexed. A range may wrap across the new year.
export const CLOSED_PERIODS: Array<[number, number, number, number]> = [
  [10, 26, 10, 30], // 26–30 October
  [12, 17, 1, 2], // 17 December – 2 January
];

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function isClosedDate(date: Date): boolean {
  const md = (date.getMonth() + 1) * 100 + date.getDate();
  return CLOSED_PERIODS.some(([sm, sd, em, ed]) => {
    const start = sm * 100 + sd;
    const end = em * 100 + ed;
    return start <= end ? md >= start && md <= end : md >= start || md <= end;
  });
}

export function isBookableDate(date: Date): boolean {
  return !isWeekend(date) && !isClosedDate(date);
}

/** Parse a yyyy-MM-dd string into a local Date without timezone drift. */
export function parseDateString(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}
