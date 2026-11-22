"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CodeFrame } from "@/components/docs/code-block";
import { cn } from "@/lib/utils";

export function InstallTabs({ cli, manual }: { cli: React.ReactNode; manual: React.ReactNode }) {
  const [tab, setTab] = React.useState<"cli" | "manual">("cli");
  const id = React.useId();

  return (
    <div className="not-prose my-6">
      <div
        role="tablist"
        aria-label="Installation method"
        className="mb-1 flex items-center gap-1 border-b border-border"
      >
        {(
          [
            ["cli", "CLI"],
            ["manual", "Manual"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            aria-controls={`${id}-${value}`}
            onClick={() => setTab(value)}
            className={cn(
              "relative px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40",
              tab === value ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab === value && (
              <motion.span
                layoutId={`${id}-indicator`}
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-foreground"
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>
      <div id={`${id}-cli`} role="tabpanel" hidden={tab !== "cli"}>
        {cli}
      </div>
      <div id={`${id}-manual`} role="tabpanel" hidden={tab !== "manual"}>
        {manual}
      </div>
    </div>
  );
}

export function CollapsibleSource({
  title,
  code,
  html,
}: {
  title: string;
  code: string;
  html: string;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const lines = code.split("\n").length;
  const collapsible = lines > 18;

  return (
    <div className="relative">
      <CodeFrame
        title={title}
        lang="tsx"
        copyValue={code}
        className="my-3"
        maxHeight={expanded || !collapsible ? 640 : 300}
      >
        <div className="line-numbers pr-10" dangerouslySetInnerHTML={{ __html: html }} />
      </CodeFrame>
      {collapsible && !expanded && (
        <div className="pointer-events-none absolute inset-x-px bottom-px flex h-24 items-end justify-center rounded-b-xl bg-gradient-to-t from-[var(--code-bg)] via-[var(--code-bg)]/80 to-transparent pb-4">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="pointer-events-auto rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-secondary-foreground shadow-sm hover:bg-accent"
          >
            Expand {lines} lines
          </button>
        </div>
      )}
    </div>
  );
}
