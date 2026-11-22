"use client";

import * as React from "react";
import { motion } from "motion/react";
import { CodeFrame } from "@/components/docs/code-block";
import { PmCommand } from "@/components/docs/pm-command";
import { cn } from "@/lib/utils";
import type { DemoEntry } from "./registry";

type Tab = "preview" | "cli" | "code";

function useClientHighlight(code: string, enabled: boolean) {
  const [html, setHtml] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!enabled || html) return;
    let cancelled = false;
    import("shiki").then(async (shiki) => {
      const out = await shiki.codeToHtml(code, {
        lang: "tsx",
        themes: { light: "github-light-default", dark: "github-dark-default" },
        defaultColor: false,
      });
      if (!cancelled) setHtml(out);
    });
    return () => {
      cancelled = true;
    };
  }, [code, enabled, html]);
  return html;
}

/** Live demo frame used by the variant collections (Preview / CLI / Code). */
export function ComponentDemo({ demo, className }: { demo: DemoEntry; className?: string }) {
  const Component = demo.component;
  const [tab, setTab] = React.useState<Tab>("preview");
  const html = useClientHighlight(demo.code, tab === "code");
  const id = React.useId();
  const isWideBlock = demo.id.startsWith("block-") && demo.id !== "block-ai-card-generation";

  return (
    <figure className={cn("not-prose my-10", className)}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <figcaption className="text-sm font-medium text-foreground">{demo.title}</figcaption>
        <div role="tablist" className="flex items-center gap-1">
          {(["preview", "cli", "code"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "relative rounded-md px-2.5 py-1 text-xs font-medium uppercase tracking-wide outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab === t && (
                <motion.span
                  layoutId={`${id}-tab`}
                  className="absolute inset-0 rounded-md border border-border bg-surface-2"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      </div>

      {tab === "preview" && (
        <div className="relative isolate overflow-x-auto rounded-xl border border-border bg-background scrollbar-thin">
          <div
            className={cn(
              "mx-auto flex items-center justify-center p-6",
              demo.previewClassName ?? "min-h-[160px]",
            )}
          >
            <div
              className={cn("flex w-full justify-center", isWideBlock && "min-w-[900px] shrink-0")}
            >
              <Component {...(demo.props ?? {})} />
            </div>
          </div>
        </div>
      )}
      {tab === "cli" && <PmCommand dlx={`synapse-ui@latest add ${demo.id}`} className="my-0" />}
      {tab === "code" && (
        <CodeFrame
          title={`${demo.id}.tsx`}
          lang="tsx"
          copyValue={demo.code}
          className="my-0"
          maxHeight={560}
        >
          {html ? (
            <div dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <pre className="px-4 text-muted-foreground">{demo.code}</pre>
          )}
        </CodeFrame>
      )}
    </figure>
  );
}
