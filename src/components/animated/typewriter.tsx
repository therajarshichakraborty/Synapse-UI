"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TypewriterProps = {
  words: string[];
  className?: string;
  /** Milliseconds per character while typing. */
  typeSpeed?: number;
  deleteSpeed?: number;
  /** Pause on a complete word, in ms. */
  pause?: number;
  loop?: boolean;
  caretClassName?: string;
};

/** Types and deletes words in a loop. Shows the first word statically when reduced motion is on. */
export function Typewriter({
  words,
  className,
  typeSpeed = 70,
  deleteSpeed = 40,
  pause = 1400,
  loop = true,
  caretClassName,
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (reduce || !words.length) return;
    const word = words[index % words.length];
    let delay = deleting ? deleteSpeed : typeSpeed;
    if (!deleting && text === word) {
      if (!loop && index === words.length - 1) return;
      delay = pause;
    }
    const id = window.setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => window.clearTimeout(id);
  }, [deleteSpeed, deleting, index, loop, pause, reduce, text, typeSpeed, words]);

  const shown = reduce ? words[0] : text;

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">{shown}</span>
      <span
        aria-hidden="true"
        className={cn(
          "ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] animate-caret bg-primary",
          caretClassName,
        )}
      />
    </span>
  );
}
