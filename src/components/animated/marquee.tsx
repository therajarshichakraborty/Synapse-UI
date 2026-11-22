import * as React from "react";
import { cn } from "@/lib/utils";

export type MarqueeProps = React.ComponentProps<"div"> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  /** Seconds per loop. */
  duration?: number;
  /** Gap between items, as a CSS length. */
  gap?: string;
  /** Number of content copies. Two is enough for most content. */
  repeat?: number;
  /** Fade the edges. */
  fade?: boolean;
};

/** An infinite scroller. Stops entirely when the user prefers reduced motion. */
export function Marquee({
  className,
  reverse,
  pauseOnHover = true,
  vertical,
  duration = 40,
  gap = "1rem",
  repeat = 2,
  fade = true,
  children,
  style,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group/marquee flex overflow-hidden [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        fade && (vertical ? "mask-edge-fade-y" : "mask-edge-fade-x"),
        className,
      )}
      style={{ "--duration": `${duration}s`, "--gap": gap, ...style } as React.CSSProperties}
      {...props}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)] motion-reduce:animate-none",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
