"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export type TiltCardProps = React.ComponentProps<"div"> & {
  /** Maximum tilt in degrees. */
  max?: number;
  /** Show a glare highlight. */
  glare?: boolean;
};

/** A card that tilts in 3D toward the pointer. Flat when reduced motion is on. */
export function TiltCard({ className, children, max = 12, glare = true, ...props }: TiltCardProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), spring);
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.18), transparent 55%)`,
  );

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }

  function reset() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div className="[perspective:1000px]">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("relative rounded-2xl surface-card p-6 will-change-transform", className)}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        <div style={{ transform: "translateZ(40px)" }}>{children}</div>
        {glare && !reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}
