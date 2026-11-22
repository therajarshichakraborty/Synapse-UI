import { TiltCard } from "@/components/animated/tilt-card";
import { Button } from "@/components/ui/button";

export default function TiltCardDemo() {
  return (
    <TiltCard className="w-full max-w-sm">
      <div className="aspect-[16/10] rounded-xl bg-[radial-gradient(ellipse_at_top_left,#22d3ee,#3b82f6_45%,#312e81)]" />
      <h3 className="mt-5 text-lg font-semibold tracking-tight">Make things float in air</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Hover over this card to unleash the power of CSS perspective.
      </p>
      <div className="mt-5 flex justify-between">
        <Button variant="ghost" size="sm">
          Try now
        </Button>
        <Button size="sm">Sign up</Button>
      </div>
    </TiltCard>
  );
}
