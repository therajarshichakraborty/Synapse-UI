"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CodeFile = { name: string; code: string; language?: string };

export type CodeBlockProps = {
  files: CodeFile[];
  className?: string;
  /** 1-based line numbers to highlight in every file. */
  highlight?: number[];
  showLineNumbers?: boolean;
};

const TOKEN =
  /(\/\/.*$|"[^"]*"|'[^']*'|`[^`]*`|\b(?:import|from|export|default|function|return|const|let|await|async|type|interface|extends)\b|<\/?[A-Z][\w.]*|\b\d+\b)/gm;

function tokenize(line: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    const t = m[0];
    const i = m.index ?? 0;
    if (i > last) out.push(line.slice(last, i));
    const cls = t.startsWith("//")
      ? "text-muted-foreground italic"
      : /^["'`]/.test(t)
        ? "text-[#0a3069] dark:text-[#a5d6ff]"
        : t.startsWith("<")
          ? "text-[#116329] dark:text-[#7ee787]"
          : /^\d/.test(t)
            ? "text-[#0550ae] dark:text-[#79c0ff]"
            : "text-[#cf222e] dark:text-[#ff7b72]";
    out.push(
      <span key={i} className={cls}>
        {t}
      </span>,
    );
    last = i + t.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

/** A self-contained code window with file tabs, lightweight highlighting and a copy button. */
export function CodeBlock({
  files,
  className,
  highlight = [],
  showLineNumbers = true,
}: CodeBlockProps) {
  const [active, setActive] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const file = files[active];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-[var(--code-bg)]",
        className,
      )}
    >
      <div
        className="flex h-10 items-center border-b border-border pr-2"
        role="tablist"
        aria-label="Files"
      >
        {files.map((f, i) => (
          <button
            key={f.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-full px-4 font-mono text-xs transition-colors outline-none focus-visible:bg-accent",
              i === active
                ? "text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {f.name}
          </button>
        ))}
        <button
          type="button"
          aria-label={copied ? "Copied" : "Copy code"}
          onClick={async () => {
            await navigator.clipboard.writeText(file.code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          }}
          className="ml-auto flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          {copied ? (
            <CheckIcon className="size-3.5 text-success" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </button>
      </div>
      <pre className="overflow-x-auto py-3 font-mono text-[13px] leading-6 scrollbar-thin">
        <code className="grid">
          {file.code.split("\n").map((line, i) => (
            <span
              key={i}
              className={cn(
                "border-l-2 border-transparent px-4",
                highlight.includes(i + 1) && "border-primary bg-[var(--code-highlight)]",
              )}
            >
              {showLineNumbers && (
                <span className="mr-4 inline-block w-5 text-right text-muted-foreground/50 select-none">
                  {i + 1}
                </span>
              )}
              {tokenize(line)}
              {line === "" ? " " : null}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
