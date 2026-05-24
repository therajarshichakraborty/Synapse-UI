"use client";

import { useState, useEffect } from "react";
import {
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
} from "fumadocs-ui/components/codeblock";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { cn } from "@/lib/utils";

import type { DemoEntry } from "./registry";

interface ComponentDemoProps {
  demo: DemoEntry;
  className?: string;
}

export function ComponentDemo({ demo, className }: ComponentDemoProps) {
  const Component = demo.component;
  const [origin, setOrigin] = useState("https://synapse-ui.vercel.app");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Determine registry ID (map categories/names appropriately if needed, but demo.id matches registry name)
  const registryId = demo.id;
  const cliCommand = `npx shadcn@latest add ${origin}/r/${registryId}.json`;

  return (
    <figure className={cn("not-prose my-8", className)}>
      <figcaption className="mb-3 text-sm font-medium text-fd-foreground">{demo.title}</figcaption>
      <CodeBlockTabs defaultValue="preview">
        <CodeBlockTabsList>
          <CodeBlockTabsTrigger value="preview">Preview</CodeBlockTabsTrigger>
          <CodeBlockTabsTrigger value="cli">CLI</CodeBlockTabsTrigger>
          <CodeBlockTabsTrigger value="code">Code</CodeBlockTabsTrigger>
        </CodeBlockTabsList>
        <CodeBlockTab value="preview">
          <div className="w-full overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50/20 dark:bg-white/[0.01]">
            <div
              className={cn(
                "flex items-center justify-center p-6 mx-auto",
                demo.previewClassName ?? "min-h-[120px]",
              )}
            >
              <div
                className={cn(
                  "w-full flex justify-center",
                  registryId.startsWith("block-") &&
                    registryId !== "block-ai-card-generation" &&
                    (registryId === "block-saas-landing" ||
                    registryId === "block-landing-hero" ||
                    registryId === "block-landing-showcase"
                      ? "min-w-[950px] shrink-0"
                      : "min-w-[850px] shrink-0"),
                )}
              >
                <Component {...(demo.props ?? {})} />
              </div>
            </div>
          </div>
        </CodeBlockTab>
        <CodeBlockTab value="cli">
          <DynamicCodeBlock lang="bash" code={cliCommand} />
        </CodeBlockTab>
        <CodeBlockTab value="code">
          <DynamicCodeBlock lang="tsx" code={demo.code} />
        </CodeBlockTab>
      </CodeBlockTabs>
    </figure>
  );
}
