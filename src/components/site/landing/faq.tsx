import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/landing/reveal";

const faqs = [
  {
    q: "Is Synapse UI really free?",
    a: "Yes. Everything is MIT licensed and free for personal and commercial projects.",
  },
  {
    q: "How is this different from installing a component package?",
    a: "Components are copied into your repository, so you own the code. You can change anything, and upgrades never break your app unexpectedly.",
  },
  {
    q: "Is it compatible with shadcn/ui?",
    a: "Yes. The core components share shadcn's APIs and the registry uses the shadcn format, so you can mix both and even install Synapse components with the shadcn CLI.",
  },
  {
    q: "Which frameworks are supported?",
    a: "Any React 19 project with Tailwind CSS v4: Next.js, Vite, Remix, Astro, TanStack Start and more. Animated components use Motion.",
  },
  {
    q: "Do the animations hurt accessibility or performance?",
    a: "Animations are GPU-friendly, avoid layout thrash, and switch off when users prefer reduced motion. Interactive components are built on Radix for full keyboard and screen-reader support.",
  },
  {
    q: "Can I use my own brand colors?",
    a: "Yes. Every color is a CSS variable. Change --primary and the rest of the tokens in one file and the whole library follows.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions, answered"
          description="Still curious? Open a discussion on GitHub."
        />
        <Accordion type="single" collapsible defaultValue="0" className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={String(i)}>
              <AccordionTrigger className="py-5 text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[15px] leading-7 text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
