import { Button } from "@/components/ui/button";
import { Home, Waves, Car, Compass, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, MESSAGES } from "@/lib/darna";
import bg from "@/assets/chefchaouen-city.jpg";

const EXAMPLES = [
  "I want a weekend in Chefchaouen.",
  "I need a villa in Mdiq for my family.",
  "I want diving and a boat trip.",
  "I need airport pickup and accommodation.",
  "I want to visit Tangier, Tetouan and Chefchaouen.",
];

const PILLARS = [
  { icon: Home, label: "Accommodation" },
  { icon: Waves, label: "Activities" },
  { icon: Car, label: "Transportation" },
  { icon: Compass, label: "Excursions" },
  { icon: MessageCircle, label: "Personal assistance" },
];

export function CustomMade() {
  return (
    <>
      <section id="custom-made" className="relative overflow-hidden">
        <img
          src={bg}
          alt="Blue alley in Chefchaouen with potted plants"
          loading="lazy"
          width={1200}
          height={1500}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-deep/80" />
        <div className="section-pad relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <p className="eyebrow text-sand">Custom Made</p>
              <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.03] text-onmedia">
                Your trip. Your way.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-onmedia/80">
                Not sure where to start? Tell us what kind of trip you want and we'll help organize
                it.
              </p>
              <Button asChild variant="whatsapp" size="xl" className="mt-10">
                <a href={waLink(MESSAGES.custom)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  Create my trip
                </a>
              </Button>
            </Reveal>

            <Reveal delay={140}>
              <ul className="space-y-4">
                {EXAMPLES.map((e) => (
                  <li
                    key={e}
                    className="border-l-2 border-sand bg-onmedia/5 px-6 py-5 font-display text-2xl italic text-onmedia/90 backdrop-blur-sm"
                  >
                    “{e}”
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow text-terracotta">Concierge</p>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-deep">
              One message can organize your whole trip.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              You don't need ten different websites. Tell darna what you need and we'll help you
              find accommodation, activities and transportation in one place.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12 flex flex-wrap justify-center gap-3">
            {PILLARS.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 border border-border bg-card px-5 py-3 text-xs uppercase tracking-[0.16em] text-deep/80"
              >
                <p.icon className="h-4 w-4 text-terracotta" strokeWidth={1.4} />
                {p.label}
              </span>
            ))}
          </Reveal>

          <Reveal delay={200} className="mt-12">
            <Button asChild variant="whatsapp" size="xl">
              <a href={waLink(MESSAGES.general)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Chat with darna on WhatsApp
              </a>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
