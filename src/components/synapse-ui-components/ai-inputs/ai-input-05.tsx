"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput05Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput05({
  value: controlledValue,
  onChange,
  onSubmit,
  label = "Your message",
  disabled = false,
  className,
}: AIInput05Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 64,
    maxHeight: 200,
  });

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSubmit?.(value);
    setValue("");
    adjustHeight(true);
  };

  const isActive = isFocused || value.length > 0;

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-2xl bg-white dark:bg-zinc-950",
          "transition-all duration-300",
          disabled && "opacity-50",
        )}
      >
        {/* Animated border */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl pointer-events-none",
            "border-2 transition-all duration-300",
            isFocused
              ? "border-zinc-900 dark:border-zinc-100"
              : "border-zinc-200 dark:border-zinc-800",
          )}
        />

        {/* Label */}
        <label
          className={cn(
            "absolute left-4 pointer-events-none z-10",
            "transition-all duration-200 ease-out",
            "text-zinc-500 dark:text-zinc-400",
            isActive
              ? [
                  "top-2.5 text-[11px] font-semibold tracking-wider uppercase",
                  isFocused
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-500 dark:text-zinc-400",
                ]
              : ["top-1/2 -translate-y-1/2 text-[15px]"],
          )}
        >
          {label}
        </label>

        <textarea
          ref={textareaRef}
          disabled={disabled}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            setValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          rows={1}
          className={cn(
            "w-full resize-none bg-transparent",
            "pr-14 outline-none border-none ring-0",
            "text-[15px] text-zinc-800 dark:text-zinc-100",
            "min-h-[64px] max-h-[200px]",
            "leading-relaxed transition-all duration-200",
            isActive ? "pt-7 pb-3 pl-4" : "py-5 pl-4",
          )}
        />

        <button
          type="button"
          disabled={!value.trim() || disabled}
          onClick={handleSubmit}
          className={cn(
            "absolute right-2.5 bottom-2.5",
            "flex items-center justify-center size-9 rounded-xl",
            "transition-all duration-200",
            value.trim()
              ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 active:scale-95"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
          )}
        >
          <ArrowUp className="size-4" />
        </button>
      </div>
    </div>
  );
}
