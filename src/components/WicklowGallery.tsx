import beachImage from "@/assets/dogs-greystones-beach.jpg";
import coastalImage from "@/assets/dogs-greystones-coastal.jpg";
import cliffImage from "@/assets/dogs-cliff-walk.jpg";
import delganyImage from "@/assets/dogs-delgany-park.jpg";
import fieldsImage from "@/assets/dogs-kilcoole-fields.jpg";
import laneImage from "@/assets/dogs-kilcoole-lane.jpg";

const photos = [
  {
    src: beachImage,
    alt: "Group of happy dogs playing on Greystones beach, Wicklow",
    caption: "Greystones beach adventures",
  },
  {
    src: coastalImage,
    alt: "Happy pack of dogs on a group walk along the Greystones coastline",
    caption: "Coastal group walks",
  },
  {
    src: cliffImage,
    alt: "Pack of dogs on the coastal cliff walk between Greystones and Bray",
    caption: "Cliff walks with sea views",
  },
  {
    src: delganyImage,
    alt: "Joyful dogs playing together in a park in Delgany, Wicklow",
    caption: "Delgany park playtime",
  },
  {
    src: fieldsImage,
    alt: "Dogs resting on a grassy trail in Kilcoole, County Wicklow",
    caption: "Kilcoole countryside trails",
  },
  {
    src: laneImage,
    alt: "Three happy dogs sitting on a country lane near Kilcoole, Wicklow",
    caption: "Kilcoole country lanes",
  },
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
            Real walks, real dogs, real Wicklow scenery — from Greystones beach to the Kilcoole coast.
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
                  loading="lazy"
                  width={1280}
                  height={853}
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
