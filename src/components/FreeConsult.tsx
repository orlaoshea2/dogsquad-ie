import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle, PawPrint } from "lucide-react";

export function FreeConsult() {
  return (
    <section id="free-consult" className="bg-secondary/40 py-16">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-3xl border-primary/20 shadow-lg">
          <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <PawPrint className="h-4 w-4" />
              Free, no-obligation
            </span>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Book a free consult</h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                Not sure which service suits your dog? Let's have a free chat about your dog's
                routine, temperament and needs before you book. Greystones, Delgany and Kilcoole.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg">
                <a href="tel:+353866063416">
                  <Phone className="mr-2 h-4 w-4" />
                  Call 086 606 3416
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="mailto:hello@dogsquad.ie?subject=Free%20consult%20request&body=Hi%20Orla%2C%0A%0AI%27d%20like%20to%20book%20a%20free%20consult.%0A%0AMy%20name%3A%0AMy%20dog%27s%20name%20and%20breed%3A%0AArea%20(Greystones%2FDelgany%2FKilcoole)%3A%0ABest%20time%20to%20chat%3A%0A%0AThanks!">
                  <Mail className="mr-2 h-4 w-4" />
                  Email for a consult
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a
                  href="https://wa.me/353866063416?text=Hi%20Orla%2C%20I%27d%20like%20to%20book%20a%20free%20consult%20for%20my%20dog."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
