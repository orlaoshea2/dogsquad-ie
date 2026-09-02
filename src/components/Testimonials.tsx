import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Dogsquad.ie+Greystones+Co.+Wicklow+reviews";

const testimonials = [
  {
    name: "Suzanne Goodwin",
    dog: "Boxer",
    text: "Couldn't be happier with the care my energetic boxer gets - he absolutely adores Orla and gets incredibly excited every time she arrives, which says everything. She takes him on long beach and mountain walks that really suit his energy levels and he always comes home happy, tired, and well cared for. Orla is reliable, kind, and clearly has a genuine love for dogs. It gives great peace of mind knowing he's in such good hands. Highly recommended!",
  },
  {
    name: "James Burke",
    dog: "Gigi",
    text: "If there was a 6 star option, I would give it that and more. Orla is incredible. Our Gigi loves going to Orla's house and Orla takes care of her so well. Orla has a massive garden and Gigi loves going there and seeing all of her regular friends. Orla's own dog Bailey is a beauty and is so relaxed and chilled. Orla is so good to us, is so flexible and understanding of our busy schedules. I couldn't speak more highly of Orla and her services.",
  },
  {
    name: "Olivia Furlong",
    dog: "Alfie",
    text: "Highly recommend! They took such great care of Alfie—he was so happy being able to stay in his own environment. They even went the extra mile by watering our plants and putting the bins out for us. Super reliable and thoughtful service!",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-sky/50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">Happy hounds</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Customer reviews
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            What owners across Greystones, Delgany and Kilcoole say about Dog Squad.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border/60 bg-card">
              <CardContent className="pt-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-teal text-teal" />
                  ))}
                </div>
                <p className="mt-4 text-foreground">"{t.text}"</p>
                <div className="mt-6">
                  <p className="font-display font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.dog}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <Button asChild variant="outline" size="lg">
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
              Read our Google reviews
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">Opens Google in a new tab</p>
        </div>
      </div>
    </section>
  );
}
