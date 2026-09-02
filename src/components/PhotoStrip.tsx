import r6 from "@/assets/real-6.png.asset.json";
import r8 from "@/assets/real-8.png.asset.json";
import r9 from "@/assets/real-9.png.asset.json";

const strip = [
  { src: r8.url, alt: "Two Jack Russells in matching red coats ready for a walk" },
  { src: r6.url, alt: "Dogs silhouetted on a sunlit Wicklow beach" },
  { src: r9.url, alt: "Dog wandering the shingle at the water's edge in Wicklow" },
];

export function PhotoStrip() {
  return (
    <section className="bg-muted/40 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center font-display text-sm font-semibold uppercase tracking-wider text-teal">
          A day in the life
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {strip.map((photo) => (
            <div key={photo.alt} className="overflow-hidden rounded-2xl shadow-sm">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="aspect-[3/2] h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
