"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export type TracingBeamProps = { children: React.ReactNode; className?: string };

/** A beam on the left edge of an article that fills as the reader scrolls. */
export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const content = React.useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = React.useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  React.useEffect(() => {
    const el = content.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSvgHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <motion.div ref={ref} className={cn("relative mx-auto h-full w-full max-w-3xl", className)}>
      <div aria-hidden="true" className="absolute top-3 -left-2 md:-left-14">
        <motion.div
          className="ml-[27px] flex size-4 items-center justify-center rounded-full border border-border shadow-sm"
          style={{
            boxShadow: useTransform(
              scrollYProgress,
              [0, 0.02],
              ["0 0 0 4px var(--glow-ring)", "none"],
            ),
          }}
        >
          <span className="size-2 rounded-full border border-primary/40 bg-primary" />
        </motion.div>
        <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="ml-4 block">
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="var(--border-strong)"
            strokeOpacity="0.6"
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#tracing-gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient
              id="tracing-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#22d3ee" stopOpacity="0" />
              <stop stopColor="#22d3ee" />
              <stop offset="0.325" stopColor="#3b82f6" />
              <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={content}>{children}</div>
    </motion.div>
  );
}
