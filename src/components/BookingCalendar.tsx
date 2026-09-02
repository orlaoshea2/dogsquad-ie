import { useState, useEffect } from "react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Clock, CalendarDays, PawPrint, Home, MessageCircle, Car, Plus, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { getAvailableSlots } from "@/lib/bookings.functions";
import { BookingForm, type BookingItem } from "./BookingForm";
import { FreeConsult } from "./FreeConsult";
import { TaxiRequest } from "./TaxiRequest";
import { cn } from "@/lib/utils";
import { WALK_DURATION_MINUTES, isBookableDate } from "@/config/schedule";
import { getBookingPrice } from "@/config/payments";

type BookableService = "walk" | "visit";
type TabId = BookableService | "consult" | "taxi";

const DURATIONS_BY_SERVICE: Record<BookableService, number[]> = {
  walk: [WALK_DURATION_MINUTES],
  visit: [30, 60],
};

const PRICE_LABEL: Record<BookableService, Record<number, string>> = {
  walk: { [WALK_DURATION_MINUTES]: "€20" },
  visit: { 30: "€20", 60: "€30" },
};

function nextBookableDay(from: Date): Date {
  let d = addDays(startOfDay(from), 1);
  for (let i = 0; i < 60 && !isBookableDate(d); i++) d = addDays(d, 1);
  return d;
}

export function BookingCalendar() {
  const [serviceType, setServiceType] = useState<TabId>("walk");
  const [date, setDate] = useState<Date | undefined>(() => nextBookableDay(new Date()));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(WALK_DURATION_MINUTES);


  const [slots, setSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState<BookingItem[]>([]);

  const itemKey = (i: BookingItem) => `${i.dateStr}-${i.time}`;
  const isAdded = (dateStr: string, time: string) =>
    items.some((i) => i.dateStr === dateStr && i.time === time);

  const addItem = () => {
    if (!date || !selectedTime || serviceType === "consult" || serviceType === "taxi") return;
    const dateStr = format(date, "yyyy-MM-dd");
    if (isAdded(dateStr, selectedTime)) return;
    setItems((prev) => [
      ...prev,
      {
        serviceType: serviceType as BookableService,
        date,
        dateStr,
        time: selectedTime,
        duration: selectedDuration,
      },
    ].sort((a, b) => (a.dateStr + a.time).localeCompare(b.dateStr + b.time)));
    setSelectedTime(null);
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((i) => itemKey(i) !== key));
  };

  const total = items.reduce((sum, i) => sum + getBookingPrice(i.serviceType, i.duration), 0);

  const fetchSlots = useServerFn(getAvailableSlots);

  useEffect(() => {
    if (!date || serviceType === "consult" || serviceType === "taxi") {
      setSlots([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const dateStr = format(date, "yyyy-MM-dd");
        const result = await fetchSlots({ data: { date: dateStr, serviceType: serviceType as BookableService } });
        if (!cancelled) setSlots(result);
      } catch (err) {
        console.error("Failed to fetch slots:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, serviceType]);

  const handleDateSelect = (selected: Date | undefined) => {
    setDate(selected);
    setSelectedTime(null);
    setShowForm(false);
  };

  const today = startOfDay(new Date());
  const disabledDays = (day: Date) => isBefore(day, today) || !isBookableDate(day);

  return (
    <section id="book" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">Book online in 60 seconds</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pick a date & time
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Dog walks are <strong>€20 for 75 minutes door to door</strong> in Greystones, Delgany & Kilcoole, Monday to Friday.
            Walks leave at 9am, 12pm and 3pm; home visits at 11am, 2pm and 5pm.
          </p>
        </div>


        <div className="mx-auto mt-8 flex max-w-xl flex-wrap gap-2 rounded-lg border border-border/60 bg-card p-1">
          {([
            { id: "walk", label: "Dog walk", Icon: PawPrint },
            { id: "visit", label: "Home visit", Icon: Home },
            { id: "consult", label: "Free consult", Icon: MessageCircle },
            { id: "taxi", label: "Dog taxi", Icon: Car },
          ] as const).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => {
                setServiceType(id);
                if (id === "consult" || id === "taxi") return;
                const durations = DURATIONS_BY_SERVICE[id];
                if (!durations.includes(selectedDuration)) setSelectedDuration(durations[0]);
              }}
              className={cn(
                "flex min-w-[45%] flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors sm:min-w-0",
                serviceType === id
                  ? "bg-ocean text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {serviceType === "consult" ? (
          <div className="mt-8">
            <FreeConsult embedded />
          </div>
        ) : serviceType === "taxi" ? (
          <div className="mt-8">
            <TaxiRequest />
          </div>
        ) : (
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card className="border-border/60 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 pb-4">
                <CalendarDays className="h-5 w-5 text-teal" />
                <h3 className="font-display text-lg font-semibold">Select a date</h3>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                className="mx-auto rounded-md"
                classNames={{
                  day_selected: "bg-ocean text-primary-foreground hover:bg-ocean-light",
                  day_today: "bg-accent/10 text-accent-foreground",
                }}
              />
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 pb-4">
                <Clock className="h-5 w-5 text-teal" />
                <h3 className="font-display text-lg font-semibold">Available slots</h3>
              </div>

              {!date && (
                <p className="text-muted-foreground">Select a date to see available times.</p>
              )}

              {date && loading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading slots...
                </div>
              )}

              {date && !loading && slots.length === 0 && (
                <p className="text-muted-foreground">No slots available for this date.</p>
              )}

              {date && !loading && slots.length > 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slots.map((slot) => {
                      const dateStr = date ? format(date, "yyyy-MM-dd") : "";
                      const added = isAdded(dateStr, slot.time);
                      const disabled = !slot.available || added;
                      return (
                        <button
                          key={slot.time}
                          disabled={disabled}
                          onClick={() => setSelectedTime(slot.time)}
                          className={cn(
                            "rounded-md border px-2 py-2 text-sm font-medium transition-colors",
                            selectedTime === slot.time
                              ? "border-ocean bg-ocean text-primary-foreground"
                              : added
                                ? "border-teal/40 bg-teal/10 text-teal cursor-not-allowed"
                                : slot.available
                                  ? "border-border bg-background text-foreground hover:border-ocean hover:bg-ocean/5"
                                  : "border-border bg-muted text-muted-foreground cursor-not-allowed",
                          )}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4">
                    <p className="mb-2 text-sm font-medium text-foreground">
                      {serviceType === "walk" ? "Walk" : "Visit"} duration
                    </p>
                    <div className="flex gap-2">
                      {DURATIONS_BY_SERVICE[serviceType].map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDuration(d)}
                          className={cn(
                            "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                            selectedDuration === d
                              ? "border-ocean bg-ocean text-primary-foreground"
                              : "border-border bg-background text-foreground hover:border-ocean hover:bg-ocean/5",
                          )}
                        >
                          {PRICE_LABEL[serviceType][d]} — {d} min
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={addItem}
                    disabled={!selectedTime}
                    className="w-full bg-ocean text-primary-foreground hover:bg-ocean-light"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add to booking
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Add as many walks or visits as you like, then continue once.
                  </p>
                </div>
              )}

              {items.length > 0 && (
                <div className="mt-6 rounded-lg border border-teal/30 bg-teal/5 p-4">
                  <p className="mb-3 text-sm font-semibold text-foreground">
                    Your booking ({items.length} {items.length === 1 ? "service" : "services"})
                  </p>
                  <ul className="space-y-2">
                    {items.map((i) => (
                      <li key={itemKey(i)} className="flex items-center justify-between gap-2 text-sm">
                        <span className="text-foreground">
                          {i.serviceType === "walk" ? "Dog walk" : "Home visit"} ·{" "}
                          {format(i.date, "EEE d MMM")} at {i.time} · {i.duration} min
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                          <span className="font-medium">€{getBookingPrice(i.serviceType, i.duration)}</span>
                          <button
                            type="button"
                            onClick={() => removeItem(itemKey(i))}
                            aria-label="Remove"
                            className="rounded p-1 text-muted-foreground hover:bg-background hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex items-center justify-between border-t border-teal/20 pt-3 text-sm font-semibold">
                    <span>Total</span>
                    <span>€{total}</span>
                  </div>
                  {!showForm && (
                    <Button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="mt-4 w-full bg-ocean text-primary-foreground hover:bg-ocean-light"
                    >
                      Continue to details
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        )}

        {showForm && items.length > 0 && (
          <div className="mt-8">
            <BookingForm
              items={items}
              onBack={() => setShowForm(false)}
              onSuccess={() => setItems([])}
            />
          </div>
        )}
      </div>
    </section>
  );
}
