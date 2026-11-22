"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export type AnimatedTooltipItem = {
  id: number | string;
  name: string;
  designation: string;
  image?: string;
};

/** An overlapping avatar stack with springy tooltips that tilt with the pointer. */
export function AnimatedTooltip({
  items,
  className,
}: {
  items: AnimatedTooltipItem[];
  className?: string;
}) {
  const [hovered, setHovered] = React.useState<AnimatedTooltipItem["id"] | null>(null);
  const x = useMotionValue(0);
  const spring = { stiffness: 120, damping: 8 };
  const rotate = useSpring(useTransform(x, [-100, 100], [-35, 35]), spring);
  const translateX = useSpring(useTransform(x, [-100, 100], [-40, 40]), spring);

  return (
    <ul className={cn("flex items-center", className)}>
      {items.map((item) => (
        <li
          key={item.id}
          className="group relative -mr-3"
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
          onMouseMove={(e) => {
            const half = e.currentTarget.offsetWidth / 2;
            x.set(e.nativeEvent.offsetX - half);
          }}
        >
          <AnimatePresence>
            {hovered === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 12 },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ translateX, rotate }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-lg border border-border bg-popover px-4 py-2 whitespace-nowrap shadow-xl"
                role="tooltip"
              >
                <span className="absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-glow-cyan to-transparent" />
                <span className="text-sm font-semibold">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.designation}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            type="button"
            aria-label={`${item.name}, ${item.designation}`}
            onFocus={() => setHovered(item.id)}
            onBlur={() => setHovered(null)}
            className="relative block size-12 overflow-hidden rounded-full border-2 border-background outline-none transition-transform duration-300 group-hover:z-30 group-hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring"
          >
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt="" className="size-full object-cover" />
            ) : (
              <span className="flex size-full items-center justify-center bg-brand-gradient text-sm font-semibold text-white">
                {item.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
