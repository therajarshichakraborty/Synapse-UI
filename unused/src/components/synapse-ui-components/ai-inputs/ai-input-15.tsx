"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput15Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput15({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Ask anything...",
  disabled = false,
  className,
}: AIInput15Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
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
      <style>{`
        @keyframes gradientSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-border-spin {
          background: linear-gradient(270deg, #f43f5e, #a855f7, #6366f1, #06b6d4, #10b981, #f43f5e);
          background-size: 400% 400%;
          animation: gradientSpin 5s ease infinite;
        }
        .gradient-border-spin-fast {
          background: linear-gradient(270deg, #f43f5e, #a855f7, #6366f1, #06b6d4, #10b981, #f43f5e);
          background-size: 400% 400%;
          animation: gradientSpin 2.5s ease infinite;
        }
      `}</style>

      <div className="relative">
        {/* Gradient glow layer */}
        <div
          className={cn(
            "absolute -inset-[1.5px] rounded-[18px] blur-[6px]",
            "transition-all duration-500 ease-out",
            isFocused
              ? "opacity-100 animate-[spin_5s_linear_infinite]"
              : "opacity-55 animate-[spin_14s_linear_infinite]",
          )}
        />

        {/* Inner white/dark layer */}
        <div
          className={cn(
            "relative rounded-2xl bg-white dark:bg-zinc-950 m-[2px]",
            disabled && "opacity-50",
          )}
        >
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

          {/* Send button with gradient fill */}
          <button
            type="button"
            disabled={!value.trim() || disabled}
            onClick={handleSubmit}
            className={cn(
              "absolute right-2.5 bottom-2.5",
              "flex items-center justify-center size-9 rounded-xl",
              "transition-all duration-200 active:scale-95",
              value.trim()
                ? "text-white shadow-[0_2px_12px_rgba(99,102,241,0.4)]"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
            )}
            style={
              value.trim()
                ? {
                    background: "linear-gradient(135deg, #f43f5e 0%, #a855f7 50%, #6366f1 100%)",
                  }
                : undefined
            }
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
