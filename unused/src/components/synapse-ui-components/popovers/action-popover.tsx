"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ActionPopoverProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  variant?: "default" | "danger";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export function ActionPopover({
  children,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "default",
  side = "top",
  className,
}: ActionPopoverProps) {
  const [open, setOpen] = React.useState(false);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          sideOffset={8}
          align="center"
          className={cn(
            "z-50 w-72 rounded-xl border border-border bg-card p-4 shadow-xl",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-card-foreground">{title}</h4>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleCancel}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              onClick={handleConfirm}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                variant === "danger"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              {confirmLabel}
            </button>
          </div>
          <PopoverPrimitive.Arrow className="fill-card stroke-border" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
