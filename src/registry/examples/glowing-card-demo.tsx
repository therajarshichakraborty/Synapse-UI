import { ZapIcon } from "lucide-react";
import { GlowingCard } from "@/components/animated/glowing-card";

export default function GlowingCardDemo() {
  return (
    <GlowingCard className="w-full max-w-sm">
      <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <ZapIcon className="size-5" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">Edge functions</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Run code close to your users with zero cold starts and a global footprint.
      </p>
    </GlowingCard>
  );
}
