import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertTriangleIcon,
  ArrowUpRightIcon,
  InfoIcon,
  LightbulbIcon,
  OctagonAlertIcon,
  CircleCheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { entryUrl, registry, type RegistryCategory } from "@/registry/registry";

/* ── Callout ───────────────────────────────────────────────────────────── */

const calloutStyles = {
  info: { Icon: InfoIcon, cls: "border-primary/25 bg-primary/[0.06] [&_svg]:text-primary" },
  tip: {
    Icon: LightbulbIcon,
    cls: "border-glow-cyan/25 bg-glow-cyan/[0.06] [&_svg]:text-glow-cyan",
  },
  warning: {
    Icon: AlertTriangleIcon,
    cls: "border-warning/30 bg-warning/[0.07] [&_svg]:text-warning",
  },
  danger: {
    Icon: OctagonAlertIcon,
    cls: "border-destructive/30 bg-destructive/[0.07] [&_svg]:text-destructive",
  },
  success: {
    Icon: CircleCheckIcon,
    cls: "border-success/30 bg-success/[0.07] [&_svg]:text-success",
  },
} as const;

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
}) {
  const { Icon, cls } = calloutStyles[type] ?? calloutStyles.info;
  return (
    <div
      role="note"
      className={cn("not-prose my-6 flex gap-3 rounded-xl border px-4 py-3.5 text-sm", cls)}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 leading-6 text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_code]:text-foreground [&_p]:m-0">
        {title && <p className="mb-0.5 font-medium text-foreground">{title}</p>}
        {children}
      </div>
    </div>
  );
}

/* ── Steps ─────────────────────────────────────────────────────────────── */

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="docs-steps relative mb-10 ml-3.5 border-l border-border pl-8 [counter-reset:step] [&>h3]:relative [&>h3]:mt-8 [&>h3]:[counter-increment:step] [&>h3]:before:absolute [&>h3]:before:-left-[2.85rem] [&>h3]:before:flex [&>h3]:before:size-7 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:border [&>h3]:before:border-border [&>h3]:before:bg-surface-2 [&>h3]:before:font-mono [&>h3]:before:text-xs [&>h3]:before:font-normal [&>h3]:before:text-muted-foreground [&>h3]:before:content-[counter(step)] [&>h3:first-child]:mt-0">
      {children}
    </div>
  );
}

export function Step({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <>
      <h3 className="text-base font-semibold">{title}</h3>
      {children}
    </>
  );
}

/* ── Props table ───────────────────────────────────────────────────────── */

export type PropRow = {
  prop: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
};

export function PropsTable({ props: rows, className }: { props: PropRow[]; className?: string }) {
  return (
    <div
      className={cn("not-prose my-5 overflow-hidden rounded-xl border border-border", className)}
    >
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-surface-1">
            <tr className="border-b border-border">
              <th
                scope="col"
                className="w-[24%] px-4 py-2.5 text-xs font-medium text-muted-foreground"
              >
                Prop
              </th>
              <th
                scope="col"
                className="w-[30%] px-4 py-2.5 text-xs font-medium text-muted-foreground"
              >
                Type
              </th>
              <th
                scope="col"
                className="w-[14%] px-4 py-2.5 text-xs font-medium text-muted-foreground"
              >
                Default
              </th>
              <th scope="col" className="px-4 py-2.5 text-xs font-medium text-muted-foreground">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.prop} className="border-b border-border last:border-0 align-top">
                <td className="px-4 py-3">
                  <code className="font-mono text-[12.5px] text-primary">
                    {row.prop}
                    {row.required && <span className="text-destructive">*</span>}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <code className="font-mono text-[12px] break-words text-foreground/90">
                    {row.type}
                  </code>
                </td>
                <td className="px-4 py-3">
                  {row.defaultValue ? (
                    <code className="font-mono text-[12px] text-muted-foreground">
                      {row.defaultValue}
                    </code>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="px-4 py-3 leading-6 text-muted-foreground">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Keyboard table ────────────────────────────────────────────────────── */

export function KeyboardTable({ keys }: { keys: [string, string][] }) {
  return (
    <div className="not-prose my-5 overflow-hidden rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-1">
          <tr className="border-b border-border">
            <th
              scope="col"
              className="w-[34%] px-4 py-2.5 text-xs font-medium text-muted-foreground"
            >
              Key
            </th>
            <th scope="col" className="px-4 py-2.5 text-xs font-medium text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {keys.map(([key, desc]) => (
            <tr key={key} className="border-b border-border last:border-0 align-top">
              <td className="px-4 py-3">
                <span className="flex flex-wrap gap-1">
                  {key.split(" + ").map((k) => (
                    <kbd
                      key={k}
                      className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-surface-2 px-1.5 font-mono text-[11px] text-foreground shadow-[inset_0_-1px_0_0_var(--border)]"
                    >
                      {k}
                    </kbd>
                  ))}
                </span>
              </td>
              <td className="px-4 py-3 leading-6 text-muted-foreground">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Components grid (overview pages) ──────────────────────────────────── */

export function ComponentsGrid({ category }: { category: RegistryCategory }) {
  const items = registry.filter((e) => e.category === category);
  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.name}
          href={entryUrl(item)}
          className="group relative flex flex-col rounded-xl border border-border bg-surface-1 p-4 shadow-[inset_0_1px_0_0_var(--highlight)] transition-colors hover:border-primary/40"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            {item.title}
            {item.isNew && (
              <span className="rounded-full border border-primary/30 bg-primary/10 px-1.5 text-[10px] leading-4 text-primary">
                New
              </span>
            )}
            <ArrowUpRightIcon className="ml-auto size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-muted-foreground">
            {item.description}
          </span>
        </Link>
      ))}
    </div>
  );
}
