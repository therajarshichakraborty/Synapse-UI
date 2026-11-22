import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  { q: "Is it free?", a: "Yes. Every component is free and open source under the MIT license." },
  {
    q: "Do I need to install a package?",
    a: "No. Components are copied into your project, so you own and can edit the code.",
  },
  {
    q: "Does it work with my framework?",
    a: "Anything that runs React 19 and Tailwind CSS v4: Next.js, Vite, Remix, Astro and more.",
  },
  {
    q: "Is it accessible?",
    a: "Interactive components are built on Radix UI primitives with full keyboard and screen-reader support.",
  },
  {
    q: "Can I customize the theme?",
    a: "Every color, radius and effect is a CSS variable. Change one file to rebrand everything.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-h2 font-semibold">Frequently asked questions</h2>
          <p className="mt-4 text-muted-foreground">
            Can not find what you are looking for? Reach out to our team.
          </p>
          <Button variant="outline" className="mt-6">
            Contact support
          </Button>
        </div>
        <Accordion type="single" collapsible defaultValue="0" className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={String(i)}>
              <AccordionTrigger className="text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
