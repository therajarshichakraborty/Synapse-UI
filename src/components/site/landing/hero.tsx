import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Spotlight } from "@/components/animated/spotlight";
import { Button } from "@/components/ui/button";
import { InstallSnippet } from "@/components/site/landing/install-snippet";
import { HeroComposition } from "@/components/site/landing/hero-composition";
import { HeroIntro } from "@/components/site/landing/hero-intro";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Spotlight fill="white" className="-top-56 left-0 hidden md:-top-40 md:left-72 dark:block" />

      <div className="container-page flex flex-col items-center pt-20 text-center md:pt-28">
        <HeroIntro>
          <Link
            href="/docs/animated"
            className="group inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[13px] font-medium text-foreground/90 transition-colors hover:bg-accent"
          >
            31 animated components and 12 blocks
            <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(2.5rem,1.6rem+4.2vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance">
            Beautiful interfaces.
            <br className="hidden sm:block" /> Code you actually own.
          </h1>

          <p className="mx-auto mt-6 max-w-[40rem] text-[1.0625rem] leading-7 text-pretty text-muted-foreground sm:text-lg">
            Accessible React components and refined motion, built on Tailwind CSS, Radix and Motion.
            Copy them into your project, make them yours, and ship.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/docs/installation">Get Started</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
              <Link href="/docs/components">
                View Components <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex justify-center">
            <InstallSnippet />
          </div>
        </HeroIntro>
      </div>

      <HeroComposition />
    </section>
  );
}
