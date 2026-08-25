import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, MESSAGES } from "@/lib/darna";
import heroImg from "@/assets/hero-chefchaouen.jpg";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Blue medina street in Chefchaouen, Morocco at golden hour"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="media-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-deep/25" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-24 sm:px-8">
        <p className="eyebrow rise text-onmedia/80">Tangier · Tetouan · Chefchaouen</p>
        <h1 className="rise mt-6 max-w-4xl font-display text-[clamp(2.75rem,8vw,5.75rem)] leading-[1.02] text-onmedia [animation-delay:120ms]">
          Tell us what you need.
          <br />
          <span className="italic">We'll find it for you.</span>
        </h1>
        <p className="rise mt-7 max-w-xl text-base leading-relaxed text-onmedia/85 sm:text-lg [animation-delay:260ms]">
          Your personal concierge for stays, activities and transportation across Northern Morocco.
        </p>
        <div className="rise mt-10 flex flex-col gap-3 sm:flex-row [animation-delay:380ms]">
          <Button asChild variant="hero" size="xl">
            <a href="#services">Explore our services</a>
          </Button>
          <Button asChild variant="whatsapp" size="xl">
            <a href={waLink(MESSAGES.general)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-5 w-5" />
              Chat with darna
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
