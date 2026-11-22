"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type AnimatedTab = { value: string; label: React.ReactNode; content?: React.ReactNode };

export type AnimatedTabsProps = {
  tabs: AnimatedTab[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  listClassName?: string;
  /** Visual style of the indicator. */
  variant?: "pill" | "underline";
};

/** Tabs with a shared-layout indicator that slides between triggers. */
export function AnimatedTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  className,
  listClassName,
  variant = "pill",
}: AnimatedTabsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? tabs[0]?.value);
  const active = value ?? internal;
  const id = React.useId();
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const select = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (e.key === "Home" || e.key === "End" || dir) {
      e.preventDefault();
      const next =
        e.key === "Home"
          ? 0
          : e.key === "End"
            ? tabs.length - 1
            : (i + dir + tabs.length) % tabs.length;
      refs.current[next]?.focus();
      select(tabs[next].value);
    }
  }

  const current = tabs.find((t) => t.value === active);

  return (
    <div className={className}>
      <div
        role="tablist"
        className={cn(
          "relative inline-flex items-center gap-1",
          variant === "pill" && "rounded-full border border-border bg-surface-1 p-1",
          variant === "underline" && "border-b border-border",
          listClassName,
        )}
      >
        {tabs.map((tab, i) => {
          const selected = tab.value === active;
          return (
            <button
              key={tab.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${id}-tab-${tab.value}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${id}-panel-${tab.value}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tab.value)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative px-4 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                variant === "pill" ? "rounded-full" : "pb-2.5",
                selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${id}-indicator`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  className={cn(
                    "absolute",
                    variant === "pill" &&
                      "inset-0 rounded-full bg-primary/15 ring-1 ring-primary/30",
                    variant === "underline" && "inset-x-2 -bottom-px h-0.5 rounded-full bg-primary",
                  )}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>
      {current?.content !== undefined && (
        <motion.div
          key={current.value}
          id={`${id}-panel-${current.value}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${current.value}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-4"
        >
          {current.content}
        </motion.div>
      )}
    </div>
  );
}
