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
  info: { Icon: InfoIcon, cls: "border-border bg-surface-1 [&_svg]:text-brand" },
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
      className={cn("not-prose my-6 flex gap-3 rounded-2xl border px-4 py-3.5 text-sm", cls)}
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

const chip =
  "inline-block rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] leading-5 text-foreground";

/** Splits a union type like `"a" | "b"` into separate chips so long unions wrap cleanly. */
function TypeChips({ type }: { type: string }) {
  const parts = type.split(/\s\|\s/);
  if (parts.length < 2) return <code className={chip}>{type}</code>;
  return (
    <span className="flex flex-wrap gap-1">
      {parts.map((p, i) => (
        <code key={`${p}-${i}`} className={chip}>
          {p}
        </code>
      ))}
    </span>
  );
}

export function PropsTable({ props: rows, className }: { props: PropRow[]; className?: string }) {
  if (!rows.length) return null;
  return (
    <div
      className={cn("not-prose my-6 overflow-hidden rounded-xl border border-border", className)}
    >
      {/* Desktop */}
      <table className="hidden w-full text-left text-sm md:table">
        <thead>
          <tr className="border-b border-border bg-surface-1">
            <th scope="col" className="w-[22%] px-4 py-3 text-[13px] font-medium">
              Prop
            </th>
            <th scope="col" className="w-[34%] px-4 py-3 text-[13px] font-medium">
              Type
            </th>
            <th scope="col" className="w-[14%] px-4 py-3 text-[13px] font-medium">
              Default
            </th>
            <th scope="col" className="px-4 py-3 text-[13px] font-medium">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.prop} className="align-top transition-colors hover:bg-surface-1/60">
              <td className="px-4 py-3.5">
                <code className="font-mono text-[13px] font-medium whitespace-nowrap text-foreground">
                  {row.prop}
                  {row.required && <span className="ml-0.5 text-destructive">*</span>}
                </code>
              </td>
              <td className="px-4 py-3.5">
                <TypeChips type={row.type} />
              </td>
              <td className="px-4 py-3.5">
                {row.defaultValue ? (
                  <code className={chip}>{row.defaultValue}</code>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="px-4 py-3.5 leading-6 text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile */}
      <dl className="divide-y divide-border md:hidden">
        {rows.map((row) => (
          <div key={row.prop} className="grid gap-2.5 p-4">
            <dt className="flex items-center justify-between gap-3">
              <code className="font-mono text-[13px] font-medium">
                {row.prop}
                {row.required && <span className="ml-0.5 text-destructive">*</span>}
              </code>
              {row.defaultValue && <code className={chip}>{row.defaultValue}</code>}
            </dt>
            <dd>
              <TypeChips type={row.type} />
            </dd>
            {row.description && (
              <dd className="text-sm leading-6 text-muted-foreground">{row.description}</dd>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ── Keyboard table ────────────────────────────────────────────────────── */

export function KeyboardTable({ keys }: { keys: [string, string][] }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-1">
            <th scope="col" className="w-[38%] px-4 py-3 text-[13px] font-medium">
              Key
            </th>
            <th scope="col" className="px-4 py-3 text-[13px] font-medium">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {keys.map(([key, desc]) => (
            <tr key={key} className="align-top transition-colors hover:bg-surface-1/60">
              <td className="px-4 py-3.5">
                <span className="flex flex-wrap items-center gap-1.5">
                  {key.split(" / ").map((alt, i) => (
                    <span key={alt} className="flex items-center gap-1">
                      {i > 0 && <span className="mr-0.5 text-xs text-muted-foreground">or</span>}
                      {alt.split(" + ").map((k, j) => (
                        <span key={k} className="flex items-center gap-1">
                          {j > 0 && <span className="text-xs text-muted-foreground">+</span>}
                          <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-background px-1.5 font-sans text-[12px] font-medium text-foreground shadow-[0_1px_0_0_var(--border)]">
                            {k}
                          </kbd>
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              </td>
              <td className="px-4 py-3.5 leading-6 text-muted-foreground">{desc}</td>
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
    <div className="not-prose my-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.name}
          href={entryUrl(item)}
          className="group relative flex flex-col rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent/40"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            {item.title}
            {item.isNew && (
              <span className="rounded-full bg-brand/10 px-1.5 text-[10px] leading-4 font-medium text-brand">
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
