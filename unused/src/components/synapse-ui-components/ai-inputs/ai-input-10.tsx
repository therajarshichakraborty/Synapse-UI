"use client";

import * as React from "react";
import { ArrowUp, Lock, Globe, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput10Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, isPrivate: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput10({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder,
  disabled = false,
  className,
}: AIInput10Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [isPrivate, setIsPrivate] = React.useState(true);
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 200,
  });

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSubmit?.(value, isPrivate);
    setValue("");
    adjustHeight(true);
  };

  const derivedPlaceholder =
    placeholder ??
    (isPrivate
      ? "Your conversation is private..."
      : "This conversation will be visible to others...");

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div
        className={cn(
          "rounded-2xl border-2 bg-white dark:bg-zinc-950",
          "transition-all duration-400",
          isPrivate
            ? "border-zinc-200 dark:border-zinc-800 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.4)]"
            : "border-amber-400/60 dark:border-amber-500/40 shadow-[0_2px_24px_-4px_rgba(251,191,36,0.2)] dark:shadow-[0_2px_24px_-4px_rgba(251,191,36,0.15)]",
          disabled && "opacity-50",
        )}
      >
        {/* Privacy header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-0">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsPrivate(!isPrivate)}
            className={cn(
              "group flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold",
              "border transition-all duration-300",
              isPrivate
                ? "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                : "border-amber-400/50 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/15",
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center size-4 rounded-full transition-all duration-300",
                isPrivate ? "bg-zinc-200 dark:bg-zinc-700" : "bg-amber-400/30 dark:bg-amber-500/30",
              )}
            >
              {isPrivate ? (
                <Lock className="size-2.5 text-zinc-600 dark:text-zinc-400" />
              ) : (
                <Globe className="size-2.5 text-amber-600 dark:text-amber-400" />
              )}
            </span>
            {isPrivate ? "Private" : "Shared"}
          </button>

          {!isPrivate && (
            <div
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full",
                "bg-amber-50 dark:bg-amber-500/10",
                "border border-amber-200/50 dark:border-amber-500/20",
                "text-[11px] text-amber-600 dark:text-amber-400",
              )}
            >
              <Eye className="size-3" />
              Visible to team
            </div>
          )}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          placeholder={derivedPlaceholder}
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
            "py-3.5 pl-4 pr-14",
            "text-[15px] text-zinc-800 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "outline-none border-none ring-0",
            "min-h-[56px] max-h-[200px]",
            "leading-relaxed",
          )}
        />

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-4 pb-3">
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-600">
            {isPrivate ? (
              <EyeOff className="size-3.5" />
            ) : (
              <Eye className="size-3.5 text-amber-500" />
            )}
            <span className={cn(!isPrivate && "text-amber-500")}>
              {isPrivate ? "Only you can see this" : "Others can see this"}
            </span>
          </div>

          <button
            type="button"
            disabled={!value.trim() || disabled}
            onClick={handleSubmit}
            className={cn(
              "flex items-center justify-center size-9 rounded-xl",
              "transition-all duration-300",
              value.trim()
                ? isPrivate
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 active:scale-95 shadow-sm"
                  : "bg-amber-500 text-white hover:bg-amber-600 active:scale-95 shadow-[0_2px_8px_rgba(251,191,36,0.3)]"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
            )}
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
