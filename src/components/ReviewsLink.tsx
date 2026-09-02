import { Star } from "lucide-react";

export function ReviewsLink() {
  return (
    <section className="border-y border-border/60 bg-card py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 text-center sm:flex-row sm:gap-3 sm:px-6 lg:px-8">
        <span className="flex gap-1" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-teal text-teal" />
          ))}
        </span>
        <p className="text-foreground">
          Loved by dog owners in Greystones, Delgany &amp; Kilcoole —{" "}
          <a
            href="#reviews"
            className="font-display font-semibold text-teal underline underline-offset-4 hover:opacity-80"
          >
            click here for customer reviews
          </a>
        </p>
      </div>
    </section>
  );
}
