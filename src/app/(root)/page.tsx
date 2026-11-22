import { Hero } from "@/components/site/landing/hero";
import { LogoCloud } from "@/components/site/landing/logo-cloud";
import { Features } from "@/components/site/landing/features";
import { Showcase } from "@/components/site/landing/showcase";
import { CodeToUi } from "@/components/site/landing/code-to-ui";
import { CliSection } from "@/components/site/landing/cli-section";
import { Stats } from "@/components/site/landing/stats";
import { Testimonials } from "@/components/site/landing/testimonials";
import { Pricing } from "@/components/site/landing/pricing";
import { Faq } from "@/components/site/landing/faq";
import { FinalCta } from "@/components/site/landing/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Features />
      <Showcase />
      <CodeToUi />
      <CliSection />
      <Stats />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
