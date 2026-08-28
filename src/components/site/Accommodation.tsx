import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, MESSAGES } from "@/lib/darna";
import tangierAsset from "@/assets/tangier-real.jpg.asset.json";
import tetouanAsset from "@/assets/tetouan-real.webp.asset.json";
import chefchaouenAsset from "@/assets/chefchaouen-real.jpg.asset.json";

const DESTINATIONS = [
  { name: "Tangier", line: "Stay by the Mediterranean.", img: tangierAsset.url },
  { name: "Tetouan", line: "Discover the White Dove.", img: tetouanAsset.url },
  { name: "Chefchaouen", line: "Stay in the Blue City.", img: chefchaouenAsset.url },
];

const MORE = ["Martil", "Mdiq", "Cabo Negro", "Marina Smir"];

export function Accommodation() {
  return (
    <section id="accommodation" className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-terracotta">Accommodation</p>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-deep">
            Looking for somewhere to stay?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Tell us where, when and what you need. We'll look for suitable options.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {DESTINATIONS.map((d, i) => (
            <Reveal
              as="article"
              key={d.name}
              delay={i * 120}
              className="group relative h-[26rem] overflow-hidden shadow-soft sm:h-[32rem]"
            >
              <img
                src={d.img}
                alt={`${d.name}, Northern Morocco`}
                loading="lazy"
                width={1200}
                height={1500}
                className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              />
              <div className="media-overlay absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-display text-4xl text-onmedia">{d.name}</h3>
                <p className="mt-2 text-sm text-onmedia/80">{d.line}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-12 flex flex-wrap items-center gap-3">
          <span className="eyebrow text-muted-foreground">We also cover</span>
          {MORE.map((m) => (
            <span
              key={m}
              className="border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-deep/75"
            >
              {m}
            </span>
          ))}
        </Reveal>

        <Reveal delay={160} className="mt-10">
          <p className="max-w-xl text-sm text-muted-foreground">
            These are destination and service areas — not property listings. darna searches for
            apartments, villas, riads, houses and hotels on your behalf.
          </p>
          <Button asChild variant="hero" size="xl" className="mt-8">
            <a href="#inquiry">Tell us what you're looking for</a>
          </Button>
          <Button asChild variant="sandline" size="xl" className="mt-8 sm:ml-3">
            <a
              href={waLink(MESSAGES.accommodation())}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              WhatsApp darna
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
