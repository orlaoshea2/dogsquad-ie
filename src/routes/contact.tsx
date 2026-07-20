import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Dog Squad Wicklow" },
      { name: "description", content: "Get in touch with Dog Squad — dog walking in Greystones, Delgany and Kilcoole, Co. Wicklow." },
      { property: "og:title", content: "Contact | Dog Squad Wicklow" },
      { property: "og:description", content: "Get in touch with Dog Squad — dog walking in Greystones, Delgany and Kilcoole, Co. Wicklow." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Get in touch
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Have a question or a special request? We're here to help.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border/60 bg-card">
                <CardContent className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10">
                    <Phone className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">Phone</h3>
                  <a href="tel:+353866063416" className="mt-2 text-sm font-semibold text-ocean hover:underline">
                    086 606 3416
                  </a>
                </CardContent>
              </Card>
              <Card className="border-border/60 bg-card">
                <CardContent className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10">
                    <Mail className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">Email</h3>
                  <p className="mt-2 text-sm text-muted-foreground">hello@dogsquad.ie</p>
                </CardContent>
              </Card>
              <Card className="border-border/60 bg-card">
                <CardContent className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10">
                    <MapPin className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">Location</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Greystones, Co. Wicklow</p>
                </CardContent>
              </Card>
              <Card className="border-border/60 bg-card">
                <CardContent className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10">
                    <Clock className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">Hours</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Mon–Sat, 8am–7pm</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <p className="text-muted-foreground">
                Prefer to book directly? Use our{" "}
                <a href="/booking" className="font-semibold text-ocean hover:underline">
                  online booking calendar
                </a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
