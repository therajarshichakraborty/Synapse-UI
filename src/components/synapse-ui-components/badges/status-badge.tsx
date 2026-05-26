"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200",
  {
    variants: {
      status: {
        online: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
        offline: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
        busy: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
        away: "bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
        error: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
      },
      state: {
        default: "",
        hover: "ring-2 ring-offset-1",
        active: "scale-95",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    compoundVariants: [
      { status: "online", state: "hover", className: "ring-emerald-200 dark:ring-emerald-800" },
      { status: "offline", state: "hover", className: "ring-zinc-200 dark:ring-zinc-700" },
      { status: "busy", state: "hover", className: "ring-amber-200 dark:ring-amber-800" },
      { status: "away", state: "hover", className: "ring-orange-200 dark:ring-orange-800" },
      { status: "error", state: "hover", className: "ring-red-200 dark:ring-red-800" },
    ],
    defaultVariants: {
      status: "online",
      state: "default",
    },
  }
)

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  pulse?: boolean
}

function StatusBadge({ className, status, state, pulse = true, children, ...props }: StatusBadgeProps) {
  const dotColors = {
    online: "bg-emerald-500",
    offline: "bg-zinc-400",
    busy: "bg-amber-500",
    away: "bg-orange-500",
    error: "bg-red-500",
  }

  return (
    <span
      className={cn(statusBadgeVariants({ status, state }), className)}
      {...props}
    >
      <span className="relative flex h-2 w-2">
        {pulse && status !== "offline" && state !== "disabled" && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dotColors[status || "online"]
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            dotColors[status || "online"]
          )}
        />
      </span>
      {children}
    </span>
  )
}

export { StatusBadge, statusBadgeVariants }
