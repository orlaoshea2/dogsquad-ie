import packImage from "@/assets/dogsquad-hero.jpg";

export function PackBanner() {
  return (
    <section className="bg-sand py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <figure className="overflow-hidden rounded-3xl shadow-2xl shadow-ocean/20">
          <img
            src={packImage}
            alt="A group of dogs out on a walk in the Wicklow hills"
            className="aspect-[2040/1148] h-auto w-full object-cover"
            width={2040}
            height={1148}
            loading="lazy"
          />
          <figcaption className="bg-ocean px-4 py-3 text-center text-sm font-semibold text-primary-foreground sm:text-base">
            Out with the pack
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
