import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl border border-border">
        <div className="relative size-full bg-[linear-gradient(160deg,#262626,#0a0a0a)]">
          <span className="absolute bottom-3 left-4 font-mono text-xs text-white/80">16 / 9</span>
        </div>
      </AspectRatio>
    </div>
  );
}
