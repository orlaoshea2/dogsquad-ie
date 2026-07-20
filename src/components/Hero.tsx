import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-dogs.jpg";

const benefits = [
  "Insured & experienced walkers",
  "GPS-tracked walks",
  "Same-day slots available",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">
              Dublin's trusted dog walkers
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Happy dogs. <span className="text-ocean">Reliable walks.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Book a professional dog walker in seconds. We treat your pup like family —
              daily walks, group adventures, and puppy visits across Dublin.
            </p>
            <ul className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal/10">
                    <Check className="h-4 w-4 text-teal" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/booking">
                <Button size="lg" className="bg-ocean text-primary-foreground hover:bg-ocean-light">
                  Book a walk <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-ocean text-ocean hover:bg-ocean/5">
                  Explore services
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-xl">
              <img
                src={heroImage}
                alt="A happy dog being walked on a sunny trail"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-card p-4 shadow-lg sm:block">
              <p className="font-display text-3xl font-bold text-ocean">2,000+</p>
              <p className="text-sm text-muted-foreground">walks completed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
