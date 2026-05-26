"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface RichTooltipProps {
  children: React.ReactNode
  title?: string
  description?: string
  image?: string
  footer?: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
  showClose?: boolean
  onClose?: () => void
}

export function RichTooltip({
  children,
  title,
  description,
  image,
  footer,
  side = "top",
  className,
  showClose = false,
  onClose,
}: RichTooltipProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={8}
            className={cn(
              "z-50 w-72 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-xl",
              "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              className
            )}
          >
            {image && (
              <div className="relative h-32 w-full overflow-hidden">
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                {title && (
                  <h4 className="font-semibold leading-tight">{title}</h4>
                )}
                {showClose && (
                  <button
                    onClick={() => {
                      setOpen(false)
                      onClose?.()
                    }}
                    className="rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}
              {footer && (
                <div className="mt-3 pt-3 border-t border-border">{footer}</div>
              )}
            </div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
