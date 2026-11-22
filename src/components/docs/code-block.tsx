"use client";

import * as React from "react";
import { FileCodeIcon, TerminalIcon } from "lucide-react";
import { CopyButton } from "@/components/docs/copy-button";
import { cn } from "@/lib/utils";

/** Frame used for every code block: optional file-name header, copy button, scroll area. */
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
  const Icon = lang === "bash" || lang === "sh" ? TerminalIcon : FileCodeIcon;
  const getValue = () => copyValue ?? ref.current?.innerText ?? "";

  return (
    <div
      className={cn(
        "group/code relative my-6 overflow-hidden rounded-xl border border-border bg-[var(--code-bg)]",
        className,
      )}
    >
      {title ? (
        <div className="flex h-11 items-center gap-2 border-b border-border bg-[var(--code-title)] pr-2 pl-4 text-[13px] text-muted-foreground">
          <Icon className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate font-mono text-foreground/80">{title}</span>
          <CopyButton className="ml-auto" getValue={getValue} />
        </div>
      ) : (
        <CopyButton
          className="absolute top-2.5 right-2.5 z-10 bg-[var(--code-bg)] opacity-0 transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
          getValue={getValue}
        />
      )}
      <div
        ref={ref}
        style={maxHeight ? { maxHeight } : undefined}
        className={cn(
          "overflow-auto py-4 font-mono text-[13px] leading-[1.7] scrollbar-thin [&_.line]:pr-12 [&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:p-0 [&_pre]:outline-none",
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
