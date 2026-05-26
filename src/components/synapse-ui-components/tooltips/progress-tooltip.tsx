"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

interface ProgressTooltipProps {
  children: React.ReactNode
  label: string
  value: number
  max?: number
  showPercentage?: boolean
  color?: "default" | "success" | "warning" | "error"
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

const colorMap = {
  default: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
}

export function ProgressTooltip({
  children,
  label,
  value,
  max = 100,
  showPercentage = true,
  color = "default",
  side = "top",
  className,
}: ProgressTooltipProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            className={cn(
              "z-50 w-48 rounded-lg bg-foreground p-3 text-background shadow-lg",
              "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              className
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{label}</span>
              {showPercentage && (
                <span className="text-xs text-background/70 font-mono">
                  {percentage.toFixed(0)}%
                </span>
              )}
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/20">
              <div
                className={cn("h-full rounded-full transition-all duration-300", colorMap[color])}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-background/60">
              <span>{value.toLocaleString()}</span>
              <span>{max.toLocaleString()}</span>
            </div>
            <TooltipPrimitive.Arrow className="fill-foreground h-1.5 w-3" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
