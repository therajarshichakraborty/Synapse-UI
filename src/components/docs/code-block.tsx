"use client";

import * as React from "react";
import { FileCodeIcon, TerminalIcon } from "lucide-react";
import { CopyButton } from "@/components/docs/copy-button";
import { cn } from "@/lib/utils";

const LANG_LABEL: Record<string, string> = {
  tsx: "TSX",
  ts: "TS",
  jsx: "JSX",
  js: "JS",
  css: "CSS",
  json: "JSON",
  bash: "Terminal",
  sh: "Terminal",
  mdx: "MDX",
  html: "HTML",
};

/**
 * Frame used for every code block: one clean white (or near-black) surface,
 * a hairline border, optional file header and a copy button. No nested fills.
 */
export function CodeFrame({
  title,
  lang,
  children,
  className,
  copyValue,
  maxHeight,
  lineNumbers = false,
}: {
  title?: string;
  lang?: string;
  children: React.ReactNode;
  className?: string;
  copyValue?: string;
  maxHeight?: number;
  lineNumbers?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const terminal = lang === "bash" || lang === "sh";
  const Icon = terminal ? TerminalIcon : FileCodeIcon;
  const getValue = () => copyValue ?? ref.current?.innerText ?? "";

  return (
    <div
      className={cn(
        "group/code not-prose relative my-6 overflow-hidden rounded-2xl border border-border bg-[var(--code-bg)] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-[0_6px_24px_-12px_rgba(0,0,0,0.12)]",
        className,
      )}
    >
      {title ? (
        <div className="flex h-11 items-center gap-2 border-b border-border pr-2 pl-4 text-[13px] text-muted-foreground">
          <Icon className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate font-mono text-[12.5px] text-foreground/80">{title}</span>
          {lang && LANG_LABEL[lang] && (
            <span className="ml-auto rounded-md border border-border px-1.5 py-0.5 font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
              {LANG_LABEL[lang]}
            </span>
          )}
          <CopyButton className={lang && LANG_LABEL[lang] ? "" : "ml-auto"} getValue={getValue} />
        </div>
      ) : (
        <CopyButton
          className="absolute top-2.5 right-2.5 z-10 bg-[var(--code-bg)] opacity-0 shadow-sm ring-1 ring-border transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
          getValue={getValue}
        />
      )}
      <div
        ref={ref}
        style={maxHeight ? { maxHeight } : undefined}
        className={cn(
          "code-body overflow-auto py-3.5 font-mono text-[13px] leading-[1.7] scrollbar-thin [&_.line]:pr-12 [&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:p-0 [&_pre]:outline-none",
          lineNumbers && "line-numbers",
        )}
      >
        {children}
      </div>
    </div>
  );
}

const NUMBERED = new Set(["tsx", "ts", "jsx", "js", "css", "json", "mdx"]);

function countLines(node: React.ReactNode): number {
  let n = 0;
  React.Children.forEach(node, (child) => {
    if (React.isValidElement<{ className?: string; children?: React.ReactNode }>(child)) {
      if (
        typeof child.props.className === "string" &&
        child.props.className.split(" ").includes("line")
      )
        n++;
      else n += countLines(child.props.children);
    }
  });
  return n;
}

/** MDX `pre` replacement for fenced code blocks highlighted at build time. */
export function Pre({
  title,
  children,
  className,
  ...props
}: React.ComponentProps<"pre"> & { title?: string; "data-language"?: string }) {
  const lang = props["data-language"] ?? (className?.match(/language-(\w+)/)?.[1] || undefined);
  const lineNumbers = !!lang && NUMBERED.has(lang) && countLines(children) > 4;
  return (
    <CodeFrame title={title} lang={lang} lineNumbers={lineNumbers}>
      <pre className={className} {...props}>
        {children}
      </pre>
    </CodeFrame>
  );
}
