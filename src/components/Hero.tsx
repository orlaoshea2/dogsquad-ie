import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/dogsquad-hero.jpg";

export function Hero() {
  return (
    <section className="relative bg-ocean sm:min-h-[620px] lg:min-h-[720px]">
      {/* Background image */}
      <div className="relative sm:absolute sm:inset-0">
        <img
          src={heroImage}
          alt="Happy dogs on a group walk across the Wicklow hills"
          className="aspect-[2040/1148] h-auto w-full object-cover brightness-[1.18] saturate-[1.08] sm:aspect-auto sm:h-full sm:object-left"
          width={2040}
          height={1148}
        />
        <div className="absolute inset-0 hidden bg-gradient-to-b from-ocean/45 via-ocean/10 to-ocean/45 sm:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ocean/30 via-transparent to-ocean/20 sm:block" />
        <div className="hero-text-scrim absolute inset-0 hidden sm:block" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-7 text-center sm:min-h-[620px] sm:px-6 sm:py-24 lg:min-h-[720px] lg:px-8">
        <h1 className="font-display text-3xl font-extrabold text-primary-foreground sm:text-5xl sm:[text-shadow:0_3px_12px_rgba(0,0,0,0.45)] lg:text-6xl">
          Every Walk an Adventure
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base font-semibold text-primary-foreground sm:mt-6 sm:text-xl sm:[text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
          Trusted dog walking and house visits in Greystones & Co. Wicklow.
          Local, experienced, and completely dog-focused.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8 sm:gap-4">
          <Button
            asChild
            size="lg"
            className="bg-teal text-primary-foreground hover:bg-teal/80"
          >
            <a href="#book" onClick={(e) => {
              e.preventDefault();
              document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Book a walk <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/60 bg-primary-foreground/15 text-primary-foreground shadow-lg shadow-black/20 backdrop-blur-sm hover:bg-primary-foreground/25"
            >
              Explore services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
