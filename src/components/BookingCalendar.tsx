import { useState } from "react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Clock, CalendarDays } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { getAvailableSlots } from "@/lib/bookings.functions";
import { BookingForm } from "./BookingForm";
import { cn } from "@/lib/utils";

const DURATIONS = [30, 60, 90];

export function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(60);
  const [slots, setSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchSlots = useServerFn(getAvailableSlots);

  const handleDateSelect = async (selected: Date | undefined) => {
    setDate(selected);
    setSelectedTime(null);
    setShowForm(false);
    if (!selected) {
      setSlots([]);
      return;
    }
    setLoading(true);
    try {
      const dateStr = format(selected, "yyyy-MM-dd");
      const result = await fetchSlots({ data: { date: dateStr } });
      setSlots(result);
    } catch (err) {
      console.error("Failed to fetch slots:", err);
    } finally {
      setLoading(false);
    }
  };

  const today = startOfDay(new Date());
  const disabledDays = (day: Date) => isBefore(day, today);

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">Book online</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pick a date and time
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Choose your preferred walk date and slot. We'll confirm your booking within minutes.
          </p>
        </div>

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
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => {
                          setSelectedTime(slot.time);
                          setShowForm(true);
                        }}
                        className={cn(
                          "rounded-md border px-2 py-2 text-sm font-medium transition-colors",
                          selectedTime === slot.time
                            ? "border-ocean bg-ocean text-primary-foreground"
                            : slot.available
                              ? "border-border bg-background text-foreground hover:border-ocean hover:bg-ocean/5"
                              : "border-border bg-muted text-muted-foreground cursor-not-allowed",
                        )}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4">
                    <p className="mb-2 text-sm font-medium text-foreground">Walk duration</p>
                    <div className="flex gap-2">
                      {DURATIONS.map((d) => (
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
                          {d} min
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {showForm && date && selectedTime && (
          <div className="mt-8">
            <BookingForm
              date={date}
              time={selectedTime}
              duration={selectedDuration}
              onBack={() => setShowForm(false)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
