import { GraduationCap, ShieldCheck, Users } from "lucide-react";

const credentials = [
  {
    icon: GraduationCap,
    title: "BSc Animal Science",
    description: "Degree-level knowledge of animal welfare and care.",
  },
  {
    icon: ShieldCheck,
    title: "Fully insured",
    description: "Covered for every dog in my care, walk and visit.",
  },
  {
    icon: Users,
    title: "Max 6 dogs per group",
    description: "Small packs so every dog gets attention and safety.",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-ocean/5 py-5 sm:py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 sm:px-6 lg:px-8">
        {credentials.map((item) => (
          <div
            key={item.title}
            title={item.description}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/10">
              <item.icon className="h-5 w-5 text-teal" aria-hidden="true" />
            </div>
            <p className="font-display text-sm font-semibold text-card-foreground sm:text-base">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
