import Link from "next/link";
import { CheckIcon, SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/site/icons";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/site/landing/reveal";

const free = [
  "Every core, animated and block component",
  "MIT license, personal and commercial use",
  "CLI and shadcn-compatible registry",
  "Light and dark themes, full token system",
  "Community support on GitHub and Discord",
];
const pro = ["Full-page templates", "Figma kit", "Priority support"];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing"
          title="Free and open source. Forever."
          description="No license keys, no paywalled components. Star the repo if it helps you."
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="border-beam relative rounded-3xl p-8 shadow-[0_30px_80px_-30px_var(--glow-color)] [--beam-bg:var(--card)] md:p-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Open Source</h3>
              <Badge variant="gradient">MIT</Badge>
            </div>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="text-6xl font-semibold tracking-tight">$0</span>
              <span className="text-muted-foreground">forever</span>
            </p>
            <ul className="mt-8 grid gap-3 text-sm">
              {free.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="flex-1">
                <Link href="/docs/installation">Get started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="flex-1">
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                  <GitHubIcon className="size-4" /> Star on GitHub
                </a>
              </Button>
            </div>
          </div>
          <div className="relative flex flex-col rounded-3xl surface-card p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Pro</h3>
              <Badge variant="outline">Coming soon</Badge>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {/* TODO(owner): placeholder tier. Remove or define pricing. */}
              Placeholder tier for premium templates. Details to be announced.
            </p>
            <ul className="mt-6 grid flex-1 gap-3 text-sm text-muted-foreground">
              {pro.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <SparklesIcon className="size-4 text-primary/70" /> {f}
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="mt-8" disabled>
              Join waitlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
