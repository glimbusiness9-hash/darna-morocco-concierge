import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, MESSAGES } from "@/lib/darna";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/darna-logo.png.asset.json";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Activities", href: "#activities" },
  { label: "Transportation", href: "#transportation" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Custom Made", href: "#custom-made" },
  { label: "How It Works", href: "#how-it-works" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "bg-cream/95 shadow-soft backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#home"
          className={cn(
            "font-display text-3xl leading-none tracking-tight transition-colors",
            solid ? "text-deep" : "text-onmedia",
          )}
        >
          darna
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "text-[0.72rem] uppercase tracking-[0.18em] transition-colors",
                  solid ? "text-deep/75 hover:text-primary" : "text-onmedia/85 hover:text-onmedia",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="lg"
            variant={solid ? "whatsapp" : "onmedia"}
            className="hidden sm:inline-flex"
          >
            <a href={waLink(MESSAGES.general)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              WhatsApp Us
            </a>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-sm transition-colors lg:hidden",
              solid ? "text-deep" : "text-onmedia",
            )}
          >
            {open ? <Menu className="hidden" /> : null}
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-cream transition-[max-height] duration-500 lg:hidden",
          open ? "max-h-[32rem]" : "max-h-0 border-t-0",
        )}
      >
        <ul className="flex flex-col px-6 py-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border/60 py-4 font-display text-2xl text-deep"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-6 pb-2">
            <Button asChild variant="whatsapp" size="xl" className="w-full">
              <a href={waLink(MESSAGES.general)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp Us
              </a>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
