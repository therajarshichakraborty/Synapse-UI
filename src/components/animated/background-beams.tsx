"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const PATHS = Array.from({ length: 14 }).map((_, i) => {
  const o = i * 28;
  return `M${-380 + o} ${-189 - i * 8}C${-380 + o} ${-189 - i * 8} ${-312 + o} ${216 - i * 8} ${152 + o} ${343 - i * 8}C${616 + o} ${470 - i * 8} ${684 + o} ${875 - i * 8} ${684 + o} ${875 - i * 8}`;
});

export type BackgroundBeamsProps = { className?: string; count?: number };

/** Gradient beams that travel along curved SVG paths. Static when reduced motion is on. */
export function BackgroundBeams({ className, count = 10 }: BackgroundBeamsProps) {
  const reduce = useReducedMotion();
  const id = React.useId().replace(/:/g, "");
  const paths = PATHS.slice(0, count);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg
        className="absolute size-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((d) => (
          <path key={d} d={d} stroke="var(--border-strong)" strokeOpacity="0.5" strokeWidth="0.5" />
        ))}
        {!reduce &&
          paths.map((d, i) => (
            <path
              key={`beam-${d}`}
              d={d}
              stroke={`url(#${id}-g${i})`}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          ))}
        <defs>
          {paths.map((_, i) => (
            <motion.linearGradient
              key={i}
              id={`${id}-g${i}`}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", `${93 + (i % 5)}%`],
              }}
              transition={{
                duration: 6 + (i % 5) * 1.6,
                ease: "easeInOut",
                repeat: Infinity,
                delay: i * 0.7,
              }}
            >
              <stop stopColor="#93c5fd" stopOpacity="0" />
              <stop stopColor="#bfdbfe" />
              <stop offset="32.5%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}
