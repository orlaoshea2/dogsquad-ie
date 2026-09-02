import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MessageCircle, PawPrint, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function FreeConsult() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (name.trim().length < 2 || !email.trim() || message.trim().length < 5) {
      setError("Please add your name, email and a short message.");
      return;
    }
    setSubmitting(true);
    try {
      const { error: insertError } = await supabase.from("consult_messages").insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        message: message.trim(),
      });
      if (insertError) throw insertError;
      setSent(true);
    } catch (err) {
      console.error("Consult message failed:", err);
      setError("Couldn't send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="free-consult" className="bg-secondary/40 py-16">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-3xl border-primary/20 shadow-lg">
          <CardContent className="p-8">
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle2 className="h-14 w-14 text-teal" />
                <h2 className="text-2xl font-bold text-foreground">Message sent!</h2>
                <p className="max-w-md text-muted-foreground">
                  Thanks {name.split(" ")[0]} — Orla will get back to you shortly to organise your
                  free consult.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSent(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3 text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                    <PawPrint className="h-4 w-4" />
                    Free, no-obligation
                  </span>
                  <h2 className="text-3xl font-bold text-foreground">Book a free consult</h2>
                  <p className="mx-auto max-w-xl text-muted-foreground">
                    Message us to organise a free consult — tell us a little about your dog and
                    we'll be in touch. Greystones, Delgany and Kilcoole.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="consult-name">Your name</Label>
                    <Input
                      id="consult-name"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consult-email">Email</Label>
                    <Input
                      id="consult-email"
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="consult-phone">Phone (optional)</Label>
                    <Input
                      id="consult-phone"
                      type="tel"
                      placeholder="087 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="consult-message">Message</Label>
                    <Textarea
                      id="consult-message"
                      placeholder="Hi Orla, I'd like a free consult. My dog's name is…"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
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
                          <MessageCircle className="mr-2 h-4 w-4" /> Message us
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
