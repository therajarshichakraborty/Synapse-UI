import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/animated/grid-background";
import { Sparkles } from "@/components/animated/sparkles";

export function FinalCta() {
  return (
    <section className="px-4 pt-12 pb-24 sm:px-6 md:pb-32">
      <div className="border-beam relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-20 text-center [--beam-bg:var(--surface-1)] [--duration:8s] md:py-28">
        <GridBackground fade="center" />
        <Sparkles density={3} className="opacity-70" />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-72 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[100px]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-h1 font-semibold text-balance">
            <span className="text-gradient-subtle">Start building something </span>
            <span className="text-gradient">people remember.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body-lg text-muted-foreground">
            Add your first component in under a minute. No signup, no license key.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/docs/installation">
                Get Started <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="glass" asChild>
              <Link href="/docs/blocks">Explore blocks</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
