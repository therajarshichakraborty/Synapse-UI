"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const pillBadgeVariants = cva(
  "inline-flex w-fit items-center justify-center rounded-full font-medium transition-all duration-200",
  {
    variants: {
      size: {
        sm: "h-6 px-2.5 text-[11px] gap-1",
        md: "h-7 px-3 text-xs gap-1.5",
        lg: "h-8 px-4 text-sm gap-2",
      },
      variant: {
        primary: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
        secondary: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
        success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
        warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
        danger: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
        info: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
      },
      state: {
        default: "",
        hover: "shadow-md -translate-y-0.5",
        active: "scale-95 shadow-none translate-y-0",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
      state: "default",
    },
  }
)

interface PillBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillBadgeVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function PillBadge({
  className,
  size,
  variant,
  state,
  leftIcon,
  rightIcon,
  children,
  ...props
}: PillBadgeProps) {
  return (
    <span
      className={cn(pillBadgeVariants({ size, variant, state }), className)}
      {...props}
    >
      {leftIcon && <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{rightIcon}</span>}
    </span>
  )
}

export { PillBadge, pillBadgeVariants }
