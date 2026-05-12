"use client";

import * as React from "react";
import { ArrowUp, Bold, Italic, Code, List, Link2, ImagePlus, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

const APPROX_TOKENS_PER_CHAR = 0.25;

interface AIInput20Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxTokens?: number;
  className?: string;
}

export function AIInput20({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Write your prompt... Markdown supported.",
  disabled = false,
  maxTokens = 2000,
  className,
}: AIInput20Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 80,
    maxHeight: 320,
  });

  const estimatedTokens = Math.round(value.length * APPROX_TOKENS_PER_CHAR);
  const tokenPct = Math.min(estimatedTokens / maxTokens, 1);
  const isNearLimit = tokenPct >= 0.75;
  const isOverLimit = estimatedTokens > maxTokens;

  const handleSubmit = () => {
    if (!value.trim() || disabled || isOverLimit) return;
    onSubmit?.(value);
    setValue("");
    adjustHeight(true);
  };

  const insertMarkdown = (prefix: string, suffix = prefix, block = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const sep = block ? "\n" : "";
    const newText =
      value.slice(0, start) + sep + prefix + selected + suffix + sep + value.slice(end);
    setValue(newText);
    setTimeout(() => {
      const newPos = start + sep.length + prefix.length + selected.length + suffix.length;
      textarea.setSelectionRange(newPos, newPos);
      textarea.focus();
    }, 0);
  };

  const TOOLS = [
    { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**") },
    { icon: Italic, label: "Italic", action: () => insertMarkdown("_", "_") },
    {
      icon: Code,
      label: "Code",
      action: () => insertMarkdown("`"),
    },
    {
      icon: List,
      label: "List",
      action: () => insertMarkdown("- ", "", true),
    },
    {
      icon: Link2,
      label: "Link",
      action: () => insertMarkdown("[", "](url)"),
    },
  ];

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div
        className={cn(
          "rounded-2xl border-2 bg-white dark:bg-zinc-950 overflow-hidden",
          "transition-all duration-300",
          isOverLimit
            ? "border-red-400/60 dark:border-red-500/40"
            : isFocused
              ? "border-zinc-300 dark:border-zinc-700 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
              : "border-zinc-200 dark:border-zinc-800 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_-4px_rgba(0,0,0,0.4)]",
          disabled && "opacity-50",
        )}
      >
        {/* Markdown toolbar */}
        <div
          className={cn(
            "flex items-center gap-0.5 px-3 py-2",
            "border-b border-zinc-100 dark:border-zinc-800/60",
            "bg-zinc-50/50 dark:bg-zinc-900/30",
          )}
        >
          {TOOLS.map(({ icon: Icon, label, action }) => (
            <button
              key={label}
              type="button"
              title={label}
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                action();
              }}
              className={cn(
                "flex items-center justify-center size-7 rounded-lg text-[12px]",
                "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-all duration-150 font-medium",
              )}
            >
              <Icon className="size-3.5" />
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            {/* Token bar */}
            <div className="flex items-center gap-1.5">
              <BarChart2 className="size-3.5 text-zinc-400" />
              <div className="w-24 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    isOverLimit ? "bg-red-500" : isNearLimit ? "bg-amber-500" : "bg-emerald-500",
                  )}
                  style={{ width: `${tokenPct * 100}%` }}
                />
              </div>
              <span
                className={cn(
                  "text-[11px] tabular-nums font-medium",
                  isOverLimit ? "text-red-500" : isNearLimit ? "text-amber-500" : "text-zinc-400",
                )}
              >
                ~{estimatedTokens}
                <span className="text-zinc-300 dark:text-zinc-700">/{maxTokens}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            setValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          rows={1}
          className={cn(
            "w-full resize-none bg-transparent",
            "overflow-y-auto scrollbar-thin",
            "scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700",
            "scrollbar-track-transparent",
            "hover:scrollbar-thumb-zinc-400 dark:hover:scrollbar-thumb-zinc-600",
            "py-4 px-5",
            "text-[15px] text-zinc-800 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "outline-none border-none ring-0",
            "min-h-[80px] max-h-[320px]",
            "leading-relaxed font-[inherit]",
          )}
        />

        {/* Footer */}
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3",
            "border-t border-zinc-100 dark:border-zinc-800/60",
            "bg-zinc-50/50 dark:bg-zinc-900/30",
          )}
        >
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-600">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px]">
              ⌘+Enter
            </kbd>
            <span>to send</span>
            <span className="mx-1 text-zinc-200 dark:text-zinc-700">·</span>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px]">
              Enter
            </kbd>
            <span>for newline</span>
          </div>

          <button
            type="button"
            disabled={!value.trim() || disabled || isOverLimit}
            onClick={handleSubmit}
            className={cn(
              "flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold",
              "transition-all duration-200",
              value.trim() && !isOverLimit
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 active:scale-[0.98] shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
            )}
          >
            Send
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
