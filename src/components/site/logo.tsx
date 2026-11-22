import Link from "next/link";
import { cn } from "@/lib/utils";

/** Monochrome mark: follows the current theme (light tile on dark, dark tile on light). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-6 shrink-0", className)}>
      <rect width="32" height="32" rx="8" className="fill-foreground" />
      <path
        d="M20.5 10.5c-1-1-2.6-1.5-4.4-1.5-3 0-5 1.5-5 3.7 0 4.9 9.4 2.7 9.4 7 0 2.1-2 3.8-5.1 3.8-2 0-3.8-.7-4.9-1.9"
        fill="none"
        className="stroke-background"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Synapse UI home"
      className={cn(
        "flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight">Synapse UI</span>
    </Link>
  );
}
