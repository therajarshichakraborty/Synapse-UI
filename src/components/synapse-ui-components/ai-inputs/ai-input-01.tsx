"use client";

import * as React from "react";
import { ArrowUp, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput01Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput01({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Ask anything...",
  disabled = false,
  className,
}: AIInput01Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 200,
  });

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSubmit?.(value);
    setValue("");
    adjustHeight(true);
  };

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      {/* Outer glow wrapper */}
      <div className="relative group">
        {/* Ambient glow */}
        <div
          className={cn(
            "absolute -inset-px rounded-2xl opacity-0 blur-sm transition-opacity duration-500",
            "bg-gradient-to-r from-zinc-400/30 via-zinc-300/20 to-zinc-400/30",
            "group-focus-within:opacity-100"
          )}
        />

        {/* Main container */}
        <div
          className={cn(
            "relative rounded-2xl overflow-hidden",
            "border border-zinc-200/80 dark:border-zinc-800/80",
            "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl",
            "shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_20px_-4px_rgba(0,0,0,0.4)]",
            "transition-all duration-300",
            "focus-within:border-zinc-300 dark:focus-within:border-zinc-700",
            "focus-within:shadow-[0_4px_32px_-4px_rgba(0,0,0,0.12)] dark:focus-within:shadow-[0_4px_32px_-4px_rgba(0,0,0,0.6)]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <textarea
            ref={textareaRef}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
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
              "py-4 pl-5 pr-24",
              "text-[15px] text-zinc-800 dark:text-zinc-100",
              "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
              "outline-none border-none ring-0",
              "min-h-[56px] max-h-[200px]",
              "leading-relaxed"
            )}
          />

          {/* Action row */}
          <div className="absolute right-2 bottom-2.5 flex items-center gap-1.5">
            {/* Mic button */}
            <button
              type="button"
              disabled={disabled}
              className={cn(
                "flex items-center justify-center size-8 rounded-xl",
                "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-all duration-150"
              )}
            >
              <Mic className="size-4" />
            </button>

            {/* Send button */}
            <button
              type="button"
              disabled={!value.trim() || disabled}
              onClick={handleSubmit}
              className={cn(
                "flex items-center justify-center size-8 rounded-xl",
                "transition-all duration-200",
                value.trim()
                  ? [
                      "bg-zinc-900 dark:bg-zinc-100",
                      "text-white dark:text-zinc-900",
                      "shadow-[0_1px_8px_rgba(0,0,0,0.2)]",
                      "hover:scale-105 hover:shadow-[0_2px_12px_rgba(0,0,0,0.3)]",
                      "active:scale-95",
                    ]
                  : [
                      "bg-zinc-100 dark:bg-zinc-800",
                      "text-zinc-300 dark:text-zinc-600",
                      "cursor-not-allowed",
                    ]
              )}
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Subtle hint */}
      <p className="mt-2 text-center text-[11px] text-zinc-400 dark:text-zinc-600">
        Press{" "}
        <kbd className="font-mono font-medium text-zinc-500 dark:text-zinc-500">
          Enter
        </kbd>{" "}
        to send,{" "}
        <kbd className="font-mono font-medium text-zinc-500 dark:text-zinc-500">
          Shift+Enter
        </kbd>{" "}
        for newline
      </p>
    </div>
  );
}