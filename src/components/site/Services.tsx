import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, MESSAGES } from "@/lib/darna";
import riadAsset from "@/assets/riad-real.webp.asset.json";
import coast from "@/assets/coast.jpg";
import transportAsset from "@/assets/transport-real.jpg.asset.json";
import mountains from "@/assets/mountains.jpg";

const CARDS = [
  {
    img: riadAsset.url,
    alt: "Moroccan riad courtyard with carved arches and a tiled fountain",
    title: "Find your stay",
    kicker: "Accommodation",
    text: "Looking for an apartment, villa, riad, house or hotel? Tell us where you want to stay, your dates and your budget. We'll search for suitable options for you.",
    tags: [
      "Tangier",
      "Tetouan",
      "Chefchaouen",
      "Martil",
      "Mdiq",
      "Cabo Negro",
      "Marina Smir",
      "Akchour",
    ],
    cta: "Find my stay",
    message: MESSAGES.accommodation(),
  },
  {
    img: coast,
    alt: "Turquoise Mediterranean sea with boats off the northern Moroccan coast",
    title: "Activities & Experiences",
    kicker: "Activities",
    text: "Discover the Mediterranean coast, the Rif Mountains and the best things to do around Northern Morocco.",
    tags: [],
    cta: "Explore activities",
    message: MESSAGES.activity("Activités & Expériences"),
  },
  {
    img: transportAsset.url,
    alt: "Private transfer car on a coastal road in northern Morocco at dusk",
    title: "Transportation",
    kicker: "Transportation",
    text: "Airport transfers, city-to-city transportation, excursions, activity transfers and car rental.",
    tags: [],
    cta: "Arrange transport",
    message: MESSAGES.transport("un transport au Maroc"),
  },
  {
    img: tetouanCityAsset.url,
    alt: "Panoramic view of Tetouan city with the Rif Mountains behind",
    title: "Custom Made",
    kicker: "Custom Made",
    text: "Have something specific in mind? Tell us what you want and we'll help build it around your trip.",
    tags: [
      "Weekend in Chefchaouen",
      "Beach weekend in Mdiq",
      "Family trip to Tangier",
      "Adventure trip around Akchour",
      "Romantic getaway",
      "Multi-city Northern Morocco trip",
    ],
    cta: "Plan my trip",
    message: MESSAGES.custom,
  },
];

export function Services() {
  return (
    <section id="services" className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-terracotta">Services</p>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-deep">
            Explore our services
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Everything you need for a better stay in Northern Morocco.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal
              as="article"
              key={c.title}
              delay={(i % 2) * 120}
              className="group overflow-hidden bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift"
            >
              <div className="relative h-72 overflow-hidden sm:h-96">
                <img
                  src={c.img}
                  alt={c.alt}
                  loading="lazy"
                  width={1400}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="media-overlay absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="eyebrow text-onmedia/75">{c.kicker}</p>
                  <h3 className="mt-3 font-display text-4xl text-onmedia">{c.title}</h3>
                </div>
              </div>
              <div className="p-8 sm:p-10">
                <p className="text-base leading-relaxed text-muted-foreground">{c.text}</p>
                {c.tags.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <li
                        key={t}
                        className="border border-border px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-deep/70"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                <Button asChild variant="sandline" size="xl" className="mt-8">
                  <a href={waLink(c.message)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    {c.cta}
                  </a>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          darna is a personal concierge service — we search on your behalf. No listings, no
          automated availability.
        </p>
      </div>
    </section>
  );
}
