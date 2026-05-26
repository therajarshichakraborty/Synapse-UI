"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import { Check, ChevronRight } from "lucide-react"

interface MenuItem {
  label: string
  icon?: React.ReactNode
  shortcut?: string
  disabled?: boolean
  checked?: boolean
  danger?: boolean
  onClick?: () => void
  children?: MenuItem[]
}

interface MenuPopoverProps {
  children: React.ReactNode
  items?: MenuItem[]
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  className?: string
}

function MenuItemComponent({ item, onSelect }: { item: MenuItem; onSelect: () => void }) {
  const handleClick = () => {
    if (!item.disabled && item.onClick) {
      item.onClick()
      onSelect()
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={item.disabled}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
        item.disabled
          ? "cursor-not-allowed opacity-50"
          : item.danger
          ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          : "text-foreground hover:bg-muted",
        item.checked && "bg-muted"
      )}
    >
      {item.checked !== undefined && (
        <span className="w-4">
          {item.checked && <Check className="h-3.5 w-3.5" />}
        </span>
      )}
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      <span className="flex-1 text-left">{item.label}</span>
      {item.shortcut && (
        <span className="ml-auto text-xs text-muted-foreground">
          {item.shortcut}
        </span>
      )}
      {item.children && <ChevronRight className="h-3.5 w-3.5 ml-auto" />}
    </button>
  )
}

export function MenuPopover({
  children,
  items = [],
  side = "bottom",
  align = "start",
  className,
}: MenuPopoverProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={4}
          className={cn(
            "z-50 min-w-48 rounded-xl border border-border bg-card p-1 shadow-xl",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
        >
          {items.map((item, index) => (
            <MenuItemComponent
              key={index}
              item={item}
              onSelect={() => setOpen(false)}
            />
          ))}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

interface MenuDividerProps {
  className?: string
}

export function MenuDivider({ className }: MenuDividerProps) {
  return <div className={cn("my-1 h-px bg-border", className)} />
}
