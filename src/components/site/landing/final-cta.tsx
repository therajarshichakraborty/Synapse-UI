import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "@/components/animated/sparkles";

export function FinalCta() {
  return (
    <section className="px-4 pt-8 pb-24 sm:px-6 md:pb-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] surface-premium px-6 py-20 text-center md:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-x-24 top-0 h-px bg-gradient-to-r from-transparent via-foreground/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-48 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.06] blur-3xl"
        />
        <Sparkles density={2} className="hidden opacity-40 dark:block" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-balance">
            Start building something
            <span className="text-muted-foreground"> people remember.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-7 text-muted-foreground">
            Add your first component in under a minute. No signup, no license key.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/docs/installation">Get Started</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/docs/blocks">
                Explore blocks <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
