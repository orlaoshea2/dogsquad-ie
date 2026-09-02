import { createFileRoute } from "@tanstack/react-router";
import { TaxiRequest } from "@/components/TaxiRequest";

export const Route = createFileRoute("/taxi")({
  head: () => ({
    meta: [
      { title: "Dog Taxi in Greystones & Delgany — Dogsquad Wicklow" },
      {
        name: "description",
        content:
          "Dog taxi around Greystones, Delgany and Kilcoole. €20 for 0-10km, €30 for 10-20km. Request a lift to the vet, groomer or daycare.",
      },
      { property: "og:title", content: "Dog Taxi in Greystones & Delgany — Dogsquad Wicklow" },
      {
        property: "og:description",
        content: "Safe dog lifts around Co. Wicklow. €20 for 0-10km, €30 for 10-20km.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TaxiPage,
});

function TaxiPage() {
  return (
    <main className="min-h-screen">
      <TaxiRequest />
    </main>
  );
}
