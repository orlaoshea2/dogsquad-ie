import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, PawPrint } from "lucide-react";
import { createBooking } from "@/lib/bookings.functions";

const enquirySchema = z.object({
  name: z.string().min(2, "Your name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  dogName: z.string().min(1, "Your dog's name is required"),
  dogBreed: z.string().optional(),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a preferred date"),
  preferredTime: z.enum(["morning", "afternoon", "evening"]),
  duration: z.enum(["30", "60", "90"]),
  notes: z.string().optional(),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

const TIME_MAP: Record<EnquiryValues["preferredTime"], string> = {
  morning: "09:00",
  afternoon: "13:00",
  evening: "17:00",
};

export function BookingEnquiry() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const submit = useServerFn(createBooking);

  const form = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dogName: "",
      dogBreed: "",
      preferredDate: "",
      preferredTime: "morning",
      duration: "90",
      notes: "",
    },
  });

  const onSubmit = async (v: EnquiryValues) => {
    setSubmitting(true);
    try {
      await submit({
        data: {
          name: v.name,
          email: v.email,
          phone: v.phone,
          dogName: v.dogName,
          dogBreed: v.dogBreed,
          walkDate: v.preferredDate,
          walkTime: TIME_MAP[v.preferredTime],
          durationMinutes: parseInt(v.duration, 10),
          notes: v.notes,
        },
      });
      setSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);
      form.setError("root", { message: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">Get in touch</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Booking enquiry
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tell us a little about your dog and when you'd like a walk — we'll come back to you within a few hours.
          </p>
        </div>

        <Card className="mt-10 border-border/60 bg-card">
          <CardContent className="p-6 sm:p-8">
            {success ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle2 className="h-14 w-14 text-teal" />
                <h3 className="mt-4 font-display text-2xl font-bold">Thanks — enquiry received!</h3>
                <p className="mt-2 max-w-md text-muted-foreground">
                  We'll be in touch shortly to confirm your walk.
                </p>
                <Button
                  onClick={() => setSuccess(false)}
                  className="mt-6 bg-ocean text-primary-foreground hover:bg-ocean-light"
                >
                  Send another enquiry
                </Button>
              </div>
            ) : (
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
                  <Label htmlFor="phone">Phone (optional)</Label>
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
                  <Label htmlFor="dogBreed">Dog's breed (optional)</Label>
                  <Input id="dogBreed" placeholder="Golden Retriever" {...form.register("dogBreed")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred date</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    {...form.register("preferredDate")}
                  />
                  {form.formState.errors.preferredDate && (
                    <p className="text-sm text-destructive">{form.formState.errors.preferredDate.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Time of day</Label>
                  <select
                    id="preferredTime"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    {...form.register("preferredTime")}
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Walk duration</Label>
                  <select
                    id="duration"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    {...form.register("duration")}
                  >
                    <option value="75">75 minutes door to door (€20)</option>
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Anything we should know?</Label>
                  <Textarea id="notes" rows={4} placeholder="Temperament, allergies, pickup instructions…" {...form.register("notes")} />
                </div>

                {form.formState.errors.root && (
                  <p className="text-sm text-destructive sm:col-span-2">{form.formState.errors.root.message}</p>
                )}

                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="w-full bg-ocean text-primary-foreground hover:bg-ocean-light sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <PawPrint className="mr-2 h-4 w-4" /> Send enquiry
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
