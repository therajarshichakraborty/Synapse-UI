"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gradientBadgeVariants = cva(
  "inline-flex w-fit items-center justify-center rounded-md px-3 py-1 text-xs font-semibold text-white transition-all duration-300",
  {
    variants: {
      gradient: {
        sunset: "bg-gradient-to-r from-sky-500 via-indigo-500 to-indigo-500",
        ocean: "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500",
        forest: "bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500",
        aurora: "bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500",
        gold: "bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400",
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
      { gradient: "sunset", state: "hover", className: "shadow-indigo-500/40" },
      { gradient: "ocean", state: "hover", className: "shadow-blue-500/40" },
      { gradient: "forest", state: "hover", className: "shadow-emerald-500/40" },
      { gradient: "aurora", state: "hover", className: "shadow-indigo-500/40" },
      { gradient: "gold", state: "hover", className: "shadow-amber-500/40" },
      { gradient: "midnight", state: "hover", className: "shadow-slate-500/40" },
    ],
    defaultVariants: {
      gradient: "sunset",
      state: "default",
    },
  },
);

interface GradientBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof gradientBadgeVariants> {
  shimmer?: boolean;
}

function GradientBadge({
  className,
  gradient,
  state,
  shimmer = false,
  children,
  ...props
}: GradientBadgeProps) {
  return (
    <span
      className={cn(
        gradientBadgeVariants({ gradient, state }),
        shimmer && state !== "disabled" && "relative overflow-hidden",
        className,
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
  );
}

export { GradientBadge, gradientBadgeVariants };
