import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Pre } from "@/components/docs/code-block";
import { HeadingAnchor } from "@/components/docs/heading-anchor";
import { PmCommand } from "@/components/docs/pm-command";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentInstall, ComponentSource } from "@/components/docs/component-install";
import {
  Callout,
  ComponentsGrid,
  KeyboardTable,
  PropsTable,
  Step,
  Steps,
} from "@/components/docs/mdx-parts";

function heading(Tag: "h2" | "h3" | "h4", base: string) {
  function Heading({ className, id, children, ...props }: ComponentProps<"h2">) {
    return (
      <Tag id={id} className={cn("group scroll-mt-8", base, className)} {...props}>
        {children}
        {id && <HeadingAnchor id={id} />}
      </Tag>
    );
  }
  Heading.displayName = Tag;
  return Heading;
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }: ComponentProps<"h1">) => (
      <h1 className={cn("mt-2 scroll-mt-8 text-h2 font-semibold", className)} {...props} />
    ),
    h2: heading("h2", "mt-14 mb-4 text-h3 font-semibold first:mt-0"),
    h3: heading("h3", "mt-9 mb-3 text-h4 font-semibold"),
    h4: heading("h4", "mt-7 mb-2 text-base font-semibold"),
    p: ({ className, ...props }: ComponentProps<"p">) => (
      <p
        className={cn("my-4 leading-7 text-muted-foreground [&:not(:first-child)]:mt-4", className)}
        {...props}
      />
    ),
    a: ({ className, href = "", ...props }: ComponentProps<"a">) => {
      const cls = cn(
        "font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-foreground",
        className,
      );
      return href.startsWith("/") || href.startsWith("#") ? (
        <Link href={href} className={cls} {...props} />
      ) : (
        <a href={href} className={cls} target="_blank" rel="noreferrer" {...props} />
      );
    },
    strong: ({ className, ...props }: ComponentProps<"strong">) => (
      <strong className={cn("font-semibold text-foreground", className)} {...props} />
    ),
    code: ({ className, ...props }: ComponentProps<"code">) => {
      // Shiki block code has line <span> children; inline code is a plain string.
      const isBlock =
        (typeof className === "string" && /language-|shiki/.test(className)) ||
        (props.children != null && typeof props.children !== "string");
      if (isBlock) return <code className={className} {...props} />;
      return (
        <code
          className={cn(
            "rounded-md bg-muted px-[0.4em] py-[0.15em] font-mono text-[0.85em] font-medium text-foreground",
            className,
          )}
          {...props}
        />
      );
    },
    pre: Pre,
    ul: ({ className, ...props }: ComponentProps<"ul">) => (
      <ul
        className={cn(
          "my-4 ml-1 space-y-2 text-muted-foreground [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:top-[0.7em] [&>li]:before:left-1 [&>li]:before:size-1.5 [&>li]:before:rounded-full [&>li]:before:bg-muted-foreground/50 [&>li]:before:content-['']",
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }: ComponentProps<"ol">) => (
      <ol
        className={cn(
          "my-4 ml-5 list-decimal space-y-2 text-muted-foreground marker:text-muted-foreground",
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }: ComponentProps<"li">) => (
      <li className={cn("leading-7", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: ComponentProps<"blockquote">) => (
      <blockquote
        className={cn(
          "my-6 border-l-2 border-border-strong pl-4 text-muted-foreground italic",
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }: ComponentProps<"hr">) => (
      <hr className={cn("my-12 border-border", className)} {...props} />
    ),
    table: ({ className, ...props }: ComponentProps<"table">) => (
      <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border scrollbar-thin">
        <table className={cn("w-full min-w-[520px] text-left text-sm", className)} {...props} />
      </div>
    ),
    thead: ({ className, ...props }: ComponentProps<"thead">) => (
      <thead className={cn("border-b border-border bg-surface-1", className)} {...props} />
    ),
    tbody: ({ className, ...props }: ComponentProps<"tbody">) => (
      <tbody className={cn("divide-y divide-border", className)} {...props} />
    ),
    tr: ({ className, ...props }: ComponentProps<"tr">) => (
      <tr className={cn("transition-colors hover:bg-surface-1/60", className)} {...props} />
    ),
    th: ({ className, ...props }: ComponentProps<"th">) => (
      <th
        className={cn("px-4 py-3 text-[13px] font-medium text-foreground", className)}
        {...props}
      />
    ),
    td: ({ className, ...props }: ComponentProps<"td">) => (
      <td
        className={cn(
          "px-4 py-3.5 align-top leading-6 text-muted-foreground [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-foreground [&:first-child_code]:bg-transparent [&:first-child_code]:px-0 [&:first-child_code]:text-[13px] [&:first-child_code]:font-medium",
          className,
        )}
        {...props}
      />
    ),
    img: ({ className, alt = "", ...props }: ComponentProps<"img">) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={cn("rounded-xl border border-border", className)} alt={alt} {...props} />
    ),

    ComponentPreview,
    ComponentInstall,
    ComponentSource,
    ComponentsGrid,
    PmCommand,
    Callout,
    Steps,
    Step,
    PropsTable,
    KeyboardTable,

    ...(components ?? {}),
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
