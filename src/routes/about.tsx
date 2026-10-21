import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, Award, Users, ArrowRight } from "lucide-react";
import aboutImage from "@/assets/about-walker.png";
import coastImage from "@/assets/ds-1.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About | Dog Squad Wicklow" },
      { name: "description", content: "Meet Orla O'Shea, the qualified Wicklow dog walker behind Dog Squad — BSc in Animal Science, IMDT accredited and Dog First Aid trained. Serving Greystones, Delgany and Kilcoole." },
      { property: "og:title", content: "About Orla O'Shea | Dog Squad Wicklow" },
      { property: "og:description", content: "Meet Orla O'Shea, the qualified Wicklow dog walker behind Dog Squad — BSc in Animal Science, IMDT accredited and Dog First Aid trained. Serving Greystones, Delgany and Kilcoole." },

    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">About me</p>
                <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  Hi, I'm Orla O'Shea
                </h1>
                <p className="mt-3 font-display text-xl font-semibold text-teal sm:text-2xl">
                  A lifetime with animals, dedicated to your dog
                </p>
                <p className="mt-6 text-lg text-muted-foreground">
                  I'm Orla O'Shea, a Wicklow-based dog walker with a BSc in Animal Science and a lifelong passion for animals and dog care. I gained valuable hands-on experience working on Sheikh Mohammed bin Rashid Al Maktoum's thoroughbred stud, where I developed a deep understanding of animal welfare, care, and handling.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                  I hold a Dog First Aid certificate and have completed the IMDT Professional Accredited Training Course, specialising in modern, positive, reward-based dog training methods. With a lifetime of experience owning and caring for dogs, I bring together knowledge, practical skill, and genuine love for animals to provide trusted, personalised care and training for every dog I work with.
                </p>
                <div className="mt-8 border-l-4 border-teal pl-4">
                  <p className="font-display text-2xl font-bold text-ocean">Orla O'Shea</p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-teal">
                    Founder of Dog Squad
                  </p>
                </div>

              </div>
              <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl bg-muted shadow-xl">
                <img
                  src={aboutImage}
                  alt="Dog Squad walker with two happy dogs on a grassy lawn"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <Heart className="h-8 w-8 text-teal" />
                <h3 className="mt-4 font-display text-xl font-semibold">Personal attention</h3>
                <p className="mt-2 text-muted-foreground">
                  I get to know every dog's personality, fears, and favourite games before the first walk.
                </p>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <Award className="h-8 w-8 text-teal" />
                <h3 className="mt-4 font-display text-xl font-semibold">Qualified & insured</h3>
                <p className="mt-2 text-muted-foreground">
                  BSc Animal Science, Dog First Aid certified, and IMDT Professional Accredited Training completed.
                </p>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <Users className="h-8 w-8 text-teal" />
                <h3 className="mt-4 font-display text-xl font-semibold">Small groups</h3>
                <p className="mt-2 text-muted-foreground">
                  Group walks are capped at six dogs so every pup gets attention and supervision.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl bg-muted shadow-xl order-2 lg:order-1">
                <img
                  src={coastImage}
                  alt="The Dog Squad pack out walking with the Great Sugar Loaf behind"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={1280}
                  height={960}
                />
              </div>
              <div className="order-1 lg:order-2">
                <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">Where we walk</p>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Local to Wicklow's coast
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Every walk happens right on your doorstep — no long drives, no stressed dogs. We cover:
                </p>
                <ul className="mt-4 space-y-2 text-foreground">
                  <li>• <strong>Greystones</strong> — south beach, cliff walk to Bray Head, harbour loop</li>
                  <li>• <strong>Delgany</strong> — village lanes, Glen of the Downs, quiet field trails</li>
                  <li>• <strong>Kilcoole</strong> — beach strolls, Newcastle nature reserve, coastal path</li>
                </ul>
              </div>
            </div>
          </div>
        </section>


        <section className="bg-ocean py-16 text-center text-primary-foreground">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold">Join the pack</h2>
            <p className="mt-4 text-primary-foreground/80">
              See why Wicklow dog owners in Greystones, Delgany and Kilcoole trust me with their best friends.
            </p>
            <Link to="/booking" className="mt-6 inline-block">
              <Button size="lg" className="bg-primary-foreground text-ocean hover:bg-primary-foreground/90">
                Book a walk <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
