import { GraduationCap, Award, HeartPulse, ShieldCheck, Users } from "lucide-react";

const credentials = [
  {
    icon: GraduationCap,
    title: "BSc Animal Science",
    description: "Degree-level knowledge of animal welfare and care.",
  },
  {
    icon: Award,
    title: "IMDT accredited",
    description: "Professional, reward-based dog training course completed.",
  },
  {
    icon: HeartPulse,
    title: "Dog First Aid",
    description: "Certified to handle emergencies on every walk.",
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
    <section className="bg-ocean/5 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center font-display text-sm font-semibold uppercase tracking-wider text-teal">
          Why dog owners trust Dog Squad
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {credentials.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center rounded-2xl bg-card p-4 text-center shadow-sm border border-border/60"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10">
                <item.icon className="h-6 w-6 text-teal" aria-hidden="true" />
              </div>
              <p className="mt-3 font-display text-sm font-semibold text-card-foreground sm:text-base">
                {item.title}
              </p>
              <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
