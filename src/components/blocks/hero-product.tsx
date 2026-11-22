import { ArrowRightIcon, PlayIcon } from "lucide-react";
import { AuroraBackground } from "@/components/animated/aurora-background";
import { Button } from "@/components/ui/button";

export default function HeroProduct() {
  return (
    <AuroraBackground className="w-full">
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-16 text-center md:pt-32">
        <h1 className="mx-auto max-w-3xl text-display font-semibold">
          Your product, in its best light
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-body-lg text-muted-foreground">
          Showcase your app in a framed window with a soft aurora behind it. Swap the placeholder
          for a screenshot or video.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button size="lg" variant="gradient">
            Get started <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="glass">
            <PlayIcon data-icon="inline-start" /> Watch video
          </Button>
        </div>
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div
            aria-hidden="true"
            className="absolute inset-x-10 -top-6 h-24 rounded-full bg-brand/10 blur-3xl"
          />
          <div className="relative rounded-2xl border border-border bg-surface-1/80 p-2 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="size-2.5 rounded-full bg-border-strong" />
            </div>
            {/* TODO: replace with a real product screenshot */}
            <div className="grid aspect-[16/9] grid-cols-[180px_1fr] gap-2 overflow-hidden rounded-xl border border-border bg-background p-2 text-left">
              <div className="hidden space-y-2 rounded-lg bg-surface-1 p-3 sm:block">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-6 rounded-md ${i === 1 ? "bg-primary/20" : "bg-muted"}`}
                  />
                ))}
              </div>
              <div className="col-span-2 grid grid-rows-[auto_1fr] gap-2 sm:col-span-1">
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-20 rounded-lg bg-surface-1" />
                  ))}
                </div>
                <div className="rounded-lg bg-gradient-to-br from-primary/15 via-surface-1 to-surface-1" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuroraBackground>
  );
}
