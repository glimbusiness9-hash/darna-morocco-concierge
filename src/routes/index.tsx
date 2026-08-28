import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Intro } from "@/components/site/Intro";
import { Services } from "@/components/site/Services";
import { Activities } from "@/components/site/Activities";
import { Transportation } from "@/components/site/Transportation";
import { Accommodation } from "@/components/site/Accommodation";
import { CustomMade } from "@/components/site/CustomMade";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Trust } from "@/components/site/Trust";
import { InquiryForm } from "@/components/site/InquiryForm";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

const title = "darna — Your Personal Concierge for Morocco";
const description =
  "Discover accommodation, activities, transportation and custom-made experiences in Tangier, Tetouan, Chefchaouen and Northern Morocco with darna.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Activities />
        <Transportation />
        <Accommodation />
        <CustomMade />
        <HowItWorks />
        <Trust />
        <InquiryForm />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
