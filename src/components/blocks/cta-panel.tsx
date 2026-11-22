import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaPanel() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="border-beam relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-20 text-center [--beam-bg:var(--surface-1)] md:py-24">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-64 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-h2 font-semibold">
            Ready to build something beautiful?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-body-lg text-muted-foreground">
            Start with a single component or a full page. It is free forever.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg">
              Get started <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="glass">
              Browse components
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
