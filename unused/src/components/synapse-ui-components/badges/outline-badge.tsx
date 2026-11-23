"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const outlineBadgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-md border-[1.5px] px-2.5 py-1 text-xs font-medium transition-all duration-200",
  {
    variants: {
      color: {
        neutral: "border-zinc-300 text-zinc-700 dark:border-zinc-600 dark:text-zinc-300",
        primary: "border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-400",
        success:
          "border-emerald-300 text-emerald-700 dark:border-emerald-600 dark:text-emerald-400",
        warning: "border-amber-300 text-amber-700 dark:border-amber-600 dark:text-amber-400",
        danger: "border-red-300 text-red-700 dark:border-red-600 dark:text-red-400",
        purple: "border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-400",
      },
      state: {
        default: "",
        hover: "shadow-sm",
        active: "scale-95",
        disabled: "opacity-40 cursor-not-allowed border-dashed",
      },
    },
    compoundVariants: [
      { color: "neutral", state: "hover", className: "bg-zinc-50 dark:bg-zinc-900/50" },
      { color: "primary", state: "hover", className: "bg-blue-50 dark:bg-blue-950/30" },
      { color: "success", state: "hover", className: "bg-emerald-50 dark:bg-emerald-950/30" },
      { color: "warning", state: "hover", className: "bg-amber-50 dark:bg-amber-950/30" },
      { color: "danger", state: "hover", className: "bg-red-50 dark:bg-red-950/30" },
      { color: "purple", state: "hover", className: "bg-blue-50 dark:bg-blue-950/30" },
    ],
    defaultVariants: {
      color: "neutral",
      state: "default",
    },
  },
);

interface OutlineBadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof outlineBadgeVariants> {
  icon?: React.ReactNode;
}

const OutlineBadge = React.forwardRef<HTMLSpanElement, OutlineBadgeProps>(
  ({ className, color, state, icon, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(outlineBadgeVariants({ color, state }), className)} {...props}>
        {icon && <span className="[&>svg]:h-3 [&>svg]:w-3">{icon}</span>}
        {children}
      </span>
    );
  },
);

OutlineBadge.displayName = "OutlineBadge";

export { OutlineBadge, outlineBadgeVariants };
