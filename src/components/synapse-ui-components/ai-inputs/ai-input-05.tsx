"use client";

import * as React from "react";

import {
  Command,
  CornerDownLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface AIInput06Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput06({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Type a command...",
  disabled = false,
  className,
}: AIInput06Props) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const handleSubmit = () => {
    if (!value.trim()) return;

    onSubmit?.(value);

    setValue("");
  };

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-input bg-background shadow-lg",
          "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/20"
        )}
      >
        <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-3 py-2">
          <Command className="size-4 text-muted-foreground" />

          <span className="text-xs font-medium text-muted-foreground">
            Command Palette
          </span>

          <Badge
            variant="secondary"
            className="ml-auto"
          >
            AI Powered
          </Badge>
        </div>

        <div className="flex items-center gap-2 px-3 py-2">
          <span className="font-mono text-primary">
            ❯
          </span>

          <input
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                handleSubmit();
              }
            }}
            className="flex-1 bg-transparent font-mono text-sm outline-none"
          />

          <kbd className="hidden items-center gap-1 rounded border bg-muted px-1.5 py-1 font-mono text-[10px] sm:inline-flex">
            <CornerDownLeft className="size-3" />
          </kbd>
        </div>

        <div className="border-t border-border bg-muted/20 px-3 py-2">
          <div className="flex flex-wrap gap-1.5">
            {[
              "/help",
              "/new",
              "/clear",
              "/settings",
            ].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => setValue(cmd)}
                className="rounded border border-border bg-background px-2 py-0.5 text-xs font-mono hover:bg-accent"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}