import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, Award, Users, ArrowRight } from "lucide-react";
import aboutImage from "@/assets/about-walker.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Dog Squad" },
      { name: "description", content: "Meet the Dog Squad team — passionate, experienced dog walkers serving Dublin with reliable, loving care." },
      { property: "og:title", content: "About Us | Dog Squad" },
      { property: "og:description", content: "Meet the Dog Squad team — passionate, experienced dog walkers serving Dublin with reliable, loving care." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">About us</p>
                <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  Dogs aren't just clients — they're family
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  Dog Squad started with a simple mission: give Dublin dogs the exercise, love, and adventure they deserve while giving owners total peace of mind.
                </p>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-xl">
                <img
                  src={aboutImage}
                  alt="A professional dog walker with happy dogs in a park"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <Heart className="h-8 w-8 text-teal" />
                <h3 className="mt-4 font-display text-xl font-semibold">Loving care</h3>
                <p className="mt-2 text-muted-foreground">
                  We get to know every dog's personality, fears, and favourite games before the first walk.
                </p>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <Award className="h-8 w-8 text-teal" />
                <h3 className="mt-4 font-display text-xl font-semibold">Experienced team</h3>
                <p className="mt-2 text-muted-foreground">
                  Every walker is trained in canine first aid, behaviour, and safe handling.
                </p>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <Users className="h-8 w-8 text-teal" />
                <h3 className="mt-4 font-display text-xl font-semibold">Small groups</h3>
                <p className="mt-2 text-muted-foreground">
                  Group walks are capped at four dogs so every pup gets attention and supervision.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-ocean py-16 text-center text-primary-foreground">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold">Join the pack</h2>
            <p className="mt-4 text-primary-foreground/80">
              See why hundreds of Dublin dog owners trust Dog Squad with their best friends.
            </p>
            <Link to="/booking" className="mt-6 inline-block">
              <Button size="lg" className="bg-primary-foreground text-ocean hover:bg-primary-foreground/90">
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
