import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Spotlight } from "@/components/animated/spotlight";
import { GridBackground } from "@/components/animated/grid-background";
import { Button } from "@/components/ui/button";
import { InstallSnippet } from "@/components/site/landing/install-snippet";
import { HeroComposition } from "@/components/site/landing/hero-composition";
import { HeroIntro } from "@/components/site/landing/hero-intro";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-10 md:pt-16">
      {/* Backdrop: grid with radial mask, spotlight beam, glow orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <GridBackground fade="top" className="[--grid-size:64px]" />
        <div className="absolute top-[-12rem] left-1/2 h-[36rem] w-[64rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.22),transparent)]" />
        <div className="absolute top-[18rem] left-[8%] size-72 animate-float rounded-full bg-glow-cyan/10 blur-3xl" />
        <div className="absolute top-[10rem] right-[6%] size-80 animate-float rounded-full bg-glow-indigo/15 blur-3xl [animation-delay:-4s]" />
      </div>
      <Spotlight className="-top-48 left-0 md:-top-32 md:left-56" />

      <div className="container-page flex flex-col items-center text-center">
        <HeroIntro>
          <Link
            href="/docs/animated"
            className="group relative inline-flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span
              aria-hidden="true"
              className="border-beam absolute inset-0 rounded-full [--beam-bg:var(--surface-1)] [--duration:5s]"
            />
            <span className="relative rounded-full bg-brand-gradient px-2 py-0.5 text-[11px] font-semibold text-white">
              New
            </span>
            <span className="relative">31 animated components, 12 blocks</span>
            <ArrowRightIcon className="relative size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="mx-auto mt-8 max-w-4xl text-display font-semibold text-balance">
            <span className="text-gradient-subtle">Interfaces that feel </span>
            <span className="text-gradient">expensive.</span>
            <br className="hidden sm:block" />
            <span className="text-gradient-subtle"> Code you actually own.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-pretty text-muted-foreground">
            Synapse UI is a library of accessible React components and cinematic animated sections.
            Built on Tailwind CSS v4, Radix and Motion. Copy, paste, ship.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/docs/installation">
                Get Started <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="glass" asChild className="w-full sm:w-auto">
              <Link href="/docs/components">Browse Components</Link>
            </Button>
          </div>
          <div className="mt-6 flex justify-center">
            <InstallSnippet />
          </div>
        </HeroIntro>

        <HeroComposition />
      </div>
    </section>
  );
}
