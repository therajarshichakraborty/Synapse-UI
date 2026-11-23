"use client";

import * as React from "react";
import { ArrowUp, SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput18Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, context: string) => void;
  placeholder?: string;
  contextPlaceholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput18({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Ask your question...",
  contextPlaceholder = "Add context or system instructions (optional)...",
  disabled = false,
  className,
}: AIInput18Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [context, setContext] = React.useState("");
  const [contextOpen, setContextOpen] = React.useState(false);
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef: mainRef, adjustHeight: adjustMain } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 160,
  });
  const { textareaRef: contextRef, adjustHeight: adjustContext } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 120,
  });

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSubmit?.(value, context);
    setValue("");
    setContext("");
    adjustMain(true);
    adjustContext(true);
  };

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div
        className={cn(
          "rounded-2xl border border-zinc-200 dark:border-zinc-800",
          "bg-white dark:bg-zinc-950",
          "shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.4)]",
          "focus-within:border-zinc-300 dark:focus-within:border-zinc-700",
          "transition-all duration-300 overflow-hidden",
          disabled && "opacity-50",
        )}
      >
        {/* Context panel */}
        {contextOpen && (
          <div className="relative">
            <div className="flex items-center gap-2 px-4 pt-3 pb-0">
              <SlidersHorizontal className="size-3.5 text-zinc-400" />
              <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                System Context
              </span>
            </div>
            <textarea
              ref={contextRef}
              placeholder={contextPlaceholder}
              disabled={disabled}
              value={context}
              onChange={(e) => {
                setContext(e.target.value);
                adjustContext();
              }}
              rows={1}
              className={cn(
                "w-full resize-none bg-transparent",
                "py-3 px-4",
                "text-[13px] font-mono text-zinc-600 dark:text-zinc-400",
                "placeholder:text-zinc-300 dark:placeholder:text-zinc-700",
                "outline-none border-none ring-0",
                "min-h-[52px] max-h-[120px]",
                "leading-relaxed",
              )}
            />
          </div>
        )}

        {/* Main input */}
        <div className="relative">
          <textarea
            ref={mainRef}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              adjustMain();
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
              "min-h-[56px] max-h-[160px]",
              "leading-relaxed",
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
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 active:scale-95 shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
            )}
          >
            <ArrowUp className="size-4" />
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 pb-3 border-t border-zinc-100 dark:border-zinc-800/60">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setContextOpen(!contextOpen)}
            className={cn(
              "flex items-center gap-1.5 text-[12px] font-medium",
              "transition-colors duration-150",
              contextOpen
                ? "text-zinc-700 dark:text-zinc-300"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300",
            )}
          >
            <SlidersHorizontal className="size-3.5" />
            System context
            {context && <span className="ml-0.5 size-1.5 rounded-full bg-blue-500 inline-block" />}
            <ChevronDown
              className={cn(
                "size-3 transition-transform duration-200",
                contextOpen && "rotate-180",
              )}
            />
          </button>

          <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
            Shift+Enter for newline
          </span>
        </div>
      </div>
    </div>
  );
}
