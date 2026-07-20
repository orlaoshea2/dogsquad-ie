import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

export function BookNowButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const bookSection = document.getElementById("book");
      if (!bookSection) return;
      const rect = bookSection.getBoundingClientRect();
      setVisible(rect.top > window.innerHeight || rect.bottom < 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToBook = () => {
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8">
      <Button
        onClick={scrollToBook}
        size="lg"
        className="shadow-ocean/30 gap-2 rounded-full bg-ocean px-6 text-primary-foreground shadow-lg hover:bg-ocean-light"
      >
        <CalendarPlus className="h-5 w-5" />
        <span className="hidden sm:inline">Book now</span>
        <span className="sm:hidden">Book</span>
      </Button>
    </div>
  );
}
