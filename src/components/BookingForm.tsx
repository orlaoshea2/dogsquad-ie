import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, CheckCircle2, ArrowLeft, UserCheck, LogIn, CreditCard, Banknote } from "lucide-react";
import { createBooking } from "@/lib/bookings.functions";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getRevolutPaymentLink, getBookingPrice, REVOLUT_PAYMENT_LINKS, type PaymentMethod } from "@/config/payments";

const bookingFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  dogName: z.string().min(1, "Dog name is required"),
  dogBreed: z.string().optional(),
  notes: z.string().optional(),
  paymentMethod: z.enum(["revolut", "pay_later"]).default("pay_later"),
});

type BookingFormValues = z.input<typeof bookingFormSchema>;

interface BookingFormProps {
  serviceType?: "walk" | "visit";
  date: Date;
  time: string;
  duration: number;
  onBack?: () => void;
}

export function BookingForm({ serviceType = "walk", date, time, duration, onBack }: BookingFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pay_later");
  const submitBooking = useServerFn(createBooking);
  const { user, profile } = useAuth();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dogName: "",
      dogBreed: "",
      notes: "",
      paymentMethod: "pay_later",
    },
  });

  // Prefill from profile when signed in
  useEffect(() => {
    if (user) {
      form.setValue("email", profile?.email ?? user.email ?? "");
      if (profile?.full_name) form.setValue("name", profile.full_name);
      if (profile?.phone) form.setValue("phone", profile.phone);
    }
  }, [user, profile, form]);

  const price = getBookingPrice(serviceType, duration);
  const revolutLink = getRevolutPaymentLink(serviceType, duration);

  const onSubmit = async (values: BookingFormValues) => {
    setSubmitting(true);
    try {
      const servicePrefix = `[${serviceType === "visit" ? "Home visit" : "Dog walk"}]`;
      const mergedNotes = values.notes ? `${servicePrefix} ${values.notes}` : servicePrefix;
      const method: PaymentMethod = values.paymentMethod ?? "pay_later";
      await submitBooking({
        data: {
          ...values,
          notes: mergedNotes,
          walkDate: format(date, "yyyy-MM-dd"),
          walkTime: time,
          durationMinutes: duration,
          paymentMethod: method,
          serviceType,
          userId: user?.id,
        },
      });

      // Save/update profile details for signed-in customers
      if (user) {
        await supabase.from("profiles").upsert({
          id: user.id,
          full_name: values.name,
          phone: values.phone ?? "",
          email: values.email,
        });
      }

      setPaymentMethod(method);
      setSuccess(true);
      form.reset();

      // Redirect to Revolut payment link if selected
      if (method === "revolut" && revolutLink) {
        window.location.href = revolutLink;
      }
    } catch (err) {
      console.error("Booking failed:", err);
      form.setError("root", { message: "Failed to submit booking. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    if (paymentMethod === "revolut") {
      return (
        <Card className="border-teal/30 bg-card">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-teal" />
            <h3 className="mt-4 font-display text-2xl font-bold text-foreground">Redirecting to Revolut…</h3>
            <p className="mt-2 max-w-md text-muted-foreground">
              Your booking for {format(date, "EEEE, MMMM do")} at {time} is saved. If you are not redirected, click the button below.
            </p>
            <Button asChild className="mt-6 bg-ocean text-primary-foreground hover:bg-ocean-light">
              <a href={revolutLink} target="_blank" rel="noreferrer">
                <CreditCard className="mr-2 h-4 w-4" /> Pay €{price} now
              </a>
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="border-teal/30 bg-card">
        <CardContent className="flex flex-col items-center py-12 text-center">
          <CheckCircle2 className="h-16 w-16 text-teal" />
          <h3 className="mt-4 font-display text-2xl font-bold text-foreground">Booking confirmed!</h3>
          <p className="mt-2 max-w-md text-muted-foreground">
            Your booking for {format(date, "EEEE, MMMM do")} at {time} is confirmed. We'll be in touch to confirm the details.
          </p>
          <Button onClick={() => setSuccess(false)} className="mt-6 bg-ocean text-primary-foreground hover:bg-ocean-light">
            Book another walk
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/60 bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {onBack && (
            <Button type="button" variant="ghost" size="icon" onClick={onBack} className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">Complete your booking</h3>
            <p className="text-sm text-muted-foreground">
              {serviceType === "visit" ? `Home visit — €${duration === 30 ? "20" : "30"}` : `Dog walk — €20 · 75 min door to door`} · {format(date, "EEEE, MMMM do")} at {time} · {duration} minutes total
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {user ? (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-teal/30 bg-teal/5 px-3 py-2 text-sm text-foreground">
            <UserCheck className="h-4 w-4 text-teal" />
            <span>Signed in as <strong>{profile?.email ?? user.email}</strong> — your details are prefilled.</span>
          </div>
        ) : (
          <div className="mb-4 flex items-center justify-between gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm">
            <span className="text-muted-foreground">Have an account? Sign in to skip filling in your details.</span>
            <Link
              to="/auth"
              className="inline-flex shrink-0 items-center gap-1 font-semibold text-ocean hover:underline"
            >
              <LogIn className="h-3.5 w-3.5" /> Sign in
            </Link>
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" placeholder="Jane Doe" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="jane@example.com" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="+353 87 123 4567" {...form.register("phone")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dogName">Dog's name</Label>
            <Input id="dogName" placeholder="Buddy" {...form.register("dogName")} />
            {form.formState.errors.dogName && (
              <p className="text-sm text-destructive">{form.formState.errors.dogName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dogBreed">Dog's breed</Label>
            <Input id="dogBreed" placeholder="Golden Retriever" {...form.register("dogBreed")} />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Anything we should know about your dog?"
              rows={3}
              {...form.register("notes")}
            />
          </div>

          <div className="space-y-3 sm:col-span-2">
            <Label>Payment option</Label>
            <RadioGroup
              defaultValue="pay_later"
              value={form.watch("paymentMethod")}
              onValueChange={(value) => form.setValue("paymentMethod", value as PaymentMethod)}
              className="grid gap-3 sm:grid-cols-2"
            >
              <label
                htmlFor="pay-later"
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                  form.watch("paymentMethod") === "pay_later"
                    ? "border-ocean bg-ocean/5"
                    : "border-border bg-background hover:border-ocean/50"
                }`}
              >
                <RadioGroupItem value="pay_later" id="pay-later" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Banknote className="h-4 w-4 text-teal" />
                    Confirm now — pay cash later
                  </div>
                  <p className="text-sm text-muted-foreground">Cash or bank transfer — nothing to pay today.</p>
                </div>
              </label>

              <label
                htmlFor="revolut"
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                  form.watch("paymentMethod") === "revolut"
                    ? "border-ocean bg-ocean/5"
                    : "border-border bg-background hover:border-ocean/50"
                }`}
              >
                <RadioGroupItem value="revolut" id="revolut" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <CreditCard className="h-4 w-4 text-teal" />
                    Pay now with Revolut
                  </div>
                  <p className="text-sm text-muted-foreground">Prefer to pay online? Pay €{price} via Revolut.</p>
                </div>
              </label>
            </RadioGroup>
          </div>

          {form.formState.errors.root && (
            <p className="text-sm text-destructive sm:col-span-2">{form.formState.errors.root.message}</p>
          )}

          <div className="sm:col-span-2">
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-ocean text-primary-foreground hover:bg-ocean-light sm:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                `Confirm booking — ${form.watch("paymentMethod") === "revolut" ? `Pay €${price} with Revolut` : "Pay cash later"}`
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
