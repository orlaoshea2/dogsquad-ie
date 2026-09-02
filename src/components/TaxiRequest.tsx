import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Car, CheckCircle2, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const TAXI_TIERS = [
  { label: "0 – 10 km", price: "€20" },
  { label: "10 – 20 km", price: "€30" },
  { label: "Over 20 km", price: "Contact us" },
];

export function TaxiRequest({ embedded = false }: { embedded?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [times, setTimes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setFrom("");
    setTo("");
    setTimes("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (
      name.trim().length < 2 ||
      !email.trim() ||
      from.trim().length < 3 ||
      to.trim().length < 3 ||
      times.trim().length < 3
    ) {
      setError("Please add your name, email, both addresses and the times that suit you.");
      return;
    }
    setSubmitting(true);
    try {
      const message = [
        "[Dog taxi request]",
        `From: ${from.trim()}`,
        `To: ${to.trim()}`,
        `Times that suit: ${times.trim()}`,
      ].join("\n");

      const { error: insertError } = await supabase.from("consult_messages").insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        message,
      });
      if (insertError) throw insertError;
      setSent(true);
    } catch (err) {
      console.error("Taxi request failed:", err);
      setError("Couldn't send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const card = (
    <Card className="mx-auto max-w-3xl border-primary/20 shadow-lg">
      <CardContent className="p-8">
        {sent ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-14 w-14 text-teal" />
            <h2 className="text-2xl font-bold text-foreground">Request sent!</h2>
            <p className="max-w-md text-muted-foreground">
              Thanks {name.split(" ")[0] || "there"} — Orla will confirm the distance, price and a
              time that suits you.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSent(false);
                reset();
              }}
            >
              Send another request
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Car className="h-4 w-4" />
                Dog taxi
              </span>
              <h2 className="text-3xl font-bold text-foreground">Request a dog taxi</h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                Safe lifts to the vet, groomer or daycare around Greystones, Delgany and Kilcoole.
                Tell us where from, where to and the times that suit.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {TAXI_TIERS.map((tier) => (
                <div
                  key={tier.label}
                  className="rounded-lg border border-border bg-muted/40 p-4 text-center"
                >
                  <p className="text-sm text-muted-foreground">{tier.label}</p>
                  <p className="mt-1 font-display text-xl font-bold text-foreground">{tier.price}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Journeys over 20 km — please contact us directly on 086 606 3416.
            </p>

            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="taxi-name">Your name</Label>
                <Input
                  id="taxi-name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxi-email">Email</Label>
                <Input
                  id="taxi-email"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="taxi-phone">Phone (optional)</Label>
                <Input
                  id="taxi-phone"
                  type="tel"
                  placeholder="087 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxi-from">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-teal" /> From
                  </span>
                </Label>
                <Input
                  id="taxi-from"
                  placeholder="12 Church Road, Greystones"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  maxLength={300}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxi-to">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-ocean" /> To
                  </span>
                </Label>
                <Input
                  id="taxi-to"
                  placeholder="Vet clinic, Kilcoole"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  maxLength={300}
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="taxi-times">What times would suit?</Label>
                <Textarea
                  id="taxi-times"
                  rows={3}
                  placeholder="Tuesday morning before 11am, or any afternoon this week…"
                  value={times}
                  onChange={(e) => setTimes(e.target.value)}
                  maxLength={500}
                  required
                />
              </div>

              {error && <p className="text-sm text-destructive sm:col-span-2">{error}</p>}

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-ocean text-primary-foreground hover:bg-ocean-light"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    "Send taxi request"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (embedded) return card;

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">{card}</div>
    </section>
  );
}
