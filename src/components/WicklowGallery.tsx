import ds1 from "@/assets/ds-1.jpg.asset.json";
import ds2 from "@/assets/ds-2.jpg.asset.json";
import ds4 from "@/assets/ds-4.jpg.asset.json";
import ds5 from "@/assets/ds-5.jpg.asset.json";
import ds6 from "@/assets/ds-6.jpg.asset.json";
import harbourDogs from "@/assets/greystones-harbour-dogs.jpg";
import cliffPack from "@/assets/cliff-walk-pack.jpg";

const photos = [
  { src: ds1.url, alt: "Dog Squad pack on a Wicklow adventure", caption: "Out on the trails" },
  { src: harbourDogs, alt: "Two happy golden retrievers at Greystones harbour marina", caption: "Greystones harbour" },
  { src: ds2.url, alt: "Happy dogs on a group walk in Wicklow", caption: "Group walks" },
  { src: cliffPack, alt: "Three happy dogs on the Greystones to Bray cliff walk", caption: "Cliff walk to Bray Head" },
  { src: ds4.url, alt: "Dog Squad walker with the pack", caption: "With the squad" },
  { src: ds5.url, alt: "Happy dog on a Wicklow walk", caption: "Tails wagging" },
  { src: ds6.url, alt: "Dogs exploring the Wicklow countryside", caption: "Wicklow countryside" },
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
