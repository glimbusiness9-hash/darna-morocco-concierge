import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, MESSAGES } from "@/lib/darna";
import { Plane, Route, MapPinned, Compass, CarFront } from "lucide-react";

const CARDS = [
  {
    icon: Plane,
    title: "Airport Transfer",
    text: "Private airport pickup and drop-off.",
    list: [],
  },
  {
    icon: Route,
    title: "City-to-City",
    text: "Comfortable private transfers between cities.",
    list: ["Tangier", "Tetouan", "Chefchaouen", "Mdiq", "Martil", "Other destinations"],
  },
  {
    icon: MapPinned,
    title: "Transportation to Activities",
    text: "Get to your activities without the hassle.",
    list: [],
  },
  {
    icon: Compass,
    title: "Excursions",
    text: "Transportation for day trips and sightseeing.",
    list: [],
  },
  {
    icon: CarFront,
    title: "Car Rental",
    text: "Tell us what type of vehicle you need and we'll help you find a suitable option.",
    list: [],
  },
];

export function Transportation() {
  return (
    <section id="transportation" className="section-pad bg-deep text-deep-foreground">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-sand">Transportation</p>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]">
            Getting around made easy.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal
              as="article"
              key={c.title}
              delay={(i % 3) * 100}
              className="border border-onmedia/15 bg-onmedia/5 p-8 transition-colors duration-500 hover:bg-onmedia/10"
            >
              <c.icon className="h-7 w-7 text-sand" strokeWidth={1.2} />
              <h3 className="mt-6 font-display text-3xl">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-deep-foreground/70">{c.text}</p>
              {c.list.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.list.map((l) => (
                    <li
                      key={l}
                      className="border border-onmedia/20 px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-deep-foreground/70"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12">
          <Button asChild variant="whatsapp" size="xl">
            <a
              href={waLink(MESSAGES.transport("un transport au Maroc"))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Arrange my transport
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
