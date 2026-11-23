"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput12Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

export function AIInput12({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Write your message...",
  disabled = false,
  maxLength = 500,
  className,
}: AIInput12Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 200,
  });

  const handleSubmit = () => {
    if (!value.trim() || disabled || value.length > maxLength) return;
    onSubmit?.(value);
    setValue("");
    adjustHeight(true);
  };

  const charCount = value.length;
  const remaining = maxLength - charCount;
  const pct = Math.min(charCount / maxLength, 1);
  const isNearLimit = pct >= 0.8;
  const isOverLimit = charCount > maxLength;

  // SVG ring params
  const R = 10;
  const C = 2 * Math.PI * R; // circumference ≈ 62.83
  const dashOffset = C * (1 - pct);

  const ringColor = isOverLimit ? "#ef4444" : isNearLimit ? "#f59e0b" : "#22c55e";

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-2xl border-2 bg-white dark:bg-zinc-950",
          "transition-all duration-300",
          isOverLimit
            ? "border-red-400/60 dark:border-red-500/40 shadow-[0_2px_20px_-4px_rgba(239,68,68,0.2)]"
            : "border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-300 dark:focus-within:border-zinc-700",
          disabled && "opacity-50",
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
            "py-4 pl-5 pr-14",
            "text-[15px] text-zinc-800 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "outline-none border-none ring-0",
            "min-h-[56px] max-h-[200px]",
            "leading-relaxed",
          )}
        />

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-4 pb-3">
          {/* Ring + count */}
          <div className="flex items-center gap-2.5">
            <div className="relative size-6 flex items-center justify-center">
              {/* Background track */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r={R}
                  strokeWidth="2.5"
                  className="stroke-zinc-100 dark:stroke-zinc-800"
                />
                <circle
                  cx="12"
                  cy="12"
                  r={R}
                  strokeWidth="2.5"
                  stroke={ringColor}
                  strokeDasharray={C}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
            </div>

            <span
              className={cn(
                "text-[12px] tabular-nums font-medium transition-colors duration-200",
                isOverLimit
                  ? "text-red-500"
                  : isNearLimit
                    ? "text-amber-500"
                    : "text-zinc-400 dark:text-zinc-600",
              )}
            >
              {isOverLimit ? <span>-{Math.abs(remaining)}</span> : <span>{remaining} left</span>}
            </span>
          </div>

          <button
            type="button"
            disabled={!value.trim() || disabled || isOverLimit}
            onClick={handleSubmit}
            className={cn(
              "flex items-center justify-center size-9 rounded-xl",
              "transition-all duration-200",
              value.trim() && !isOverLimit
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 active:scale-95 shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
            )}
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>

      {/* Over-limit warning */}
      {isOverLimit && (
        <p className="mt-1.5 text-[12px] text-red-500 font-medium pl-1">
          {Math.abs(remaining)} characters over the limit
        </p>
      )}
    </div>
  );
}
