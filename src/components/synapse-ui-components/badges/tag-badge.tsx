"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const tagBadgeVariants = cva(
  "inline-flex w-fit items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-all duration-200",
  {
    variants: {
      color: {
        gray: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        red: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400",
        orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400",
        amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
        green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
        teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-400",
        blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
        indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400",
        purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
        pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-400",
      },
      state: {
        default: "",
        hover: "shadow-sm",
        active: "scale-95",
        disabled: "opacity-40 cursor-not-allowed",
      },
    },
    defaultVariants: {
      color: "gray",
      state: "default",
    },
  },
);

interface TagBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagBadgeVariants> {
  removable?: boolean;
  onRemove?: () => void;
}

function TagBadge({
  className,
  color,
  state,
  removable,
  onRemove,
  children,
  ...props
}: TagBadgeProps) {
  return (
    <span className={cn(tagBadgeVariants({ color, state }), className)} {...props}>
      <span className="leading-none">{children}</span>
      {removable && state !== "disabled" && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 -mr-1 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-current"
          aria-label="Remove tag"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}

export { TagBadge, tagBadgeVariants };
