import { Instagram } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, MESSAGES } from "@/lib/darna";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Activities", href: "#activities" },
  { label: "Transportation", href: "#transportation" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Custom Made", href: "#custom-made" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#inquiry" },
];

export function Footer() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-4xl">darna</p>
            <p className="mt-4 max-w-xs text-sm text-deep-foreground/70">
              Your personal concierge for Morocco.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-sand">
              Tangier · Tetouan · Chefchaouen
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow text-sand">Explore</h2>
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-deep-foreground/75 transition-colors hover:text-onmedia"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-sand">Connect</h2>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={waLink(MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-deep-foreground/75 transition-colors hover:text-onmedia"
              >
                <WhatsAppIcon /> WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-deep-foreground/75 transition-colors hover:text-onmedia"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-onmedia/15 pt-8 text-xs text-deep-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 darna. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-onmedia">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-onmedia">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
