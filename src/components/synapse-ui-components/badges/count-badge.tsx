"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const countBadgeVariants = cva(
  "inline-flex w-fit items-center justify-center font-mono font-semibold tabular-nums transition-all duration-200",
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 text-[10px] px-1.5 rounded",
        md: "h-6 min-w-6 text-xs px-2 rounded-md",
        lg: "h-7 min-w-7 text-sm px-2.5 rounded-md",
      },
      variant: {
        filled: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
        subtle: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        ghost:
          "bg-transparent text-zinc-600 border border-zinc-200 dark:border-zinc-700 dark:text-zinc-400",
      },
      state: {
        default: "",
        hover: "ring-2 ring-zinc-300 dark:ring-zinc-600",
        active: "scale-95",
        disabled: "opacity-40 cursor-not-allowed",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "filled",
      state: "default",
    },
  },
);

interface CountBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof countBadgeVariants> {
  count?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
}

function CountBadge({
  className,
  size,
  variant,
  state,
  count = 0,
  max = 999,
  prefix,
  suffix,
  ...props
}: CountBadgeProps) {
  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <span className={cn(countBadgeVariants({ size, variant, state }), className)} {...props}>
      {prefix}
      {displayCount}
      {suffix}
    </span>
  );
}

export { CountBadge, countBadgeVariants };
