"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const multiColorBadgeVariants = cva(
  "inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        split: "",
        stacked: "flex-col gap-0.5 py-2",
      },
      state: {
        default: "",
        hover: "shadow-md -translate-y-0.5",
        active: "scale-95 shadow-none translate-y-0",
        disabled: "opacity-40 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "split",
      state: "default",
    },
  },
);

interface ColorSegment {
  label: string;
  color: "red" | "orange" | "amber" | "emerald" | "blue" | "violet" | "pink" | "zinc";
}

interface MultiColorBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof multiColorBadgeVariants> {
  segments?: ColorSegment[];
}

const colorClasses = {
  red: {
    bg: "bg-red-100 dark:bg-red-900/50",
    text: "text-red-700 dark:text-red-400",
    dot: "bg-red-500",
  },
  orange: {
    bg: "bg-orange-100 dark:bg-orange-900/50",
    text: "text-orange-700 dark:text-orange-400",
    dot: "bg-orange-500",
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-900/50",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-900/50",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/50",
    text: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  violet: {
    bg: "bg-blue-100 dark:bg-blue-900/50",
    text: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  pink: {
    bg: "bg-pink-100 dark:bg-pink-900/50",
    text: "text-pink-700 dark:text-pink-400",
    dot: "bg-pink-500",
  },
  zinc: {
    bg: "bg-zinc-100 dark:bg-zinc-800",
    text: "text-zinc-700 dark:text-zinc-300",
    dot: "bg-zinc-500",
  },
};

function MultiColorBadge({
  className,
  variant,
  state,
  segments = [],
  ...props
}: MultiColorBadgeProps) {
  if (variant === "stacked") {
    return (
      <span
        className={cn(
          multiColorBadgeVariants({ variant, state }),
          "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700",
          className,
        )}
        {...props}
      >
        {segments.map((segment, index) => (
          <span
            key={index}
            className={cn("inline-flex items-center gap-1.5", colorClasses[segment.color].text)}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", colorClasses[segment.color].dot)} />
            {segment.label}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700",
        state === "hover" && "shadow-md -translate-y-0.5",
        state === "active" && "scale-95 shadow-none translate-y-0",
        state === "disabled" && "opacity-40 cursor-not-allowed",
        "transition-all duration-200",
        className,
      )}
      {...props}
    >
      {segments.map((segment, index) => (
        <span
          key={index}
          className={cn(
            "px-2.5 py-1 text-xs font-medium",
            colorClasses[segment.color].bg,
            colorClasses[segment.color].text,
            index !== segments.length - 1 && "border-r border-zinc-200 dark:border-zinc-700",
          )}
        >
          {segment.label}
        </span>
      ))}
    </span>
  );
}

export { MultiColorBadge, multiColorBadgeVariants };
