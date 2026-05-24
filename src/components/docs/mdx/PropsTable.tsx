import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PropsTableRow {
  prop: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropsTableRow[];
  className?: string;
}

/**
 * Styled API documentation props table.
 * Usage in MDX: <PropsTable props={[{ prop: "className", type: "string", ... }]} />
 */
export function PropsTable({ props: rows, className }: PropsTableProps) {
  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-white/[0.07]",
        "bg-black/[0.01] dark:bg-white/[0.02] backdrop-blur-sm",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-white/[0.07] bg-zinc-50 dark:bg-white/[0.03]">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Prop
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Type
              </th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Default
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/80 dark:divide-white/[0.04]">
            {rows.map((row) => (
              <tr
                key={row.prop}
                className="group hover:bg-zinc-50 dark:hover:bg-white/[0.03] transition-colors"
              >
                <td className="px-4 py-3 font-mono">
                  <span className="flex items-center gap-1.5">
                    <code className="text-xs text-violet-600 dark:text-violet-300 bg-violet-500/5 dark:bg-violet-500/10 border border-violet-500/10 dark:border-violet-500/20 px-1.5 py-0.5 rounded-md">
                      {row.prop}
                    </code>
                    {row.required && (
                      <span className="text-[9px] text-rose-500 font-bold uppercase">*</span>
                    )}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono">
                  <code className="text-xs text-fuchsia-600 dark:text-fuchsia-300 bg-fuchsia-500/[0.04] dark:bg-fuchsia-500/[0.08] border border-fuchsia-500/10 dark:border-fuchsia-500/20 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                    {row.type}
                  </code>
                </td>
                <td className="hidden sm:table-cell px-4 py-3 font-mono">
                  {row.defaultValue ? (
                    <code className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-500/5 dark:bg-zinc-500/10 border border-zinc-500/10 dark:border-zinc-500/20 px-1.5 py-0.5 rounded-md">
                      {row.defaultValue}
                    </code>
                  ) : (
                    <span className="text-zinc-400 dark:text-zinc-600 text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
