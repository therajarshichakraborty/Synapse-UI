import * as React from "react";
import { cn } from "@/lib/utils";

export type AuroraBackgroundProps = React.ComponentProps<"div"> & {
  /** Only show the aurora near the top-right corner. */
  radial?: boolean;
};

/** A slowly drifting aurora of cyan, blue and indigo light. */
export function AuroraBackground({
  className,
  children,
  radial = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div className={cn("relative isolate overflow-hidden bg-background", className)} {...props}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className={cn(
            "absolute -inset-[10px] opacity-50 blur-[10px] invert filter will-change-transform dark:invert-0",
            "[background-image:var(--aurora-stripes),var(--aurora-colors)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%]",
            "after:absolute after:inset-0 after:animate-aurora after:mix-blend-difference after:content-[''] after:[background-attachment:fixed] after:[background-image:var(--aurora-stripes),var(--aurora-colors)] after:[background-size:200%,_100%]",
            radial && "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]",
          )}
          style={
            {
              "--aurora-stripes":
                "repeating-linear-gradient(100deg, var(--background) 0%, var(--background) 7%, transparent 10%, transparent 12%, var(--background) 16%)",
              "--aurora-colors":
                "repeating-linear-gradient(100deg, #3b82f6 10%, #6366f1 15%, #22d3ee 20%, #93c5fd 25%, #2563eb 30%)",
            } as React.CSSProperties
          }
        />
      </div>
      {children}
    </div>
  );
}
