import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Services } from "@/components/Services";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Footprints, Users, Baby, Clock, MapPin, Shield, Camera, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const serviceDetails = [
  {
    icon: Footprints,
    title: "Solo Walks",
    description: "One walker, one dog. Perfect for reactive dogs, seniors, or pups who need focused training reinforcement. Get in touch to organise.",
    price: "Contact to organise",
    features: ["Personalised route", "1-on-1 attention", "Tailored schedule"],
  },

  {
    icon: Users,
    title: "Group Adventures",
    description: "Small groups of compatible dogs explore local parks and trails together. Great exercise and socialisation.",
    price: "€20 / 75 min door to door",
    features: ["Max 6 dogs per group", "Matching by temperament", "75 minutes door to door"],
  },
  {
    icon: Baby,
    title: "Puppy Visits",
    description: "Young puppies need frequent breaks. We feed, play, clean up, and give plenty of cuddles.",
    price: "€20 / 20 min",
    features: ["Toilet training help", "Feeding & play", "Flexible timing"],
  },
  {
    icon: Clock,
    title: "Home Visits",
    description: "Drop-in visits to feed, play and check on your dog in their own home while you're out.",
    price: "€20 / 30 min · €30 / 60 min",
    features: ["Feeding & play", "Toilet breaks", "Medication support"],
  },
  {
    icon: Car,
    title: "Dog Taxi",
    description: "Door-to-door lifts to the vet, groomer, day care or the beach. The price is set by the driving distance between the two addresses.",
    price: "From €15",
    features: ["Under 5 km — €15", "5–10 km — €20", "10–20 km — €25"],
  },
];



export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Dog Walking Services | Dog Squad" },
      { name: "description", content: "Explore our dog walking services: solo walks, group adventures, puppy visits and home visits in Greystones, Delgany & Kilcoole." },
      { property: "og:title", content: "Dog Walking Services | Dog Squad" },
      { property: "og:description", content: "Explore our dog walking services: solo walks, group adventures, puppy visits and home visits in Greystones, Delgany & Kilcoole." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Services that fit your dog
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Whether your dog needs a calm solo stroll or an energetic group hike, we have the right option.
            </p>
          </div>
        </section>

        <Services />

        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">Pricing</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Clear pricing packages
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Simple, flat rate for dog walks — €20 for 75 minutes door to door in Greystones, Delgany & Kilcoole.
              </p>
            </div>

            <div className="mt-12 overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
              <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                      <Footprints className="h-5 w-5 text-teal" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-card-foreground">Solo Walks</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">One walker, one dog. Personal attention and training reinforcement.</p>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-center justify-between text-foreground">
                      <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-teal" /> Bespoke schedule</span>
                      <a href="/contact" className="font-display font-semibold text-ocean hover:underline">Contact to organise</a>
                    </li>
                  </ul>
                </div>


                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                      <Users className="h-5 w-5 text-teal" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-card-foreground">Group Adventures</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Small matched groups of up to 6 dogs. Social, fun and great exercise. 75 minutes door to door.</p>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-center justify-between text-foreground">
                      <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-teal" /> 75 minutes door to door</span>
                      <span className="font-display font-semibold text-ocean">€20</span>
                    </li>
                  </ul>
                </div>

              </div>

              <div className="grid divide-y border-t border-border/60 md:grid-cols-2 md:divide-x md:divide-y-0">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                      <Baby className="h-5 w-5 text-teal" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-card-foreground">Puppy Visits</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Feeding, play, toilet breaks and cuddles for young puppies.</p>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-center justify-between text-foreground">
                      <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-teal" /> 20 minutes</span>
                      <span className="font-display font-semibold text-ocean">€20</span>
                    </li>
                    <li className="flex items-center justify-between text-foreground">
                      <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-teal" /> 45 minutes</span>
                      <span className="font-display font-semibold text-ocean">€30</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                      <Clock className="h-5 w-5 text-teal" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-card-foreground">Home Visits</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Drop-in care in your own home so your dog keeps their routine.</p>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-center justify-between text-foreground">
                      <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-teal" /> 30 minute visit</span>
                      <span className="font-display font-semibold text-ocean">€20</span>
                    </li>
                    <li className="flex items-center justify-between text-foreground">
                      <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-teal" /> 60 minute visit</span>
                      <span className="font-display font-semibold text-ocean">€30</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {serviceDetails.map((service) => (
                <Card key={service.title} className="border-border/60 bg-card">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10">
                      <service.icon className="h-6 w-6 text-teal" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-card-foreground">{service.title}</h3>
                    <p className="font-display font-semibold text-ocean">{service.price}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ocean py-16 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 shrink-0 text-teal" />
                <div>
                  <h3 className="font-display text-lg font-semibold">Fully insured</h3>
                  <p className="mt-1 text-sm text-primary-foreground/80">Every walk is covered for peace of mind.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-8 w-8 shrink-0 text-teal" />
                <div>
                  <h3 className="font-display text-lg font-semibold">GPS-tracked</h3>
                  <p className="mt-1 text-sm text-primary-foreground/80">See exactly where your dog walked.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Camera className="h-8 w-8 shrink-0 text-teal" />
                <div>
                  <h3 className="font-display text-lg font-semibold">Photo updates</h3>
                  <p className="mt-1 text-sm text-primary-foreground/80">Receive photos after every adventure.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Ready to book?</h2>
            <Link to="/booking" className="mt-4 inline-block">
              <Button size="lg" className="bg-ocean text-primary-foreground hover:bg-ocean-light">
                Book a walk <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
