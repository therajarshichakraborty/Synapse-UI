"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExpandableItem = {
  id: string;
  title: string;
  subtitle: string;
  /** Gradient or image CSS background for the cover. */
  cover: string;
  content: React.ReactNode;
  cta?: React.ReactNode;
};

/** A list of cards that expand into a focused modal using shared-layout animation. */
export function ExpandableCards({
  items,
  className,
}: {
  items: ExpandableItem[];
  className?: string;
}) {
  const [active, setActive] = React.useState<ExpandableItem | null>(null);
  const id = React.useId();
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      triggerRef.current?.focus();
    };
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-title-${active.id}`}
              tabIndex={-1}
              layoutId={`${id}-card-${active.id}`}
              className="flex max-h-[90svh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl outline-none"
            >
              <motion.div
                layoutId={`${id}-cover-${active.id}`}
                className="h-56 shrink-0"
                style={{ background: active.cover }}
              />
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <motion.h3
                    layoutId={`${id}-title-${active.id}`}
                    id={`${id}-title-${active.id}`}
                    className="text-lg font-semibold"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`${id}-sub-${active.id}`}
                    className="text-sm text-muted-foreground"
                  >
                    {active.subtitle}
                  </motion.p>
                </div>
                {active.cta}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-y-auto px-5 pb-6 text-sm leading-6 text-muted-foreground scrollbar-thin"
              >
                {active.content}
              </motion.div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur"
              >
                <XIcon className="size-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className={cn("mx-auto grid w-full max-w-2xl gap-2", className)}>
        {items.map((item) => (
          <motion.li key={item.id} layoutId={`${id}-card-${item.id}`} className="rounded-2xl">
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setActive(item);
              }}
              className="flex w-full items-center gap-4 rounded-2xl p-3 text-left outline-none transition-colors hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <motion.div
                layoutId={`${id}-cover-${item.id}`}
                className="size-14 shrink-0 rounded-xl"
                style={{ background: item.cover }}
              />
              <div className="min-w-0 flex-1">
                <motion.h3 layoutId={`${id}-title-${item.id}`} className="font-medium">
                  {item.title}
                </motion.h3>
                <motion.p
                  layoutId={`${id}-sub-${item.id}`}
                  className="truncate text-sm text-muted-foreground"
                >
                  {item.subtitle}
                </motion.p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">Open</span>
            </button>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
