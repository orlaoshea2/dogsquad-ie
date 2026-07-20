import { Instagram, Play, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const INSTAGRAM_HANDLE = "dogsquad_wicklow";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

const reels = [
  { id: 1, caption: "Morning pack walk around Greystones", likes: "1.2k", gradient: "from-ocean via-teal to-teal-light" },
  { id: 2, caption: "Puppy's first big adventure in Wicklow", likes: "984", gradient: "from-teal via-teal-light to-ocean" },
  { id: 3, caption: "Beach day with the squad at Kilcoole", likes: "2.1k", gradient: "from-teal-light via-ocean to-teal" },
  { id: 4, caption: "Rainy day zoomies in Delgany", likes: "756", gradient: "from-ocean-light via-teal to-ocean" },
  { id: 5, caption: "Meet the goodest boys of Wicklow", likes: "1.8k", gradient: "from-teal via-ocean to-teal-light" },
  { id: 6, caption: "Happy tails, happy owners", likes: "1.4k", gradient: "from-ocean via-teal-light to-teal" },
];

export function InstagramReels() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">Follow the fun</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Wagging tails on Instagram
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Daily reels from our walks, cliff-walk adventures and playdates across Wicklow.
            </p>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-6 sm:mt-0">
            <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-primary-foreground">
              <Instagram className="mr-2 h-4 w-4" /> @{INSTAGRAM_HANDLE}
            </Button>
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {reels.map((reel) => (
            <a
              key={reel.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-[9/16] overflow-hidden rounded-xl shadow-md ring-1 ring-border/40 transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${reel.gradient}`} />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                  <Play className="h-5 w-5 fill-white text-white" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 text-primary-foreground">
                <p className="line-clamp-2 text-xs font-medium drop-shadow-sm">{reel.caption}</p>
                <div className="mt-1 flex items-center gap-1 text-xs opacity-90">
                  <Heart className="h-3 w-3 fill-current" />
                  <span>{reel.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
