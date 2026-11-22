"use client";

import * as React from "react";
import Link from "next/link";
import { GitHubIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
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

  return (
    <div className="flex h-full flex-col text-sm">
      {items.length > 0 && (
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none">
          <p className="mb-3 text-[13px] font-medium text-foreground">On This Page</p>
          <ul className="grid gap-0.5">
            {items.map((item) => {
              const id = item.url.replace(/^#/, "");
              const isActive = active === id;
              return (
                <li key={item.url}>
                  <a
                    href={item.url}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "block py-1 text-[13px] leading-5 transition-colors",
                      item.depth >= 3 && "pl-4",
                      item.depth >= 4 && "pl-8",
                      isActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className="mt-6 shrink-0 rounded-2xl bg-surface-2 p-5">
        <p className="text-[15px] leading-snug font-semibold tracking-tight">
          Synapse UI is open source
        </p>
        <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
          Every component is free and MIT licensed. A star on GitHub helps more people find it.
        </p>
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <GitHubIcon className="size-3.5" />
              Star
            </a>
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/docs/changelog">Changelog</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
