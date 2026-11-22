import { GridBackground } from "@/components/animated/grid-background";

export default function GridBackgroundDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl border border-border bg-background">
        <GridBackground variant="grid" size={40} />
        <span className="relative font-semibold tracking-tight">Grid</span>
      </div>
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl border border-border bg-background">
        <GridBackground variant="dots" size={16} />
        <span className="relative font-semibold tracking-tight">Dots</span>
      </div>
    </div>
  );
}
