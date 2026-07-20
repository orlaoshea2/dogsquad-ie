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
          className="h-full w-full object-cover"
          width={2040}
          height={1148}
          priority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/70 via-ocean/50 to-ocean/70" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:min-h-[620px] sm:px-6 lg:min-h-[720px] lg:px-8">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Every Walk an Adventure
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
          Trusted dog walking, house visits and dog taxi services in Greystones & Co. Wicklow.
          Local, experienced, and completely dog-focused — because every tail wag matters.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-teal text-primary-foreground hover:bg-teal-light"
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
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              Explore services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
