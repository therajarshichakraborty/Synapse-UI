"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

interface HotkeyTooltipProps {
  children: React.ReactNode
  content?: string
  keys?: string | string[]
  label?: string
  hotkey?: string | string[]
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function HotkeyTooltip({
  children,
  content,
  keys,
  label,
  hotkey,
  side = "top",
  className,
}: HotkeyTooltipProps) {
  const displayLabel = content || label || ""
  const rawKeys = keys || hotkey || []
  const parsedKeys = Array.isArray(rawKeys) ? rawKeys : [rawKeys]

  return (
    <TooltipPrimitive.Provider delayDuration={400}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            className={cn(
              "z-50 flex items-center gap-3 rounded-lg bg-foreground px-3 py-2 text-background shadow-lg",
              "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              className
            )}
          >
            <span className="text-sm font-medium">{displayLabel}</span>
            <div className="flex items-center gap-1">
              {parsedKeys.map((key, index) => (
                <React.Fragment key={index}>
                  <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded bg-background/20 px-1.5 font-mono text-[10px] font-medium text-background/90">
                    {key}
                  </kbd>
                  {index < parsedKeys.length - 1 && (
                    <span className="text-background/50 text-xs">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

interface KeyboardShortcutProps {
  keys: string[]
  className?: string
}

export function KeyboardShortcut({ keys, className }: KeyboardShortcutProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
            {key}
          </kbd>
          {index < keys.length - 1 && (
            <span className="text-muted-foreground/50 text-xs">+</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
