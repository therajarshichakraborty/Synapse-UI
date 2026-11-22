"use client";

import * as React from "react";
import { ArrowUpIcon, TextIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type TocItem = { title: React.ReactNode; url: string; depth: number };

function useActiveHeading(ids: string[]) {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!ids.length) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: [0, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function DocsToc({ items }: { items: TocItem[] }) {
  const ids = React.useMemo(() => items.map((i) => i.url.replace(/^#/, "")), [items]);
  const active = useActiveHeading(ids);

  if (!items.length) return null;

  return (
    <div className="text-sm">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground uppercase">
        <TextIcon className="size-3.5" aria-hidden="true" />
        On this page
      </p>
      <ul className="relative grid gap-0.5 border-l border-border">
        {items.map((item) => {
          const id = item.url.replace(/^#/, "");
          const isActive = active === id;
          return (
            <li key={item.url}>
              <a
                href={item.url}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1 text-[13px] leading-5 transition-colors",
                  item.depth <= 2 ? "pl-3" : item.depth === 3 ? "pl-6" : "pl-9",
                  isActive
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowUpIcon className="size-3.5" aria-hidden="true" /> Back to top
      </button>
    </div>
  );
}
