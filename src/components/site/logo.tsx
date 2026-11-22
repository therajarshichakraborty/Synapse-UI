import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-6 shrink-0", className)}>
      <defs>
        <linearGradient
          id="synapse-logo"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#synapse-logo)" />
      <path
        d="M20.5 10.5c-1-1-2.6-1.5-4.4-1.5-3 0-5 1.5-5 3.7 0 4.9 9.4 2.7 9.4 7 0 2.1-2 3.8-5.1 3.8-2 0-3.8-.7-4.9-1.9"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="21.2" cy="10.6" r="1.6" fill="white" />
      <circle cx="10.6" cy="21.6" r="1.6" fill="white" />
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
