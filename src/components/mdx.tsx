import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { ComponentShowcase } from "@/components/docs/component-showcase";
import { PremiumCodeBlock } from "@/components/docs/mdx/CodeBlock";
import { Callout } from "@/components/docs/mdx/Callout";
import { Steps, Step } from "@/components/docs/mdx/Steps";
import { PropsTable } from "@/components/docs/mdx/PropsTable";
import { cn } from "@/lib/utils";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    // ── Fumadocs defaults (tables, images, etc.) ──
    ...defaultMdxComponents,

    // ── Prose heading overrides ───────────────────
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className={cn(
          "mt-10 mb-4 scroll-mt-20 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50",
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className={cn(
          "mt-10 mb-3 scroll-mt-20 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-200",
          "border-b border-zinc-200/80 dark:border-white/[0.06] pb-2",
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className={cn(
          "mt-7 mb-2.5 scroll-mt-20 text-base font-semibold text-zinc-800 dark:text-zinc-300",
          className,
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4
        className={cn(
          "mt-5 mb-2 scroll-mt-20 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400",
          className,
        )}
        {...props}
      />
    ),

    // ── Prose body overrides ──────────────────────
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className={cn(
          "my-4 leading-7 text-zinc-600 dark:text-zinc-400 text-[0.9375rem]",
          className,
        )}
        {...props}
      />
    ),
    a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        className={cn(
          "font-medium text-zinc-900 dark:text-zinc-50 underline underline-offset-2 decoration-zinc-500/30 hover:decoration-zinc-500/60 transition-colors",
          className,
        )}
        {...props}
      />
    ),
    strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <strong
        className={cn("font-semibold text-zinc-900 dark:text-zinc-200", className)}
        {...props}
      />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
      // Inline code only — block code is handled by <pre>
      const isBlock = className?.includes("language-");
      if (isBlock) return <code className={className} {...props} />;
      return (
        <code
          className={cn(
            "relative rounded-md px-1.5 py-0.5 font-mono text-[0.85em]",
            "text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700",
            className,
          )}
          {...props}
        />
      );
    },
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
      <PremiumCodeBlock {...(props as Parameters<typeof PremiumCodeBlock>[0])} />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul
        className={cn(
          "my-4 ml-4 list-none space-y-2 text-zinc-600 dark:text-zinc-400 text-[0.9375rem]",
          "[&>li]:relative [&>li]:pl-4",
          "[&>li::before]:absolute [&>li::before]:left-0 [&>li::before]:top-2.5 [&>li::before]:h-1 [&>li::before]:w-1 [&>li::before]:rounded-full [&>li::before]:bg-zinc-400 dark:[&>li::before]:bg-zinc-650 [&>li::before]:content-['']",
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol
        className={cn(
          "my-4 ml-5 list-decimal space-y-2 text-zinc-600 dark:text-zinc-400 text-[0.9375rem]",
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li className={cn("leading-7", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className={cn(
          "my-6 border-l-2 border-zinc-300 dark:border-zinc-700 pl-4 italic",
          "text-zinc-600 dark:text-zinc-400",
          className,
        )}
        {...props}
      />
    ),
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/[0.07]">
        <table className={cn("w-full text-sm", className)} {...props} />
      </div>
    ),
    th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <th
        className={cn(
          "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500",
          "border-b border-zinc-200 dark:border-white/[0.07] bg-zinc-50 dark:bg-white/[0.03]",
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <td
        className={cn(
          "px-4 py-3 text-zinc-600 dark:text-zinc-400 border-b border-zinc-100 dark:border-white/[0.04]",
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
      <hr
        className={cn(
          "my-10 border-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/[0.08] to-transparent",
          className,
        )}
        {...props}
      />
    ),

    // ── Custom components ─────────────────────────
    ComponentShowcase,
    Callout,
    Steps,
    Step,
    PropsTable,

    // ── User overrides ────────────────────────────
    ...(components ?? {}),
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
