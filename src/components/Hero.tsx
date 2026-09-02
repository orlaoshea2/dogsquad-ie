import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/dogsquad-hero.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[520px] sm:min-h-[620px] lg:min-h-[720px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Happy dogs on a group walk across the Wicklow hills"
          className="h-full w-full object-cover object-left"
          width={2040}
          height={1148}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/85 via-ocean/65 to-ocean/85" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:min-h-[620px] sm:px-6 lg:min-h-[720px] lg:px-8">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-primary-foreground [text-shadow:0_3px_12px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl">
          Every Walk an Adventure
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold text-primary-foreground [text-shadow:0_2px_8px_rgba(0,0,0,0.4)] sm:text-xl">
          Trusted dog walking and house visits in Greystones & Co. Wicklow.
          Local, experienced, and completely dog-focused — because every tail wag matters.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
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
