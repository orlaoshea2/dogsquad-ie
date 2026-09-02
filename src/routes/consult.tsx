import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FreeConsult } from "@/components/FreeConsult";

export const Route = createFileRoute("/consult")({
  head: () => ({
    meta: [
      { title: "Book a Free Consult | Dog Squad Wicklow" },
      { name: "description", content: "Message Dog Squad to organise a free consult for dog walks and home visits in Greystones, Delgany and Kilcoole, Co. Wicklow." },
      { property: "og:title", content: "Book a Free Consult | Dog Squad Wicklow" },
      { property: "og:description", content: "Message Dog Squad to organise a free consult for dog walks and home visits in Greystones, Delgany and Kilcoole, Co. Wicklow." },
    ],
  }),
  component: ConsultPage,
});

function ConsultPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FreeConsult />
      </main>
      <Footer />
    </div>
  );
}
