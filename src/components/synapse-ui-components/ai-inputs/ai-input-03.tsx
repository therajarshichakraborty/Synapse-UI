"use client";

import * as React from "react";
import { ArrowUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";

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
  placeholder = "Search or ask anything...",
  disabled = false,
  className,
}: AIInput03Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSubmit?.(value);
    setValue("");
  };

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-full px-5 py-3",
          "border transition-all duration-300",
          isFocused
            ? "border-zinc-300 dark:border-zinc-600 shadow-[0_0_0_4px_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_4px_rgba(255,255,255,0.04)]"
            : "border-zinc-200 dark:border-zinc-800 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_-2px_rgba(0,0,0,0.4)]",
          "bg-white dark:bg-zinc-950",
          disabled && "opacity-50",
        )}
      >
        <Search
          className={cn(
            "size-4 shrink-0 transition-colors duration-200",
            isFocused ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-600",
          )}
        />
        <input
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className={cn(
            "flex-1 min-w-0 bg-transparent outline-none",
            "text-[15px] text-zinc-800 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "disabled:cursor-not-allowed",
          )}
        />

        {/* Animated send button */}
        <button
          type="button"
          disabled={!value.trim() || disabled}
          onClick={handleSubmit}
          className={cn(
            "flex items-center justify-center shrink-0",
            "size-8 rounded-full",
            "transition-all duration-200",
            value.trim()
              ? [
                  "bg-zinc-900 dark:bg-zinc-100",
                  "text-white dark:text-zinc-900",
                  "scale-100 opacity-100",
                  "hover:scale-110 active:scale-95",
                  "shadow-[0_1px_6px_rgba(0,0,0,0.2)]",
                ]
              : [
                  "bg-zinc-100 dark:bg-zinc-800",
                  "text-zinc-300 dark:text-zinc-600",
                  "scale-90 opacity-60",
                  "cursor-not-allowed",
                ],
          )}
        >
          <ArrowUp className="size-4" />
        </button>
      </div>
    </div>
  );
}
