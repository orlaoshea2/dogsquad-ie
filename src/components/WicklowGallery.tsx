import r1 from "@/assets/real-1.png.asset.json";
import r2 from "@/assets/real-2.png.asset.json";
import r3 from "@/assets/real-3.png.asset.json";
import r4 from "@/assets/real-4.png.asset.json";
import r5 from "@/assets/real-5.png.asset.json";
import r7 from "@/assets/real-7.png.asset.json";

const photos = [
  { src: r1.url, alt: "Two golden retrievers playing in the surf on a Wicklow beach", caption: "Beach mornings" },
  { src: r2.url, alt: "Two dogs exploring a green Wicklow hillside", caption: "Up the hills" },
  { src: r3.url, alt: "Golden retriever standing on the shore with the Wicklow coastline behind", caption: "Coast and countryside" },
  { src: r4.url, alt: "Muddy, grinning spaniel after a walk", caption: "Happily filthy" },
  { src: r5.url, alt: "Two dogs splashing into the sea", caption: "Straight into the sea" },
  { src: r7.url, alt: "Dog sniffing along the shingle at Kilcoole strand", caption: "Kilcoole strand" },
];

export function WicklowGallery() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">
            The pack in action
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dogs loving Wicklow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Real walks, real dogs — from the Greystones cliff walk to the Kilcoole strand.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <figure
              key={photo.caption}
              className="group overflow-hidden rounded-2xl bg-muted shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="bg-card p-4 text-center font-display text-sm font-semibold text-card-foreground">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
