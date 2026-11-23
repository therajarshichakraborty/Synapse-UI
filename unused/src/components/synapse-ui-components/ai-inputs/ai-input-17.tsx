"use client";

import * as React from "react";
import { ArrowUp, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

const SUGGESTION_POOLS = [
  [
    "Summarize this document for me",
    "Write a professional email",
    "Explain this concept simply",
    "Debug my code",
    "Create a project plan",
    "Draft a blog post",
    "Translate this text",
    "Compare these options",
  ],
];

function getRandomSuggestions(count = 4) {
  const pool = SUGGESTION_POOLS[0];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

interface AIInput17Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput17({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Ask anything, or pick a suggestion...",
  disabled = false,
  className,
}: AIInput17Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState(() => getRandomSuggestions());
  const [refreshing, setRefreshing] = React.useState(false);
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

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setSuggestions(getRandomSuggestions());
      setRefreshing(false);
    }, 400);
  };

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      {/* Main input */}
      <div
        className={cn(
          "rounded-2xl border-2 border-zinc-200 dark:border-zinc-800",
          "bg-white dark:bg-zinc-950",
          "shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.4)]",
          "focus-within:border-zinc-300 dark:focus-within:border-zinc-700",
          "transition-all duration-300",
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

        <div className="flex items-center justify-end px-3 pb-3">
          <button
            type="button"
            disabled={!value.trim() || disabled}
            onClick={handleSubmit}
            className={cn(
              "flex items-center justify-center size-9 rounded-xl",
              "transition-all duration-200",
              value.trim()
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 active:scale-95 shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
            )}
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>

      {/* Suggestions row */}
      {!value && (
        <div className="mt-3 flex items-start gap-2">
          <div
            className={cn(
              "flex-1 flex flex-wrap gap-2",
              refreshing && "opacity-0 transition-opacity duration-200",
            )}
          >
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setValue(s);
                  setTimeout(() => textareaRef.current?.focus(), 0);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-[13px] font-medium",
                  "border border-zinc-200 dark:border-zinc-800",
                  "bg-zinc-50 dark:bg-zinc-900",
                  "text-zinc-600 dark:text-zinc-400",
                  "hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700",
                  "hover:text-zinc-800 dark:hover:text-zinc-200",
                  "hover:shadow-sm",
                  "transition-all duration-150 text-left",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={disabled || refreshing}
            onClick={handleRefresh}
            title="Refresh suggestions"
            className={cn(
              "flex items-center justify-center size-8 rounded-xl shrink-0",
              "border border-zinc-200 dark:border-zinc-800",
              "bg-zinc-50 dark:bg-zinc-900",
              "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300",
              "hover:bg-white dark:hover:bg-zinc-800",
              "transition-all duration-150",
            )}
          >
            <RefreshCw className={cn("size-3.5", refreshing && "animate-spin")} />
          </button>
        </div>
      )}
    </div>
  );
}
