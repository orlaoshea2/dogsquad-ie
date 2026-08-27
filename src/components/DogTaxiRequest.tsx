import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Car, MapPin, CheckCircle2, CreditCard, Banknote, AlertCircle } from "lucide-react";
import { quoteDogTaxi, createTaxiBooking, type TaxiQuote } from "@/lib/dogTaxi.functions";
import { TAXI_TIERS } from "@/config/taxi";
import { isBookableDate, parseDateString } from "@/config/schedule";
import { useAuth } from "@/hooks/useAuth";
import { REVOLUT_PAYMENT_LINKS, type PaymentMethod } from "@/config/payments";

export function DogTaxiRequest() {
  const { user, profile } = useAuth();
  const getQuote = useServerFn(quoteDogTaxi);
  const submitBooking = useServerFn(createTaxiBooking);

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [quote, setQuote] = useState<TaxiQuote | null>(null);
  const [quoting, setQuoting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pay_later");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setEmail(profile?.email ?? user.email ?? "");
    if (profile?.full_name) setName(profile.full_name);
    if (profile?.phone) setPhone(profile.phone);
  }, [user, profile]);

  const dateInvalid = date !== "" && !isBookableDate(parseDateString(date));

  const handleQuote = async () => {
    setQuoting(true);
    setQuote(null);
    setError(null);
    try {
      const result = await getQuote({ data: { pickup, dropoff } });
      setQuote(result);
    } catch {
      setError("Something went wrong getting your quote. Please try again.");
    } finally {
      setQuoting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submitBooking({
        data: {
          name,
          email,
          phone: phone || undefined,
          dogName,
          dogBreed: dogBreed || undefined,
          pickup,
          dropoff,
          walkDate: date,
          walkTime: time,
          notes: notes || undefined,
          paymentMethod,
          userId: user?.id,
        },
      });
      setSubmitted(true);
      if (paymentMethod === "revolut") {
        window.open(REVOLUT_PAYMENT_LINKS.default, "_blank", "noopener,noreferrer");
      }
    } catch {
      setError("Your request couldn't be sent. Please try again or give me a call.");
    } finally {
      setSubmitting(false);
    }
  };

  const priced = quote?.ok === true;

  if (submitted) {
    return (
      <section id="dog-taxi" className="scroll-mt-24 py-16 sm:py-24 bg-teal/5">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <CheckCircle2 className="mx-auto h-12 w-12 text-teal" />
          <h2 className="mt-4 font-display text-3xl font-bold text-foreground">Dog taxi requested</h2>
          <p className="mt-3 text-muted-foreground">
            Thanks {name} — I've got your journey from {pickup} to {dropoff}. I'll confirm by email or phone shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="dog-taxi" className="scroll-mt-24 py-16 sm:py-24 bg-teal/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">Dog taxi</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Safe lifts for your dog
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Vet trips, groomers, day care or the beach. Tell me where to and from and you'll get an instant price
            based on the driving distance.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {TAXI_TIERS.map((tier) => (
              <span
                key={tier.label}
                className="rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground"
              >
                {tier.label} — <span className="font-display font-semibold text-ocean">€{tier.price}</span>
              </span>
            ))}
          </div>
        </div>

        <Card className="mt-10 border-border/60 bg-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-teal" />
              <h3 className="font-display text-lg font-semibold">Get a price</h3>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taxi-pickup">Pick-up address</Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="taxi-pickup"
                      className="pl-9"
                      placeholder="e.g. Church Road, Greystones"
                      value={pickup}
                      onChange={(e) => { setPickup(e.target.value); setQuote(null); }}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxi-dropoff">Drop-off address</Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="taxi-dropoff"
                      className="pl-9"
                      placeholder="e.g. Kilcoole Veterinary Clinic"
                      value={dropoff}
                      onChange={(e) => { setDropoff(e.target.value); setQuote(null); }}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleQuote}
                disabled={quoting || pickup.length < 4 || dropoff.length < 4}
                className="border-ocean text-ocean hover:bg-ocean/5"
              >
                {quoting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Get my price
              </Button>

              {quote?.ok === true && (
                <div className="rounded-lg border border-teal/40 bg-teal/10 p-4">
                  <p className="font-display text-lg font-semibold text-foreground">
                    €{quote.price} — {quote.distanceKm} km
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Price is based on the driving distance between your two addresses.
                  </p>
                </div>
              )}

              {quote && quote.ok === false && (
                <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{quote.message}</span>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taxi-date">Date</Label>
                  <Input id="taxi-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  {dateInvalid && (
                    <p className="text-sm text-destructive">
                      I'm available Monday to Friday, outside my closed periods. Please pick another date.
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxi-time">Time</Label>
                  <Input id="taxi-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxi-name">Your name</Label>
                  <Input id="taxi-name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxi-email">Email</Label>
                  <Input id="taxi-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxi-phone">Phone</Label>
                  <Input id="taxi-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxi-dog">Dog's name</Label>
                  <Input id="taxi-dog" value={dogName} onChange={(e) => setDogName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxi-breed">Breed (optional)</Label>
                  <Input id="taxi-breed" value={dogBreed} onChange={(e) => setDogBreed(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxi-notes">Anything I should know?</Label>
                <Textarea
                  id="taxi-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Appointment time, crate, anxious traveller…"
                />
              </div>

              <div className="space-y-3">
                <Label>Payment</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <Label
                    htmlFor="taxi-pay-revolut"
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:border-ocean"
                  >
                    <RadioGroupItem value="revolut" id="taxi-pay-revolut" />
                    <CreditCard className="h-4 w-4 text-teal" />
                    <span className="text-sm font-medium">Pay now with Revolut</span>
                  </Label>
                  <Label
                    htmlFor="taxi-pay-later"
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:border-ocean"
                  >
                    <RadioGroupItem value="pay_later" id="taxi-pay-later" />
                    <Banknote className="h-4 w-4 text-teal" />
                    <span className="text-sm font-medium">Pay later (cash or transfer)</span>
                  </Label>
                </RadioGroup>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button
                type="submit"
                size="lg"
                disabled={submitting || dateInvalid}
                className="w-full bg-ocean text-primary-foreground hover:bg-ocean-light"
              >
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {priced ? `Request dog taxi — €${(quote as { price: number }).price}` : "Request dog taxi"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Requests are confirmed by me before your journey. Dog taxi runs Monday to Friday
                {date ? ` — selected ${format(parseDateString(date), "EEE, MMM d")}` : ""}.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
