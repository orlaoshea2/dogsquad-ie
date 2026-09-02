import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Car, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function TaxiRequest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [times, setTimes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (name.trim().length < 2 || !email.trim() || !fromAddress.trim() || !toAddress.trim() || times.trim().length < 3) {
      setError("Please fill in your name, email, both addresses and the times that would suit.");
      return;
    }
    setSubmitting(true);
    try {
      const message = [
        "Dog taxi request",
        `From: ${fromAddress.trim()}`,
        `To: ${toAddress.trim()}`,
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

  return (
    <Card className="mx-auto max-w-3xl border-primary/20 shadow-lg">
      <CardContent className="p-8">
        {sent ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-14 w-14 text-teal" />
            <h2 className="text-2xl font-bold text-foreground">Request sent!</h2>
            <p className="max-w-md text-muted-foreground">
              Thanks {name.split(" ")[0]} — Orla will confirm the price and time shortly.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSent(false);
                setName("");
                setEmail("");
                setPhone("");
                setFromAddress("");
                setToAddress("");
                setTimes("");
              }}
            >
              Send another request
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-bold text-foreground">Dog taxi</h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                Tell us where your dog needs to go — the vet, the groomer, the airport — and the
                times that would suit. Prices: <strong>€20 up to 10 km</strong>,{" "}
                <strong>€30 for 10–20 km</strong>. Over 20 km?{" "}
                <a href="mailto:hello@dogsquad.ie" className="underline hover:text-foreground">
                  Contact us directly
                </a>
                .
              </p>
            </div>

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
                <Label htmlFor="taxi-from">From</Label>
                <Input
                  id="taxi-from"
                  placeholder="Pick-up address"
                  value={fromAddress}
                  onChange={(e) => setFromAddress(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxi-to">To</Label>
                <Input
                  id="taxi-to"
                  placeholder="Drop-off address"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="taxi-times">What times would suit?</Label>
                <Textarea
                  id="taxi-times"
                  placeholder="e.g. Tuesday or Thursday around 2pm"
                  rows={3}
                  value={times}
                  onChange={(e) => setTimes(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-destructive sm:col-span-2">{error}</p>
              )}

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full bg-ocean text-primary-foreground hover:bg-ocean-light sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Car className="mr-2 h-4 w-4" /> Request a dog taxi
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
