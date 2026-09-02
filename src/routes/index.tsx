import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { BookingCalendar } from "@/components/BookingCalendar";
import { InstagramReels } from "@/components/InstagramReels";
import { WicklowGallery } from "@/components/WicklowGallery";
import { FAQ } from "@/components/FAQ";
import { FreeConsult } from "@/components/FreeConsult";
import { ReviewsLink } from "@/components/ReviewsLink";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dog Squad Wicklow | Dog Walking in Greystones, Delgany & Kilcoole" },
      { name: "description", content: "Book a dog walk online in Greystones, Delgany and Kilcoole, Co. Wicklow. Solo walks, group cliff-walk adventures, puppy visits and home visits." },
      { property: "og:title", content: "Dog Squad Wicklow | Dog Walking in Greystones, Delgany & Kilcoole" },
      { property: "og:description", content: "Book a dog walk online in Greystones, Delgany and Kilcoole, Co. Wicklow. Solo walks, group cliff-walk adventures, puppy visits and home visits." },
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
        <ReviewsLink />
        <FreeConsult />
        <BookingCalendar />
        <Services />
        <WicklowGallery />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
