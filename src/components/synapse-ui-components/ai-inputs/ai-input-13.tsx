"use client";

import * as React from "react";

import {
  Zap,
  ArrowUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface AIInput14Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput14({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Quick question...",
  disabled = false,
  className,
}: AIInput14Props) {
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
    <div className={cn("mx-auto max-w-md", className)}>
      <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-2 py-1.5 shadow-sm">
        <Zap className="size-3.5 text-muted-foreground" />

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
          className="flex-1 bg-transparent text-xs outline-none"
        />

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleSubmit}
        >
          <ArrowUp className="size-3" />
        </Button>
      </div>
    </div>
  );
}