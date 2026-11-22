import * as React from "react";
import { cn } from "@/lib/utils";

export type GlowingCardProps = React.ComponentProps<"div"> & {
  /** Seconds for one full rotation of the border light. */
  duration?: number;
  /** Show a soft glow behind the card. */
  glow?: boolean;
};

/** A card whose border is lit by a rotating conic gradient. */
export function GlowingCard({
  className,
  children,
  duration = 6,
  glow = true,
  style,
  ...props
}: GlowingCardProps) {
  return (
    <div className="relative">
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[inherit] bg-brand-gradient opacity-20 blur-2xl"
          style={{ borderRadius: "var(--radius-2xl)" }}
        />
      )}
      <div
        className={cn("border-beam relative rounded-2xl p-6 text-card-foreground", className)}
        style={{ "--duration": `${duration}s`, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
