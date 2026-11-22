"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TerminalLine =
  | { type: "command"; text: string }
  | { type: "output"; text: string; tone?: "default" | "success" | "muted" | "info" };

export type TerminalProps = {
  lines: TerminalLine[];
  title?: string;
  className?: string;
  /** Milliseconds per typed character. */
  typeSpeed?: number;
  /** Milliseconds between output lines. */
  lineDelay?: number;
  /** Replay when scrolled into view again. */
  loop?: boolean;
};

const tones = {
  default: "text-foreground/90",
  success: "text-success",
  muted: "text-muted-foreground",
  info: "text-primary",
};

/** A terminal that types commands and streams output when it enters the viewport. */
export function Terminal({
  lines,
  title = "Terminal",
  className,
  typeSpeed = 38,
  lineDelay = 280,
  loop = false,
}: TerminalProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: !loop, amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = React.useState(0);
  const [chars, setChars] = React.useState(0);

  React.useEffect(() => {
    if (!inView) {
      if (loop) {
        setStep(0);
        setChars(0);
      }
      return;
    }
    if (reduce) {
      setStep(lines.length);
      return;
    }
    const line = lines[step];
    if (!line) return;
    if (line.type === "command" && chars < line.text.length) {
      const id = window.setTimeout(() => setChars((c) => c + 1), typeSpeed);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(
      () => {
        setStep((s) => s + 1);
        setChars(0);
      },
      line.type === "command" ? 420 : lineDelay,
    );
    return () => window.clearTimeout(id);
  }, [chars, inView, lineDelay, lines, loop, reduce, step, typeSpeed]);

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-[var(--code-bg)] shadow-2xl shadow-black/20",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-2 border-b border-border px-4">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="min-h-[12rem] p-4 font-mono text-[13px] leading-6" aria-live="polite">
        <span className="sr-only">{lines.map((l) => l.text).join(". ")}</span>
        <div aria-hidden="true">
          {lines.slice(0, step + 1).map((line, i) => {
            const done = i < step;
            if (line.type === "command") {
              const text = done ? line.text : line.text.slice(0, chars);
              return (
                <div key={i} className="flex">
                  <span className="mr-2 text-primary">❯</span>
                  <span className="text-foreground">{text}</span>
                  {!done && (
                    <span className="ml-px inline-block h-5 w-2 animate-caret bg-foreground/70" />
                  )}
                </div>
              );
            }
            if (!done && i === step) return null;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn("whitespace-pre-wrap", tones[line.tone ?? "default"])}
              >
                {line.text}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
