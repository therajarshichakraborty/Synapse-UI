"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function useCopy(timeout = 1800) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | null>(null);
  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), timeout);
      } catch {
        setCopied(false);
      }
    },
    [timeout],
  );
  React.useEffect(() => () => void (timer.current && window.clearTimeout(timer.current)), []);
  return { copied, copy };
}

const swap = {
  initial: { opacity: 0, scale: 0.5, rotate: -45, filter: "blur(2px)" },
  animate: { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.5, rotate: 45, filter: "blur(2px)" },
  transition: { type: "spring", stiffness: 520, damping: 28 },
} as const;

/** Icon-only copy button with an animated check and a floating "Copied" pill. */
export function CopyButton({
  value,
  getValue,
  className,
  label = "Copy code",
  showLabel = false,
}: {
  value?: string;
  getValue?: () => string;
  className?: string;
  label?: string;
  /** Render "Copy" / "Copied" text next to the icon. */
  showLabel?: boolean;
}) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : label}
      onClick={() => copy(value ?? getValue?.() ?? "")}
      className={cn(
        "relative inline-flex h-7 min-w-7 items-center justify-center gap-1.5 rounded-lg px-1.5 text-muted-foreground outline-none transition-[color,background-color,transform] duration-150 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-90",
        copied && "text-success hover:text-success",
        className,
      )}
    >
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
      <span className="relative grid size-3.5 place-items-center" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          {copied ? (
            <motion.span key="check" {...swap} className="absolute">
              <CheckIcon className="size-3.5" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span key="copy" {...swap} className="absolute">
              <CopyIcon className="size-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {showLabel && (
        <span className="text-xs font-medium" aria-hidden="true">
          {copied ? "Copied" : "Copy"}
        </span>
      )}
      {!showLabel && (
        <AnimatePresence>
          {copied && (
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -2, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-[11px] font-medium whitespace-nowrap text-background shadow-lg"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </button>
  );
}
