import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, LogIn, LogOut, User as UserIcon, ShieldCheck, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logoAsset from "@/assets/dogsquad-logo.png";


const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
  { to: "/booking", label: "Booking" },
];


export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { user, isAdmin, signOut } = useAuth();
  const handleSignOut = async () => {
    await signOut();
    router.navigate({ to: "/" });
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <img
            src={logoAsset}
            alt="Dog Squad"
            className="h-10 w-auto object-contain"
          />
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
            href="https://www.instagram.com/dogsquad_wicklow/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-ocean hover:text-ocean-light"
          >
            <Instagram className="h-5 w-5" />
          </a>
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-ocean hover:text-ocean-light"
                >
                  <ShieldCheck className="h-4 w-4" /> Admin
                </Link>
              )}
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <UserIcon className="h-4 w-4" />
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" /> Log out
              </Button>
            </>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <LogIn className="h-4 w-4" /> Sign in
            </Link>
          )}
          <Button
            onClick={() => router.navigate({ to: "/booking" })}
            className="bg-ocean text-primary-foreground hover:bg-ocean-light"
          >
            Book a walk
          </Button>
        </div>


        <div className="flex items-center gap-3 md:hidden">
          <a
            href="https://www.instagram.com/dogsquad_wicklow/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-ocean hover:text-ocean-light"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
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
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-1 text-base font-semibold text-ocean"
                  >
                    <ShieldCheck className="h-4 w-4" /> Admin
                  </Link>
                )}
                <Button
                  variant="outline"
                  onClick={() => { setMobileOpen(false); handleSignOut(); }}
                  className="mt-1"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign out ({user.email})
                </Button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-1 text-base font-medium text-muted-foreground hover:text-foreground"
              >
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
            )}
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
