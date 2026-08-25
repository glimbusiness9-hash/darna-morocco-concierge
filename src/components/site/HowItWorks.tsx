import { Reveal } from "./Reveal";

const STEPS = [
  { n: "01", t: "Tell us your plan." },
  { n: "02", t: "Tell us your budget." },
  { n: "03", t: "We search for suitable options." },
  { n: "04", t: "You choose what works." },
  { n: "05", t: "We help arrange it." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-terracotta">How it works</p>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-deep">
            How darna works
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 110} className="relative md:pt-10">
              <span className="absolute top-4 left-0 hidden h-px w-full bg-border md:block" />
              <span className="relative z-10 hidden h-2.5 w-2.5 rounded-full bg-primary md:absolute md:top-[0.65rem] md:left-0 md:block" />
              <div className="flex items-baseline gap-4 md:block">
                <span className="font-display text-4xl text-sand md:text-5xl">{s.n}</span>
                <p className="mt-0 max-w-[16rem] text-sm leading-relaxed text-deep md:mt-4">
                  {s.t}
                </p>
              </div>
              <span className="absolute top-10 -left-4 h-full w-px bg-border md:hidden" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
