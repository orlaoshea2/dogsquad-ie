import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { BookingEnquiry } from "@/components/BookingEnquiry";
import { InstagramReels } from "@/components/InstagramReels";
import { FAQ } from "@/components/FAQ";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dog Squad Wicklow | Dog Walking in Greystones, Delgany & Kilcoole" },
      { name: "description", content: "Local dog walker in Greystones, Delgany and Kilcoole, Co. Wicklow. Solo walks, group cliff-walk adventures, puppy visits and home visits." },
      { property: "og:title", content: "Dog Squad Wicklow | Dog Walking in Greystones, Delgany & Kilcoole" },
      { property: "og:description", content: "Local dog walker in Greystones, Delgany and Kilcoole, Co. Wicklow. Solo walks, group cliff-walk adventures, puppy visits and home visits." },
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
        <WicklowGallery />
        <BookingEnquiry />
        <InstagramReels />
        <FAQ />
        <Testimonials />

      </main>
      <Footer />
    </div>
  );
}
