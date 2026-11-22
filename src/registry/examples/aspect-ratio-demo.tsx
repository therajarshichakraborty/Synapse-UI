import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl border border-border">
        <div className="relative size-full bg-[radial-gradient(ellipse_at_top_left,#22d3ee_0%,#3b82f6_40%,#1e1b4b_100%)]">
          <div className="absolute inset-0 bg-grid opacity-40 [--grid-line:rgb(255_255_255/0.12)] [--grid-size:32px]" />
          <span className="absolute bottom-3 left-4 font-mono text-xs text-white/80">16 / 9</span>
        </div>
      </AspectRatio>
    </div>
  );
}
