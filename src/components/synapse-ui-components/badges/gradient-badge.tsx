"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gradientBadgeVariants = cva(
  "inline-flex w-fit items-center justify-center rounded-md px-3 py-1 text-xs font-semibold text-white transition-all duration-300",
  {
    variants: {
      gradient: {
        sunset: "bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500",
        ocean: "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500",
        forest: "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500",
        aurora: "bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500",
        gold: "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400",
        midnight: "bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900",
      },
      state: {
        default: "",
        hover: "shadow-lg scale-105",
        active: "scale-95 shadow-none",
        disabled: "opacity-40 cursor-not-allowed saturate-50",
      },
    },
    compoundVariants: [
      { gradient: "sunset", state: "hover", className: "shadow-rose-500/40" },
      { gradient: "ocean", state: "hover", className: "shadow-blue-500/40" },
      { gradient: "forest", state: "hover", className: "shadow-emerald-500/40" },
      { gradient: "aurora", state: "hover", className: "shadow-purple-500/40" },
      { gradient: "gold", state: "hover", className: "shadow-amber-500/40" },
      { gradient: "midnight", state: "hover", className: "shadow-slate-500/40" },
    ],
    defaultVariants: {
      gradient: "sunset",
      state: "default",
    },
  }
)

interface GradientBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientBadgeVariants> {
  shimmer?: boolean
}

function GradientBadge({ className, gradient, state, shimmer = false, children, ...props }: GradientBadgeProps) {
  return (
    <span
      className={cn(
        gradientBadgeVariants({ gradient, state }),
        shimmer && state !== "disabled" && "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {shimmer && state !== "disabled" && (
        <>
          <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <style>{`
            @keyframes shimmer {
              100% {
                transform: translateX(100%);
              }
            }
          `}</style>
        </>
      )}
      <span className="relative">{children}</span>
    </span>
  )
}

export { GradientBadge, gradientBadgeVariants }
