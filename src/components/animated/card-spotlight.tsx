"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type CardSpotlightProps = React.ComponentProps<"div"> & {
  /** Radius of the light in pixels. */
  radius?: number;
  color?: string;
};

/** A card with a radial glow and border highlight that follow the cursor. */
export function CardSpotlight({
  className,
  children,
  radius = 320,
  color = "rgb(59 130 246 / 0.15)",
  ...props
}: CardSpotlightProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn("group/spot relative overflow-hidden rounded-2xl surface-card p-6", className)}
      style={{ "--r": `${radius}px`, "--spot": color } as React.CSSProperties}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(var(--r) circle at var(--x, 50%) var(--y, 50%), var(--spot), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          padding: 1,
          background:
            "radial-gradient(calc(var(--r) * 0.6) circle at var(--x, 50%) var(--y, 50%), rgb(96 165 250 / 0.7), transparent 70%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
