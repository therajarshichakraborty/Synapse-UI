"use client";

import * as React from "react";
import { ArrowUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className={cn("w-full max-w-xs mx-auto", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border px-3 py-2",
          "bg-white dark:bg-zinc-950",
          "transition-all duration-200",
          isFocused
            ? "border-zinc-300 dark:border-zinc-700 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_12px_-2px_rgba(0,0,0,0.4)]"
            : "border-zinc-200 dark:border-zinc-800 shadow-[0_1px_4px_-1px_rgba(0,0,0,0.06)]",
          disabled && "opacity-50",
        )}
      >
        <Zap
          className={cn(
            "size-3.5 shrink-0 transition-colors duration-200",
            isFocused ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-600",
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
            "flex-1 min-w-0 bg-transparent text-[13px] outline-none",
            "text-zinc-800 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "disabled:cursor-not-allowed",
          )}
        />
        <button
          type="button"
          disabled={!value.trim() || disabled}
          onClick={handleSubmit}
          className={cn(
            "flex items-center justify-center size-6 rounded-lg shrink-0",
            "transition-all duration-200",
            value.trim()
              ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 active:scale-90"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
          )}
        >
          <ArrowUp className="size-3" />
        </button>
      </div>
    </div>
  );
}
