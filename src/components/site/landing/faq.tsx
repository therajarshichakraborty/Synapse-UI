import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GitHubIcon } from "@/components/site/icons";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/site/landing/reveal";

const faqs = [
  {
    q: "Is Synapse UI really free?",
    a: "Yes. Everything is MIT licensed and free for personal and commercial projects. There are no paywalled components.",
  },
  {
    q: "How is this different from a component package?",
    a: "Components are copied into your repository, so you own the code. You can change anything, and an upgrade can never break your app unexpectedly.",
  },
  {
    q: "Is it compatible with shadcn/ui?",
    a: "Yes. Core components share shadcn's APIs and the registry uses the shadcn format, so you can mix both and even install Synapse components with the shadcn CLI.",
  },
  {
    q: "Which frameworks are supported?",
    a: "Any React 19 project with Tailwind CSS v4: Next.js, Vite, Remix, Astro, TanStack Start and more.",
  },
  {
    q: "Do the animations hurt accessibility or performance?",
    a: "Animations are GPU-friendly, avoid layout thrash, and switch off when users prefer reduced motion. Interactive components are built on Radix for full keyboard and screen-reader support.",
  },
  {
    q: "Can I use my own brand colors?",
    a: "Yes. Every color is a CSS variable. Change the tokens in one file and the whole library follows, in light and dark.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-24 md:py-32">
      <div className="container-page grid grid-cols-1 max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Questions, answered."
            description="Everything you need to know before you add your first component."
          />
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a
              href={`${siteConfig.links.github}/discussions`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
            >
              <GitHubIcon className="size-4" /> Ask on GitHub
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Read the docs <ArrowUpRightIcon className="size-3.5" />
            </Link>
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="0"
          className="w-full border-t border-border"
        >
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={String(i)} className="border-b border-border">
              <AccordionTrigger className="py-6 text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-[60ch] pb-6 text-[15px] leading-7 text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
