"use client";

import * as React from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export type NumberTickerProps = {
  value: number;
  /** Starting value. */
  from?: number;
  decimals?: number;
  /** Delay in seconds after entering the viewport. */
  delay?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  className?: string;
};

/** Counts to a value with spring physics when it scrolls into view. */
export function NumberTicker({
  value,
  from = 0,
  decimals = 0,
  delay = 0,
  prefix = "",
  suffix = "",
  locale = "en-US",
  className,
}: NumberTickerProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(from);
  const spring = useSpring(motionValue, { damping: 40, stiffness: 90 });
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const format = React.useCallback(
    (n: number) =>
      `${prefix}${Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(Number(n.toFixed(decimals)))}${suffix}`,
    [decimals, locale, prefix, suffix],
  );

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = format(value);
      return;
    }
    const id = window.setTimeout(() => motionValue.set(value), delay * 1000);
    return () => window.clearTimeout(id);
  }, [delay, format, inView, motionValue, reduce, value]);

  React.useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = format(latest);
      }),
    [format, spring],
  );

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums tracking-tight", className)}
      aria-label={format(value)}
    >
      {format(from)}
    </span>
  );
}
