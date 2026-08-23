import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Tell us",
    text: "Tell us where you're going, your dates and what you need.",
  },
  { n: "02", title: "We find it", text: "We personally search for suitable options." },
  {
    n: "03",
    title: "You enjoy",
    text: "Choose what works for you and let us help arrange the rest.",
  },
];

export function Intro() {
  return (
    <section className="section-pad bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-terracotta">Morocco, made personal</p>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-deep">
              Morocco, made personal.
            </h2>
          </Reveal>
          <Reveal delay={120} className="self-end">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Finding the right place to stay, the right activity or the right transportation
              shouldn't take hours of searching. Tell darna what you're looking for and we'll help
              you find it.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:mt-24 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 130} className="bg-card p-9 sm:p-12">
              <span className="font-display text-5xl text-sand">{s.n}</span>
              <h3 className="mt-6 text-sm uppercase tracking-[0.24em] text-deep">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
