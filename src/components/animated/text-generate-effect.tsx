"use client";

import * as React from "react";
import { motion, stagger, useAnimate, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TextGenerateEffectProps = {
  words: string;
  className?: string;
  /** Seconds per word. */
  duration?: number;
  blur?: boolean;
};

/** Reveals text word by word with a fade and un-blur when it enters the viewport. */
export function TextGenerateEffect({
  words,
  className,
  duration = 0.5,
  blur = true,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const list = words.split(" ");

  React.useEffect(() => {
    if (!inView || reduce) return;
    animate("span", { opacity: 1, filter: "blur(0px)" }, { duration, delay: stagger(0.08) });
  }, [animate, duration, inView, reduce]);

  return (
    <p
      ref={scope}
      className={cn("text-2xl leading-snug font-semibold tracking-tight", className)}
      aria-label={words}
    >
      {list.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block"
          style={reduce ? undefined : { opacity: 0, filter: blur ? "blur(8px)" : "none" }}
        >
          {word}
          {i < list.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </p>
  );
}
