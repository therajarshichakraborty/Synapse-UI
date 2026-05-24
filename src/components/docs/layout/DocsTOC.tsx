"use client";

import { useEffect, useRef, useState } from "react";
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
      <nav className="relative space-y-1.5 border-l border-zinc-200 dark:border-zinc-800 pl-4 py-0.5">
        {items.map((item) => {
          const isActive = activeId === item.url.slice(1);
          const depth = item.depth ?? 2;

          return (
            <div key={item.url} className="relative">
              <button
                onClick={() => scrollTo(item.url)}
                className={cn(
                  "w-full text-left py-0.5 text-xs transition-all duration-150 block truncate",
                  depth === 3 && "pl-3 text-[11px]",
                  depth === 4 && "pl-5 text-[11px]",
                  isActive
                    ? "text-zinc-950 dark:text-zinc-50 font-medium -ml-[17px] pl-[16px] border-l border-zinc-900 dark:border-zinc-50"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
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
