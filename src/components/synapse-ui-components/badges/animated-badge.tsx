"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const animatedBadgeVariants = cva(
  "inline-flex w-fit items-center justify-center rounded-md px-3 py-1 text-xs font-semibold transition-all duration-300",
  {
    variants: {
      variant: {
        glow: "relative bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
        pulse: "bg-blue-500 text-white",
        bounce: "bg-emerald-500 text-white",
        shake: "bg-red-500 text-white",
        border: "bg-transparent border-2 border-zinc-300 text-zinc-700 dark:border-zinc-600 dark:text-zinc-300",
      },
      state: {
        default: "",
        hover: "",
        active: "scale-90",
        disabled: "opacity-40 cursor-not-allowed",
      },
    },
    compoundVariants: [
      { variant: "glow", state: "hover", className: "shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)]" },
      { variant: "pulse", state: "hover", className: "animate-pulse" },
      { variant: "bounce", state: "hover", className: "animate-bounce" },
      { variant: "shake", state: "hover", className: "animate-[shake_0.5s_ease-in-out]" },
      { variant: "border", state: "hover", className: "border-zinc-900 dark:border-zinc-100" },
    ],
    defaultVariants: {
      variant: "glow",
      state: "default",
    },
  }
)

interface AnimatedBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof animatedBadgeVariants> {}

function AnimatedBadge({ className, variant, state, children, ...props }: AnimatedBadgeProps) {
  const needsStyles = variant === "glow" || variant === "shake";

  return (
    <span
      className={cn(
        animatedBadgeVariants({ variant, state }),
        variant === "glow" && state === "hover" && "before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-[shimmer_2s_infinite]",
        className
      )}
      {...props}
    >
      {needsStyles && (
        <style>{`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
        `}</style>
      )}
      {children}
    </span>
  )
}

export { AnimatedBadge, animatedBadgeVariants }
