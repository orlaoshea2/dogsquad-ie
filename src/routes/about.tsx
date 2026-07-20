import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, Award, Users, ArrowRight } from "lucide-react";
import aboutImage from "@/assets/ds-2.jpg";
import coastImage from "@/assets/greystones-today.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Dog Squad Wicklow" },
      { name: "description", content: "Qualified Wicklow dog walker with a BSc in Animal Science, IMDT accreditation and Dog First Aid training. Serving Greystones, Delgany and Kilcoole." },
      { property: "og:title", content: "About | Dog Squad Wicklow" },
      { property: "og:description", content: "Qualified Wicklow dog walker with a BSc in Animal Science, IMDT accreditation and Dog First Aid training. Serving Greystones, Delgany and Kilcoole." },
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
                  A lifetime with animals, dedicated to your dog
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  I'm a Wicklow-based dog walker with a BSc in Animal Science and a lifelong passion for animals and dog care. I gained valuable hands-on experience working on Sheikh Mohammed bin Rashid Al Maktoum's thoroughbred stud, where I developed a deep understanding of animal welfare, care, and handling.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                  I hold a Dog First Aid certificate and have completed the IMDT Professional Accredited Training Course, specialising in modern, positive, reward-based dog training methods. With a lifetime of experience owning and caring for dogs, I bring together knowledge, practical skill, and genuine love for animals to provide trusted, personalised care and training for every dog I work with.
                </p>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-xl">
                <img
                  src={aboutImage}
                  alt="Happy Dog Squad pack on a Wicklow walk"
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
                  Group walks are capped at four dogs so every pup gets attention and supervision.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-xl order-2 lg:order-1">
                <img
                  src={coastImage}
                  alt="Greystones harbour on a sunny day"
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
              See why Wicklow dog owners in Greystones, Delgany and Kilcoole trust Dog Squad with their best friends.
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
