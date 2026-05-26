"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const notificationBadgeVariants = cva(
  "inline-flex w-fit items-center justify-center font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        dot: "h-2.5 w-2.5 rounded-full p-0",
        count: "min-w-5 h-5 rounded-full px-1.5 text-[10px]",
        indicator: "min-w-4 h-4 rounded-full px-1 text-[9px]",
      },
      color: {
        red: "bg-red-500 text-white",
        blue: "bg-blue-500 text-white",
        green: "bg-emerald-500 text-white",
        amber: "bg-amber-500 text-white",
      },
      state: {
        default: "",
        hover: "scale-110 shadow-lg",
        active: "scale-90",
        disabled: "opacity-40 cursor-not-allowed",
      },
    },
    compoundVariants: [
      { color: "red", state: "hover", className: "shadow-red-500/40" },
      { color: "blue", state: "hover", className: "shadow-blue-500/40" },
      { color: "green", state: "hover", className: "shadow-emerald-500/40" },
      { color: "amber", state: "hover", className: "shadow-amber-500/40" },
    ],
    defaultVariants: {
      variant: "count",
      color: "red",
      state: "default",
    },
  }
)

interface NotificationBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof notificationBadgeVariants> {
  count?: number
  max?: number
  showZero?: boolean
}

const NotificationBadge = React.forwardRef<HTMLSpanElement, NotificationBadgeProps>(
  (
    {
      className,
      variant,
      color,
      state,
      count = 0,
      max = 99,
      showZero = false,
      ...props
    },
    ref
  ) => {
    const resolvedVariant = variant || "count"

    if (resolvedVariant !== "dot" && !showZero && count === 0) {
      return null
    }

    const displayCount =
      resolvedVariant === "dot"
        ? null
        : count > max
        ? `${max}+`
        : count

    return (
      <span
        ref={ref}
        className={cn(
          notificationBadgeVariants({ variant: resolvedVariant, color, state }),
          className
        )}
        {...props}
      >
        {displayCount}
      </span>
    )
  }
)

NotificationBadge.displayName = "NotificationBadge"

export { NotificationBadge, notificationBadgeVariants }
