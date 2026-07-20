import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, PawPrint, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/booking", label: "Booking" },
];


export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <PawPrint className="h-7 w-7 text-teal" />
          <span>Dog Squad</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-ocean font-semibold" }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+353866063416"
            className="flex items-center gap-1.5 text-sm font-semibold text-ocean hover:text-ocean-light"
          >
            <Phone className="h-4 w-4" />
            086 606 3416
          </a>
          <Button
            onClick={() => router.navigate({ to: "/booking" })}
            className="bg-ocean text-primary-foreground hover:bg-ocean-light"
          >
            Book a walk
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/40 bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                setMobileOpen(false);
                router.navigate({ to: "/booking" });
              }}
              className="mt-2 bg-ocean text-primary-foreground hover:bg-ocean-light"
            >
              Book a walk
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
