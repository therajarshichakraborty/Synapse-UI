"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export type FloatingNavItem = { name: string; href: string; icon?: React.ReactNode };

export type FloatingNavbarProps = {
  items: FloatingNavItem[];
  action?: React.ReactNode;
  className?: string;
  /** Always visible instead of hiding on scroll down. */
  alwaysVisible?: boolean;
  /** Scroll container. Defaults to the window. */
  container?: React.RefObject<HTMLElement | null>;
};

/** A floating pill navbar that hides while scrolling down and returns on scroll up. */
export function FloatingNavbar({
  items,
  action,
  className,
  alwaysVisible = false,
  container,
}: FloatingNavbarProps) {
  const { scrollY } = useScroll(container ? { container } : undefined);
  const [visible, setVisible] = React.useState(true);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (alwaysVisible) return;
    const previous = scrollY.getPrevious() ?? 0;
    setVisible(current < 60 || current < previous);
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        aria-label="Primary"
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -96, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "glass fixed inset-x-0 top-6 z-50 mx-auto flex w-max max-w-[calc(100%-2rem)] items-center gap-1 rounded-full border border-border py-1.5 pr-1.5 pl-4 shadow-lg",
          className,
        )}
      >
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.icon && <span className="sm:hidden [&_svg]:size-4">{item.icon}</span>}
            <span className={cn(item.icon && "hidden sm:inline")}>{item.name}</span>
          </Link>
        ))}
        {action}
      </motion.nav>
    </AnimatePresence>
  );
}
