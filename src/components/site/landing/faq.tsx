import Link from "next/link";
import { ArrowUpRightIcon, MessageCircleIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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
    <section id="faq" className="py-24 md:py-32">
      <div className="container-page grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Questions, answered"
            description="Everything you need to know before you add your first component."
          />
          <div className="mt-8 rounded-2xl surface-premium p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full border border-border bg-muted">
                <MessageCircleIcon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium">Still have questions?</p>
                <p className="text-xs text-muted-foreground">Open a discussion and we will help.</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="secondary" asChild>
                <a href={`${siteConfig.links.github}/discussions`} target="_blank" rel="noreferrer">
                  <GitHubIcon className="size-3.5" /> Discussions
                </a>
              </Button>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/docs">
                  Read the docs <ArrowUpRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Accordion type="single" collapsible defaultValue="0" className="grid w-full gap-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={String(i)}
              className="rounded-2xl border border-border bg-surface-1 px-5 transition-colors last:border-b data-[state=open]:bg-surface-2"
            >
              <AccordionTrigger className="py-5 text-[15px] font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-7 text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
