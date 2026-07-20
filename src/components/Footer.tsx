import { Link } from "@tanstack/react-router";
import { PawPrint, Mail, Phone, MapPin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-ocean text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
              <PawPrint className="h-7 w-7 text-teal" />
              <span>Dog Squad</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-primary-foreground/80">
              Professional, reliable dog walking in Greystones, Delgany and Kilcoole, Co. Wicklow.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold">Quick links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-primary-foreground">Services</Link></li>
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground">About</Link></li>
              <li><Link to="/booking" className="text-primary-foreground/80 hover:text-primary-foreground">Book a walk</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <a href="tel:+353866063416" className="hover:text-primary-foreground">086 606 3416</a>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <span>hello@dogsquad.ie</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Instagram className="h-4 w-4" />
                <a
                  href="https://www.instagram.com/dogsquad_wicklow/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground"
                >
                  @dogsquad_wicklow
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Greystones, Co. Wicklow</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Dog Squad. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
