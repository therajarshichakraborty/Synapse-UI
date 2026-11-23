"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin reading-progress bar pinned to the top of docs pages. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand via-sky-500 to-indigo-500"
    />
  );
}
