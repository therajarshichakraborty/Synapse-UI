"use client";

import * as React from "react";
import { ArrowUp, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput09Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onStop?: () => void;
  placeholder?: string;
  disabled?: boolean;
  isStreaming?: boolean;
  streamingText?: string;
  className?: string;
}

export function AIInput09({
  value: controlledValue,
  onChange,
  onSubmit,
  onStop,
  placeholder = "Ask me anything...",
  disabled = false,
  isStreaming = false,
  streamingText = "Generating response",
  className,
}: AIInput09Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 200,
  });

  const handleSubmit = () => {
    if (!value.trim() || disabled || isStreaming) return;
    onSubmit?.(value);
    setValue("");
    adjustHeight(true);
  };

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-2xl border bg-white dark:bg-zinc-950",
          "shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.4)]",
          "transition-all duration-300 overflow-hidden",
          isStreaming
            ? "border-transparent"
            : "border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-300 dark:focus-within:border-zinc-700",
          disabled && "opacity-50",
        )}
      >
        {/* Animated gradient border when streaming */}
        {isStreaming && (
          <>
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #6366f1)",
                backgroundSize: "200% 100%",
                animation: "borderFlow 2s linear infinite",
                padding: "1.5px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <style>{`
              @keyframes borderFlow {
                0% { background-position: 0% 0%; }
                100% { background-position: 200% 0%; }
              }
            `}</style>
          </>
        )}

        {/* Streaming indicator bar */}
        {isStreaming && (
          <div className="flex items-center gap-2.5 px-4 pt-3 pb-0">
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="inline-block size-1.5 rounded-full bg-violet-500"
                  style={{
                    animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
            <span className="text-[12px] font-medium text-violet-500">{streamingText}...</span>
            <style>{`
              @keyframes bounce {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-4px); }
              }
            `}</style>
          </div>
        )}

        <textarea
          ref={textareaRef}
          placeholder={isStreaming ? "" : placeholder}
          disabled={disabled || isStreaming}
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
            "leading-relaxed",
            isStreaming && "cursor-not-allowed",
          )}
        />

        {/* Action button */}
        <div className="absolute right-2.5 bottom-2.5">
          {isStreaming ? (
            <button
              type="button"
              onClick={onStop}
              className={cn(
                "flex items-center gap-1.5 h-9 px-3 rounded-xl",
                "bg-red-500/10 text-red-500 border border-red-500/20",
                "hover:bg-red-500/20",
                "text-sm font-medium",
                "transition-all duration-150",
              )}
            >
              <Square className="size-3.5 fill-current" />
              Stop
            </button>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
