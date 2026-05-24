"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { TOCItemType } from "fumadocs-core/toc";

interface DocsTOCProps {
  items: TOCItemType[];
}

/**
 * Premium table of contents with animated scroll indicator.
 * The active heading has a sliding violet accent line that moves between items.
 */
export function DocsTOC({ items }: DocsTOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection observer to track active heading
  useEffect(() => {
    if (items.length === 0) return;

    const headingIds = items.map((item) => item.url.slice(1));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0% -60% 0%", threshold: 0 }
    );

    headingIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [items]);

  const scrollTo = (url: string) => {
    const id = url.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block sticky top-14 h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-6 pr-4">
      <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">
        On this page
      </p>
      <nav className="relative space-y-0.5">
        {/* Animated active bar */}
        {items.map((item) => {
          const isActive = activeId === item.url.slice(1);
          const depth = item.depth ?? 2;

          return (
            <div key={item.url} className="relative">
              {isActive && (
                <motion.div
                  layoutId="toc-active-bar"
                  className="absolute left-0 inset-y-0 w-0.5 rounded-full bg-violet-400"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <button
                onClick={() => scrollTo(item.url)}
                className={cn(
                  "w-full text-left px-3 py-1.5 rounded-md text-xs transition-all duration-200",
                  depth === 3 && "pl-5 text-[11px]",
                  depth === 4 && "pl-7 text-[11px]",
                  isActive
                    ? "text-violet-600 dark:text-violet-300 font-medium"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-600 dark:hover:text-zinc-300"
                )}
              >
                {item.title}
              </button>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
