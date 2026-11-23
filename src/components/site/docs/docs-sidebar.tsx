"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ChevronDownIcon } from "lucide-react";
import type { NavGroup } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";

const COLLAPSE_KEY = "synapse:sidebar-collapsed";
const SCROLL_KEY = "synapse:sidebar-scroll";

function useCollapsedGroups() {
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(COLLAPSE_KEY);
      if (raw) setCollapsed(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggle = React.useCallback((title: string) => {
    setCollapsed((prev) => {
      const next = { ...prev, [title]: !prev[title] };
      try {
        localStorage.setItem(COLLAPSE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  return { collapsed, toggle };
}

export function DocsSidebarNav({ groups, className }: { groups: NavGroup[]; className?: string }) {
  const pathname = usePathname();
  const { collapsed, toggle } = useCollapsedGroups();
  const [hovered, setHovered] = React.useState<string | null>(null);
  const navId = React.useId();

  return (
    <nav
      aria-label="Documentation"
      className={cn("grid gap-6 text-sm", className)}
      onMouseLeave={() => setHovered(null)}
    >
      {groups.map((group) => {
        const isCollapsed = collapsed[group.title] === true;
        const id = `sidebar-group-${group.title.toLowerCase().replace(/\W+/g, "-")}`;
        return (
          <div key={group.title}>
            <button
              type="button"
              onClick={() => toggle(group.title)}
              aria-expanded={!isCollapsed}
              aria-controls={id}
              className="group flex w-full items-center justify-between rounded-md px-2.5 py-1 text-[13px] font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              {group.title}
              <ChevronDownIcon
                className={cn(
                  "size-3.5 opacity-0 transition-[transform,opacity] duration-200 group-hover:opacity-100",
                  isCollapsed && "-rotate-90",
                )}
                aria-hidden="true"
              />
            </button>
            <ul id={id} hidden={isCollapsed} className="mt-1 grid gap-px">
              {group.items.map((item) => {
                const active = pathname === item.url;
                return (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      data-active={active || undefined}
                      aria-current={active ? "page" : undefined}
                      onMouseEnter={() => setHovered(item.url)}
                      onFocus={() => setHovered(item.url)}
                      className={cn(
                        "relative flex h-8 items-center gap-2 rounded-lg px-2.5 text-[14px] outline-none transition-[color,transform] duration-200 focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.98]",
                        active
                          ? "font-medium text-foreground"
                          : "text-foreground/70 hover:translate-x-0.5 hover:text-foreground",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId={`${navId}-active`}
                          aria-hidden="true"
                          className="absolute inset-0 rounded-lg border border-border-strong bg-background shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_3px_color-mix(in_oklab,var(--foreground)_4%,transparent)]"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                      {hovered === item.url && !active && (
                        <motion.span
                          layoutId={`${navId}-hover`}
                          aria-hidden="true"
                          className="absolute inset-0 rounded-lg bg-accent/70"
                          transition={{ type: "spring", stiffness: 520, damping: 40 }}
                        />
                      )}
                      <span className="relative truncate">{item.title}</span>
                      {item.isNew && (
                        <span className="relative ml-auto flex items-center gap-1 rounded-full bg-brand/10 px-1.5 py-px text-[10.5px] font-medium text-brand before:size-1.5 before:rounded-full before:bg-brand before:content-['']">
                          New
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

export function DocsSidebar({ groups }: { groups: NavGroup[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Restore scroll position across navigations and reloads.
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    try {
      const saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved) el.scrollTop = Number(saved);
    } catch {
      /* storage unavailable */
    }
    const active = el.querySelector<HTMLElement>("[data-active]");
    if (active) {
      const { top, bottom } = active.getBoundingClientRect();
      const box = el.getBoundingClientRect();
      if (top < box.top || bottom > box.bottom) active.scrollIntoView({ block: "center" });
    }
  }, [pathname]);

  return (
    <div
      ref={ref}
      onScroll={(e) => {
        try {
          sessionStorage.setItem(SCROLL_KEY, String(e.currentTarget.scrollTop));
        } catch {
          /* storage unavailable */
        }
      }}
      className="h-full overflow-y-auto py-8 pr-6 pl-4 scrollbar-none"
    >
      <DocsSidebarNav groups={groups} />
    </div>
  );
}
