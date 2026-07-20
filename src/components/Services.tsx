import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Footprints, Users, Baby, Clock, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Footprints,
    title: "Solo Walks",
    description: "One-on-one attention for dogs who prefer their own pace or need focused training.",
    price: "€25 / 30 min · €35 / 60 min · €45 / 90 min",
  },
  {
    icon: Users,
    title: "Group Adventures",
    description: "Social walks with a small pack of friendly dogs. Great exercise and socialisation.",
    price: "€18 / 60 min · €25 / 90 min",
  },
  {
    icon: Baby,
    title: "Puppy Visits",
    description: "Short visits for young pups including feeding, play, and toilet breaks.",
    price: "€20 / 20 min · €30 / 45 min",
  },
  {
    icon: Clock,
    title: "Home Visits",
    description: "Drop-in visits for feeding, play, toilet breaks and company while you're out.",
    price: "€25 / 30 min · €35 / 60 min",
  },
];

export function Services() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">Our services</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Walks for every kind of dog
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From energetic group hikes to calm solo strolls, we have a service that fits your dog's personality.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="group border-border/60 bg-card transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10">
                  <service.icon className="h-6 w-6 text-teal" />
                </div>
                <h3 className="font-display text-xl font-semibold text-card-foreground">{service.title}</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{service.description}</p>
                <p className="font-display font-semibold text-ocean">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/services">
            <Button variant="outline" className="border-ocean text-ocean hover:bg-ocean/5">
              View all services <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
