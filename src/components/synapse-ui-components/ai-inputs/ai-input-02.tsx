"use client";

import * as React from "react";

import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface AIInput03Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput03({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Type a message...",
  disabled = false,
  className,
}: AIInput03Props) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;

    onSubmit?.(value);

    setValue("");
  };

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border border-input bg-background px-4 py-2",
          "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/20",
          "shadow-sm",
          disabled && "opacity-50"
        )}
      >
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
          className="flex-1 bg-transparent text-sm outline-none"
        />

        <Button
          type="button"
          variant={
            value.trim() ? "default" : "ghost"
          }
          size="icon-sm"
          disabled={!value.trim()}
          onClick={handleSubmit}
          className="rounded-full"
        >
          <ArrowUp className="size-4" />
        </Button>
      </div>
    </div>
  );
}