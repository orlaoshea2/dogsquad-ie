import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, PawPrint, Plus, Trash2, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/welcome")({
  head: () => ({
    meta: [
      { title: "Your dogs | Dog Squad Wicklow" },
      {
        name: "description",
        content:
          "Add your dogs' names and breeds and request a free consult with Dog Squad Wicklow.",
      },
      { property: "og:title", content: "Your dogs | Dog Squad Wicklow" },
      {
        property: "og:description",
        content: "Add your dogs and book a free consult in Greystones, Delgany and Kilcoole.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WelcomePage,
});

type DogRow = { name: string; breed: string; notes: string };

const emptyDog = (): DogRow => ({ name: "", breed: "", notes: "" });

function WelcomePage() {
  const navigate = useNavigate();
  const [dogs, setDogs] = useState<DogRow[]>([emptyDog()]);
  const [wantsConsult, setWantsConsult] = useState(true);
  const [consultNote, setConsultNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ name: string; email: string; phone: string }>({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) return;
      const { data: p } = await supabase
        .from("profiles")
        .select("full_name, email, phone")
        .eq("id", user.id)
        .maybeSingle();
      setProfile({
        name: p?.full_name ?? (user.user_metadata as any)?.full_name ?? "",
        email: p?.email ?? user.email ?? "",
        phone: p?.phone ?? (user.user_metadata as any)?.phone ?? "",
      });
    });
  }, []);

  const updateDog = (index: number, patch: Partial<DogRow>) =>
    setDogs((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const filled = dogs.filter((d) => d.name.trim().length > 0);
    if (filled.length === 0) {
      setError("Please add at least one dog's name.");
      return;
    }
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) throw new Error("Not signed in");

      const { error: dogError } = await supabase.from("dogs").insert(
        filled.map((d) => ({
          user_id: user.id,
          name: d.name.trim().slice(0, 60),
          breed: d.breed.trim().slice(0, 80) || null,
          notes: d.notes.trim().slice(0, 500) || null,
        })),
      );
      if (dogError) throw dogError;

      if (wantsConsult) {
        const summary = filled
          .map((d) => `${d.name.trim()}${d.breed.trim() ? ` (${d.breed.trim()})` : ""}`)
          .join(", ");
        const { error: consultError } = await supabase.from("consult_messages").insert({
          user_id: user.id,
          name: profile.name || user.email || "New client",
          email: profile.email || user.email || "",
          phone: profile.phone || null,
          message:
            `Free consult request from a new account.\nDogs: ${summary}` +
            (consultNote.trim() ? `\nNotes: ${consultNote.trim().slice(0, 500)}` : ""),
        });
        if (consultError) throw consultError;
      }

      setSaved(true);
    } catch (err) {
      console.error("Welcome setup failed:", err);
      setError("Couldn't save that. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
        <Card className="border-border/60">
          {saved ? (
            <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
              <CheckCircle2 className="h-14 w-14 text-teal" />
              <h1 className="font-display text-2xl font-bold text-foreground">
                All set{profile.name ? `, ${profile.name.split(" ")[0]}` : ""}!
              </h1>
              <p className="max-w-md text-muted-foreground">
                Your dogs are saved to your account.
                {wantsConsult
                  ? " Orla will be in touch shortly to arrange your free consult."
                  : ""}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  className="bg-ocean text-primary-foreground hover:bg-ocean-light"
                  onClick={() => navigate({ to: "/booking" })}
                >
                  Book a walk
                </Button>
                <Button variant="outline" onClick={() => navigate({ to: "/" })}>
                  Back to home
                </Button>
              </div>
            </CardContent>
          ) : (
            <>
              <CardHeader className="space-y-2">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <PawPrint className="h-4 w-4" />
                  Welcome to Dog Squad
                </span>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Tell us about your dogs
                </h1>
                <p className="text-sm text-muted-foreground">
                  Add their names and breeds so booking is quick next time — and request your
                  free, no-obligation consult.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {dogs.map((dog, i) => (
                      <div key={i} className="rounded-lg border border-border/60 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-foreground">Dog {i + 1}</p>
                          {dogs.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setDogs((prev) => prev.filter((_, x) => x !== i))}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove dog {i + 1}</span>
                            </Button>
                          )}
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <Label htmlFor={`dog-name-${i}`}>Dog's name</Label>
                            <Input
                              id={`dog-name-${i}`}
                              value={dog.name}
                              maxLength={60}
                              onChange={(e) => updateDog(i, { name: e.target.value })}
                              placeholder="Bailey"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`dog-breed-${i}`}>Breed</Label>
                            <Input
                              id={`dog-breed-${i}`}
                              value={dog.breed}
                              maxLength={80}
                              onChange={(e) => updateDog(i, { breed: e.target.value })}
                              placeholder="Cockapoo"
                            />
                          </div>
                        </div>
                        <div className="mt-3 space-y-1.5">
                          <Label htmlFor={`dog-notes-${i}`}>Anything we should know?</Label>
                          <Textarea
                            id={`dog-notes-${i}`}
                            value={dog.notes}
                            maxLength={500}
                            rows={2}
                            onChange={(e) => updateDog(i, { notes: e.target.value })}
                            placeholder="Recall, lead manners, allergies, nervous around bikes…"
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDogs((prev) => [...prev, emptyDog()])}
                    >
                      <Plus className="h-4 w-4" />
                      Add another dog
                    </Button>
                  </div>

                  <div className="rounded-lg border border-primary/20 bg-secondary/40 p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consult"
                        checked={wantsConsult}
                        onCheckedChange={(v) => setWantsConsult(v === true)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="consult" className="font-semibold">
                          Book a free consult
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          A free, no-obligation meet-up so we can get to know your dog before the
                          first walk.
                        </p>
                      </div>
                    </div>
                    {wantsConsult && (
                      <div className="mt-3 space-y-1.5">
                        <Label htmlFor="consult-note">Best times to reach you (optional)</Label>
                        <Textarea
                          id="consult-note"
                          value={consultNote}
                          maxLength={500}
                          rows={2}
                          onChange={(e) => setConsultNote(e.target.value)}
                          placeholder="Weekday mornings suit best — Delgany"
                        />
                      </div>
                    )}
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="bg-ocean text-primary-foreground hover:bg-ocean-light"
                    >
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save my dogs"}
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => navigate({ to: "/booking" })}>
                      Skip for now
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
}
