import Link from "next/link";
import { CheckIcon, LockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GitHubIcon } from "@/components/site/icons";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/site/landing/reveal";

const included = [
  "Every core, animated and block component",
  "MIT license, commercial use included",
  "CLI and shadcn-compatible registry",
  "Light and dark themes, full token system",
  "Accessible primitives, keyboard support",
  "Community support on GitHub",
];
const pro = ["Full-page templates", "Figma kit", "Priority support"];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing"
          title="Free and open source. Forever."
          description="No license keys, no paywalled components. If it helps you, a star on GitHub helps us."
        />
        <div className="mx-auto mt-16 grid max-w-5xl gap-4 lg:grid-cols-[1.45fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl surface-premium p-8 md:p-10">
            <div
              aria-hidden="true"
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent"
            />
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Open Source</h3>
              <Badge variant="outline">MIT</Badge>
            </div>
            <p className="mt-8 flex items-baseline gap-2">
              <span className="text-7xl leading-none font-semibold tracking-[-0.05em]">$0</span>
              <span className="text-muted-foreground">/ forever</span>
            </p>
            <ul className="mt-10 grid gap-x-6 gap-y-3.5 text-sm sm:grid-cols-2">
              {included.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                    <CheckIcon className="size-2.5" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-2.5 sm:flex-row">
              <Button size="lg" asChild className="sm:flex-1">
                <Link href="/docs/installation">Get started</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="sm:flex-1">
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                  <GitHubIcon className="size-4" /> Star on GitHub
                </a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl border border-dashed border-border-strong p-8 md:p-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Pro</h3>
              <Badge variant="secondary">Coming soon</Badge>
            </div>
            {/* TODO(owner): placeholder tier. Remove or define pricing. */}
            <p className="mt-8 text-sm leading-6 text-muted-foreground">
              Premium templates for teams who want to move even faster. Join the waitlist to hear
              first.
            </p>
            <ul className="mt-8 grid flex-1 gap-3.5 text-sm text-muted-foreground">
              {pro.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <LockIcon className="size-4 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <form className="mt-10 flex gap-2" aria-label="Pro waitlist">
              <Input
                type="email"
                placeholder="you@company.com"
                aria-label="Email address"
                disabled
              />
              <Button type="button" variant="outline" disabled>
                Notify me
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
