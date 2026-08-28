import { Clock, MapPin, ShieldCheck, HeartHandshake } from "lucide-react";
import { Reveal } from "./Reveal";

const GUARANTEES = [
  {
    icon: Clock,
    title: "Quick response time",
    text: "We reply fast on WhatsApp and email, usually within a few hours, so you can move forward with confidence.",
  },
  {
    icon: MapPin,
    title: "Local sourcing",
    text: "Every recommendation comes from our own network of local hosts, drivers, guides and activity partners across Northern Morocco.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent recommendations",
    text: "No hidden fees, no paid placements. We only suggest what fits your trip, your budget and your style.",
  },
  {
    icon: HeartHandshake,
    title: "Personal assistance",
    text: "One dedicated contact handles your request from first message to final arrangement, with real human support throughout.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="section-pad bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-terracotta">Why trust darna</p>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-deep">
              Travel with confidence.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              We built darna around the things we value most when planning a trip: speed, honesty, local knowledge and genuine care.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {GUARANTEES.map((g, i) => (
              <Reveal
                key={g.title}
                delay={i * 110}
                className="border border-border bg-card p-8 shadow-soft transition-shadow duration-500 hover:shadow-lift"
              >
                <div className="flex h-11 w-11 items-center justify-center border border-terracotta/20 bg-terracotta/10">
                  <g.icon className="h-5 w-5 text-terracotta" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-sm uppercase tracking-[0.2em] text-deep">{g.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{g.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
