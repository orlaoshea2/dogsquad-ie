import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { BookingEnquiry } from "@/components/BookingEnquiry";
import { InstagramReels } from "@/components/InstagramReels";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dog Squad | Professional Dog Walking in Dublin" },
      { name: "description", content: "Book a reliable dog walker online. Solo walks, group adventures, puppy visits and pet sitting across Dublin." },
      { property: "og:title", content: "Dog Squad | Professional Dog Walking in Dublin" },
      { property: "og:description", content: "Book a reliable dog walker online. Solo walks, group adventures, puppy visits and pet sitting across Dublin." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <BookingEnquiry />
        <InstagramReels />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
