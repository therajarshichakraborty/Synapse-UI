import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface DocsBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Minimal breadcrumb trail shown above the page title.
 */
export function DocsBreadcrumb({ items, className }: DocsBreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1.5 mb-4", className)}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3 w-3 text-zinc-400 dark:text-zinc-600" />}
          {item.url && i < items.length - 1 ? (
            <Link
              href={item.url}
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              {item.name}
            </Link>
          ) : (
            <span
              className={cn(
                "text-xs",
                i === items.length - 1 ? "text-zinc-800 dark:text-zinc-200 font-medium" : "text-zinc-500 dark:text-zinc-400"
              )}
            >
              {item.name}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
