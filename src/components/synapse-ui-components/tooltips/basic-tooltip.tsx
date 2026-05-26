"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const basicTooltipVariants = cva(
  "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        light: "bg-background text-foreground border border-border shadow-md",
        subtle: "bg-muted text-muted-foreground",
        contrast: "bg-primary text-primary-foreground",
      },
      size: {
        sm: "px-2 py-1 text-[10px]",
        default: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface BasicTooltipProps extends VariantProps<typeof basicTooltipVariants> {
  children: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  delayDuration?: number
  showArrow?: boolean
  className?: string
}

export function BasicTooltip({
  children,
  content,
  variant,
  size,
  side = "top",
  align = "center",
  delayDuration = 200,
  showArrow = true,
  className,
}: BasicTooltipProps) {
  const arrowClass = variant === "light" 
    ? "fill-background stroke-border" 
    : variant === "subtle"
    ? "fill-muted"
    : variant === "contrast"
    ? "fill-primary"
    : "fill-foreground"

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={4}
            className={cn(basicTooltipVariants({ variant, size }), className)}
          >
            {content}
            {showArrow && (
              <TooltipPrimitive.Arrow className={cn("h-1.5 w-3", arrowClass)} />
            )}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
