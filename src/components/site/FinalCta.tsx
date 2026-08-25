import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, MESSAGES } from "@/lib/darna";
import sunset from "@/assets/sunset.jpg";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={sunset}
        alt="Chefchaouen rooftops at sunset with the Rif Mountains behind"
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-deep/65" />
      <div className="section-pad relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-[clamp(2.4rem,6.5vw,4.75rem)] leading-[1.05] text-onmedia">
            You tell us.
            <br />
            We find it.
            <br />
            <span className="italic">You enjoy Morocco.</span>
          </h2>
          <p className="mt-7 text-onmedia/80">
            Accommodation. Activities. Transportation. Local help.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="whatsapp" size="xl">
              <a href="#services">Explore our services</a>
            </Button>
            <Button asChild variant="onmedia" size="xl">
              <a href={waLink(MESSAGES.general)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp darna
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
