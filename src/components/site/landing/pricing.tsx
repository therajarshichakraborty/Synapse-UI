import Link from "next/link";
import { ArrowRightIcon, CheckIcon, MinusIcon } from "lucide-react";
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
    <section id="pricing" className="py-20 sm:py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Free and open source. <span className="text-muted-foreground">Forever.</span>
            </>
          }
          description="No license keys, no paywalled components. If it helps you, a star on GitHub helps us."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:mt-16 lg:grid-cols-[1.4fr_1fr]">
          {/* Open source (featured) */}
          <div className="dark relative overflow-hidden rounded-2xl bg-[#0b0b0c] p-7 text-foreground ring-1 ring-white/10 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-grid opacity-50 [--grid-size:40px] [mask-image:radial-gradient(ellipse_80%_60%_at_100%_0%,black,transparent)]"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium">Open Source</h3>
                <span className="rounded-md bg-brand px-2 py-0.5 text-xs font-medium text-white">
                  MIT
                </span>
              </div>
              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-6xl leading-none font-semibold tracking-[-0.05em] sm:text-7xl">
                  $0
                </span>
                <span className="text-muted-foreground">/ forever</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Use it in personal and commercial work. No signup required.
              </p>

              <ul className="mt-8 grid gap-x-6 gap-y-3 border-t border-border pt-8 text-sm sm:grid-cols-2">
                {included.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/docs/installation"
                  className="group inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-white px-5 text-[15px] font-medium text-[#0b0b0c] transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]"
                >
                  Get started
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 px-5 text-[15px] font-medium transition-colors hover:bg-white/5"
                >
                  <GitHubIcon className="size-4" /> Star on GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Pro (placeholder) */}
          <div className="flex flex-col rounded-2xl border border-border bg-background p-7 sm:p-10">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium">Pro</h3>
              <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
                Coming soon
              </span>
            </div>
            {/* TODO(owner): placeholder tier. Remove or define pricing. */}
            <p className="mt-8 text-sm leading-6 text-muted-foreground">
              Premium templates for teams who want to move even faster. Launching soon.
            </p>
            <ul className="mt-8 grid flex-1 content-start gap-3 border-t border-border pt-8 text-sm text-muted-foreground">
              {pro.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <MinusIcon className="size-4 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
