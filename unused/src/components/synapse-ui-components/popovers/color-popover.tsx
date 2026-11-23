"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { Check, Pipette } from "lucide-react";

const presetColors = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#64748b",
  "#1e293b",
  "#000000",
];

interface ColorPopoverProps {
  children: React.ReactNode;
  value?: string;
  onChange?: (color: string) => void;
  showInput?: boolean;
  showPresets?: boolean;
  presets?: string[];
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export function ColorPopover({
  children,
  value = "#3b82f6",
  onChange,
  showInput = true,
  showPresets = true,
  presets = presetColors,
  side = "bottom",
  className,
}: ColorPopoverProps) {
  const [color, setColor] = React.useState(value);
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    setColor(value);
    setInputValue(value);
  }, [value]);

  const handleColorSelect = (newColor: string) => {
    setColor(newColor);
    setInputValue(newColor);
    onChange?.(newColor);
  };

  const _handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      setColor(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          sideOffset={8}
          align="start"
          className={cn(
            "z-50 w-64 rounded-xl border border-border bg-card p-3 shadow-xl",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
        >
          {/* Color preview */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="h-10 w-10 rounded-lg border border-border shadow-sm"
              style={{ backgroundColor: color }}
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-card-foreground">Selected Color</div>
              <div className="text-xs text-muted-foreground font-mono">{color.toUpperCase()}</div>
            </div>
          </div>

          {/* Color input */}
          {showInput && (
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  #
                </span>
                <input
                  type="text"
                  value={inputValue.replace("#", "")}
                  onChange={(e) => {
                    const newValue = `#${e.target.value}`;
                    setInputValue(newValue);
                    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
                      setColor(newValue);
                      onChange?.(newValue);
                    }
                  }}
                  className="w-full rounded-lg border border-input bg-background pl-7 pr-3 py-2 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              <label className="relative cursor-pointer">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorSelect(e.target.value)}
                  className="sr-only"
                />
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-background hover:bg-muted transition-colors">
                  <Pipette className="h-4 w-4 text-muted-foreground" />
                </div>
              </label>
            </div>
          )}

          {/* Preset colors */}
          {showPresets && (
            <div className="grid grid-cols-10 gap-1">
              {presets.map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => handleColorSelect(presetColor)}
                  className={cn(
                    "h-5 w-5 rounded-md border transition-all hover:scale-110",
                    color === presetColor
                      ? "border-foreground ring-2 ring-foreground ring-offset-2 ring-offset-card"
                      : "border-transparent",
                  )}
                  style={{ backgroundColor: presetColor }}
                >
                  {color === presetColor && (
                    <Check className="h-3 w-3 text-white mx-auto drop-shadow-sm" />
                  )}
                </button>
              ))}
            </div>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
