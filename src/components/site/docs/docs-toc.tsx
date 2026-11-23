"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon, BugIcon, LightbulbIcon, PencilIcon } from "lucide-react";
import { GitHubIcon } from "@/components/site/icons";
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

function issueUrl(kind: "bug" | "feature", title: string) {
  const label = kind === "bug" ? "bug" : "enhancement";
  const prefix = kind === "bug" ? "[bug]" : "[feat]";
  return `${siteConfig.links.github}/issues/new?labels=${label}&title=${encodeURIComponent(`${prefix} ${title}`)}`;
}

export function DocsToc({
  items,
  title = "",
  editUrl,
}: {
  items: TocItem[];
  /** Page title, used to prefill issue titles. */
  title?: string;
  /** GitHub URL of the page source. */
  editUrl?: string;
}) {
  const ids = React.useMemo(() => items.map((i) => i.url.replace(/^#/, "")), [items]);
  const active = useActiveHeading(ids);
  const tocId = React.useId();

  const contribute = [
    { label: "Report an issue", href: issueUrl("bug", title), Icon: BugIcon },
    { label: "Request a feature", href: issueUrl("feature", title), Icon: LightbulbIcon },
    ...(editUrl ? [{ label: "Edit this page", href: editUrl, Icon: PencilIcon }] : []),
  ];

  return (
    <div className="flex h-full flex-col text-sm">
      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none">
        {items.length > 0 && (
          <>
            <p className="mb-3 text-[13px] font-medium text-muted-foreground">On This Page</p>
            <ul className="relative grid gap-0.5 border-l border-border">
              {items.map((item) => {
                const id = item.url.replace(/^#/, "");
                const isActive = active === id;
                return (
                  <li key={item.url} className="relative">
                    {isActive && (
                      <motion.span
                        layoutId={`${tocId}-marker`}
                        aria-hidden="true"
                        className="absolute top-1 bottom-1 -left-px w-px bg-foreground"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                    <a
                      href={item.url}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "block py-1 pl-3 text-[13px] leading-5 transition-[color,transform] duration-200 hover:translate-x-0.5",
                        item.depth >= 3 && "pl-6",
                        item.depth >= 4 && "pl-9",
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
          </>
        )}

        <p className="mt-8 mb-3 text-[13px] font-medium text-muted-foreground">Contribute</p>
        <ul className="grid gap-1">
          {contribute.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 py-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon
                  className="size-3.5 transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110"
                  aria-hidden="true"
                />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="group/promo relative mt-6 shrink-0 overflow-hidden rounded-2xl border border-border bg-background p-5 transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-brand/15 blur-3xl transition-transform duration-700 group-hover/promo:scale-125"
        />
        <p className="relative flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-success uppercase">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
            <span className="relative size-2 rounded-full bg-success" />
          </span>
          Free &amp; open source
        </p>
        <p className="relative mt-3 text-[19px] leading-tight font-semibold tracking-tight">
          Ship <em className="font-serif italic">faster</em> with{" "}
          <span className="bg-gradient-to-r from-brand via-sky-500 to-indigo-500 bg-clip-text text-transparent">
            Synapse UI
          </span>
        </p>
        <p className="relative mt-2 text-[13px] leading-5 text-muted-foreground">
          150+ components for web and mobile. A star on GitHub helps more people find it.
        </p>
        <div className="relative mt-4 flex items-center gap-2">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-foreground px-3 text-[13px] font-medium whitespace-nowrap text-background transition-transform active:scale-95"
          >
            <GitHubIcon className="size-3.5" />
            Star
          </a>
          <Link
            href="/docs/changelog"
            className="group/cl inline-flex h-8 items-center gap-1 px-1 text-[13px] font-medium text-muted-foreground hover:text-foreground"
          >
            Changelog
            <ArrowRightIcon className="size-3.5 transition-transform group-hover/cl:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
