import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah K.",
    dog: "Buddy, Golden Retriever",
    text: "Dog Squad has been amazing. Buddy comes home tired and happy every single day. I love the GPS updates.",
  },
  {
    name: "Mark & Amy",
    dog: "Luna, French Bulldog",
    text: "Reliable, friendly, and easy to book. The online calendar saves me so much back-and-forth.",
  },
  {
    name: "Derek N.",
    dog: "Charlie, rescue mix",
    text: "Our walker is patient with Charlie's nervousness. He actually wags his tail when she arrives now.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-sky/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">Happy hounds</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What owners say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
      </div>
    </section>
  );
}
