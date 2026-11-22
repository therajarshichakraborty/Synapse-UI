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
}: {
  title?: string;
  lang?: string;
  children: React.ReactNode;
  className?: string;
  copyValue?: string;
  maxHeight?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const Icon = lang === "bash" || lang === "sh" ? TerminalIcon : FileCodeIcon;

  return (
    <div
      className={cn(
        "group/code relative my-5 overflow-hidden rounded-xl border border-border bg-[var(--code-bg)] shadow-[inset_0_1px_0_0_var(--highlight)]",
        className,
      )}
    >
      {title ? (
        <div className="flex h-10 items-center gap-2 border-b border-border px-4 text-xs text-muted-foreground">
          <Icon className="size-3.5" aria-hidden="true" />
          <span className="truncate font-mono">{title}</span>
          <CopyButton
            className="ml-auto -mr-2"
            getValue={() => copyValue ?? ref.current?.innerText ?? ""}
          />
        </div>
      ) : (
        <CopyButton
          className="absolute top-2 right-2 z-10 bg-[var(--code-bg)]/80 opacity-0 backdrop-blur transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100"
          getValue={() => copyValue ?? ref.current?.innerText ?? ""}
        />
      )}
      <div
        ref={ref}
        style={maxHeight ? { maxHeight } : undefined}
        className="overflow-auto py-3.5 font-mono text-[13px] leading-6 scrollbar-thin [&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:p-0 [&_pre]:outline-none"
      >
        {children}
      </div>
    </div>
  );
}

/** MDX `pre` replacement for fenced code blocks highlighted at build time. */
export function Pre({
  title,
  children,
  className,
  ...props
}: React.ComponentProps<"pre"> & { title?: string; "data-language"?: string }) {
  const lang = props["data-language"] ?? (className?.match(/language-(\w+)/)?.[1] || undefined);
  return (
    <CodeFrame title={title} lang={lang}>
      <pre className={className} {...props}>
        {children}
      </pre>
    </CodeFrame>
  );
}
