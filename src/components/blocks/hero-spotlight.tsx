import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { Spotlight } from "@/components/animated/spotlight";
import { Button } from "@/components/ui/button";

export default function HeroSpotlight() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-60" />
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-24 text-center md:pt-36 md:pb-32">
        <Link
          href="#"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/70 py-1 pr-3 pl-1 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-border-strong hover:text-foreground"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
            <SparklesIcon className="size-3" /> New
          </span>
          Introducing workflows
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <h1 className="mt-8 text-display font-semibold text-gradient-subtle">
          The platform for <span className="text-gradient">ambitious teams</span>
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
          Plan, build and ship from one beautiful workspace. Fast by default, secure by design,
          delightful to use.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg">
            Start for free <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline">
            Talk to sales
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          No credit card required · Free for teams up to 5
        </p>
      </div>
    </section>
  );
}
