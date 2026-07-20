import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingCalendar } from "@/components/BookingCalendar";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Dog Walk | Dog Squad" },
      { name: "description", content: "Choose a date and time and book your dog's walk with Dog Squad in minutes." },
      { property: "og:title", content: "Book a Dog Walk | Dog Squad" },
      { property: "og:description", content: "Choose a date and time and book your dog's walk with Dog Squad in minutes." },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <BookingCalendar />
      </main>
      <Footer />
    </div>
  );
}
