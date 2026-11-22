"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type FlipWordsProps = {
  words: string[];
  /** Milliseconds each word stays visible. */
  interval?: number;
  className?: string;
};

/** Cycles through words with a letter-staggered flip. */
export function FlipWords({ words, interval = 2600, className }: FlipWordsProps) {
  const [index, setIndex] = React.useState(0);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [interval, reduce, words.length]);

  const word = words[index] ?? "";

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          aria-hidden="true"
          className="inline-block text-gradient"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24, filter: "blur(6px)", scale: 1.6, position: "absolute" }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          {word.split("").map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.035, duration: 0.3 }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
