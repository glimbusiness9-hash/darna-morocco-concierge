import { MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { waLink, MESSAGES } from "@/lib/darna";
import coast from "@/assets/coast.jpg";
import mountains from "@/assets/mountains.jpg";
import riad from "@/assets/riad-interior.jpg";
import chefchaouen from "@/assets/chefchaouen-city.jpg";
import scubaDivingAsset from "@/assets/scuba-diving.jpg.asset.json";
import boatTripAsset from "@/assets/boat-trip.jpg.asset.json";
import jetSkiAsset from "@/assets/jet-ski.jpg.asset.json";
import surfAsset from "@/assets/surf.jpg.asset.json";
import quadBuggyAsset from "@/assets/quad-buggy.webp.asset.json";

const ACTIVITIES = [
  {
    title: "Scuba Diving",
    location: "Mdiq & Belyounech, Tetouan region",
    text: "Scuba diving with certified instructors along Morocco's northern coast.",
    img: scubaDivingAsset.url,
  },
  {
    title: "Boat Trip",
    location: "Marina Smir & Mdiq",
    text: "Sea trips along the northern coast of Morocco.",
    img: boatTripAsset.url,
  },
  {
    title: "Jet Ski",
    location: "Tetouan Region",
    text: "Explore the Mediterranean around Cabo Negro and the northern coast.",
    img: jetSkiAsset.url,
  },
  {
    title: "Surf",
    location: "Tangier",
    text: "Guided surfing sessions for different levels.",
    img: surfAsset.url,
  },
  {
    title: "Quad & Buggy",
    location: "Tangier · Tetouan · Chefchaouen · Akchour",
    text: "Off-road adventures through mountains, forests and natural landscapes.",
    img: quadBuggyAsset.url,
  },
  {
    title: "Moroccan Hammam & Spa , Professional Massage ",
    location: "Tangier & Tetouan",
    text: "Professional massage , Moroccan Hammam & Spa",
    img: riad,
  },
  {
    title: "Escape Room",
    location: "Tangier",
    text: "Themed escape experiences for friends, couples and groups.",
    img: chefchaouen,
  },
  {
    title: "Tennis & Padel",
    location: "Tangier & Tetouan",
    text: "Reserve courts at a convenient time.",
    img: riad,
  },
  {
    title: "Golf",
    location: "Northern Morocco",
    text: "Discover exceptional golf experiences in Northern Morocco.",
    img: mountains,
  },
  {
    title: "Guided Tour",
    location: "Northern Morocco",
    text: "Discover the must-see places with local guidance.",
    img: chefchaouen,
  },
  {
    title: "Hiking",
    location: "Tangier · Tetouan · Chefchaouen · Akchour",
    text: "Explore the Rif Mountains, forests, waterfalls and natural landscapes.",
    img: mountains,
  },
];

const MORE = [
  "Ziplines",
  "Tree-top ropes courses",
  "Obstacle courses",
  "Free Fall",
  "Paintball",
  "ATV",
  "Buggy",
  "Quad",
  "Horseback Riding",
  "Pony Rides",
  "Swimming",
  "Kids Activities",
  "Educational Farm",
  "Family Activities",
  "Nature Adventures",
];

export function Activities() {
  return (
    <section id="activities" className="section-pad bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-terracotta">Activities</p>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-deep">
            Explore Northern Morocco
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            From the Mediterranean Sea to the Rif Mountains.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((a, i) => (
            <Reveal
              as="article"
              key={a.title}
              delay={(i % 3) * 100}
              className="group flex flex-col bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={a.img}
                  alt={a.title}
                  loading="lazy"
                  width={1400}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-deep/15" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl text-deep">{a.title}</h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs tracking-wide text-primary">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {a.location}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                <a
                  href={waLink(MESSAGES.activity(a.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-terracotta transition-colors hover:text-deep"
                >
                  Book via WhatsApp →
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 border border-border bg-card p-9 sm:p-14">
          <p className="eyebrow text-terracotta">Adventure & Family</p>
          <h3 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] text-deep">
            More ways to enjoy Morocco
          </h3>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Around Tangier, Tetouan and Chefchaouen — tell us who's coming and we'll suggest what
            fits.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {MORE.map((m) => (
              <li
                key={m}
                className="border border-sand bg-secondary px-4 py-2 text-xs uppercase tracking-[0.14em] text-deep/80"
              >
                {m}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
