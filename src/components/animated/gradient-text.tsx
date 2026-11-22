import * as React from "react";
import { cn } from "@/lib/utils";

export type GradientTextProps = React.ComponentProps<"span"> & {
  /** Animate the gradient position. */
  animate?: boolean;
  /** Seconds per cycle. */
  duration?: number;
  colors?: string[];
};

/** Text filled with the brand gradient, optionally animated. */
export function GradientText({
  className,
  animate = true,
  duration = 6,
  colors = ["#22d3ee", "#3b82f6", "#6366f1", "#3b82f6", "#22d3ee"],
  style,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-[length:200%_auto] bg-clip-text text-transparent motion-reduce:animate-none",
        animate && "animate-[shimmer_var(--duration)_linear_infinite]",
        className,
      )}
      style={
        {
          backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
          "--duration": `${duration}s`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
