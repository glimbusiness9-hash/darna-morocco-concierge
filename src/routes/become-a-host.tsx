import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { HostForm } from "@/components/site/HostForm";

const title = "Become a Host — List your property on darna";
const description =
  "Showcase your home to travelers looking for stays in Morocco. Share your property details with darna and reach guests in Tangier, Tetouan and Chefchaouen.";

export const Route = createFileRoute("/become-a-host")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BecomeAHost,
});

const POINTS = [
  {
    title: "Personal review",
    text: "Every property is reviewed by our local team before it is shared with travelers.",
  },
  {
    title: "Guests who fit",
    text: "We match your home with travelers looking for exactly what you offer.",
  },
  {
    title: "No listing fees today",
    text: "Send us your details — we handle the presentation and the guest conversations.",
  },
];

function BecomeAHost() {
  return (
    <>
      <Navbar />
      <main>
        <section className="section-pad bg-cream pt-32 sm:pt-40">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <Reveal>
              <p className="eyebrow text-terracotta">Become a Host</p>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-deep">
                List your property on darna
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                Showcase your home to travelers looking for stays in Morocco.
              </p>
              <Button asChild variant="hero" size="xl" className="mt-9">
                <a href="#start-listing">Start Listing</a>
              </Button>
            </Reveal>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-7 px-5 sm:px-8 md:grid-cols-3">
            {POINTS.map((p, i) => (
              <Reveal
                as="article"
                key={p.title}
                delay={i * 120}
                className="border border-border bg-card p-8 shadow-soft"
              >
                <h2 className="font-display text-2xl text-deep">{p.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="start-listing" className="section-pad bg-background">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <Reveal className="text-center">
              <p className="eyebrow text-terracotta">Property details</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] text-deep">
                Tell us about your property
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Fill in what you know — you can always send us more later.
              </p>
            </Reveal>

            <div className="mt-12">
              <HostForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
