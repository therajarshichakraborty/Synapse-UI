import { Hero } from "@/components/site/landing/hero";
import { Features } from "@/components/site/landing/features";
import { Showcase } from "@/components/site/landing/showcase";
import { NativeSection } from "@/components/site/landing/native-section";
import { CodeToUi } from "@/components/site/landing/code-to-ui";
import { CliSection } from "@/components/site/landing/cli-section";
import { Stats } from "@/components/site/landing/stats";
import { Testimonials } from "@/components/site/landing/testimonials";
import { Pricing } from "@/components/site/landing/pricing";
import { Faq } from "@/components/site/landing/faq";
import { FinalCta } from "@/components/site/landing/final-cta";
import { DottedRule, Frame } from "@/components/site/landing/frame";

export default function HomePage() {
  const sections = [
    <Features key="features" />,
    <Showcase key="showcase" />,
    <NativeSection key="native" />,
    <CodeToUi key="code" />,
    <CliSection key="cli" />,
    <Stats key="stats" />,
    <Testimonials key="testimonials" />,
    <Pricing key="pricing" />,
    <Faq key="faq" />,
    <FinalCta key="cta" />,
  ];

  return (
    <Frame>
      <div>
        <Hero />
      </div>
      {sections.map((section) => (
        <div key={section.key}>
          <DottedRule />
          {section}
        </div>
      ))}
    </Frame>
  );
}
