"use client";

import * as React from "react";
import { ArrowUp, Mic, Paperclip, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput19Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput19({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "What's on your mind?",
  disabled = false,
  className,
}: AIInput19Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
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
        @keyframes aurora {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Outer dark container with ambient glow */}
      <div
        className="relative rounded-3xl p-[1px] overflow-hidden"
        style={{
          background: isFocused
            ? "linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(99,102,241,0.4) 30%, rgba(20,184,166,0.4) 70%, rgba(139,92,246,0.6) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
          transition: "background 0.4s ease",
        }}
      >
        <div
          className={cn(
            "relative rounded-[22px] overflow-hidden",
            "bg-zinc-950",
            disabled && "opacity-50",
          )}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Header row */}
          <div className="flex items-center gap-2 px-4 pt-4 pb-0">
            <div
              className={cn(
                "flex items-center justify-center size-6 rounded-lg",
                "bg-gradient-to-br from-violet-500 to-indigo-600",
              )}
            >
              <Sparkles className="size-3 text-white" />
            </div>
            <span className="text-[12px] font-medium text-zinc-400">AI Assistant</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-zinc-600">live</span>
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
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            rows={1}
            className={cn(
              "w-full resize-none bg-transparent",
              "py-3.5 pl-5 pr-14",
              "text-[15px] text-zinc-100",
              "placeholder:text-zinc-600",
              "outline-none border-none ring-0",
              "min-h-[60px] max-h-[200px]",
              "leading-relaxed caret-violet-400",
            )}
          />

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-3 pb-3.5">
            <div className="flex items-center gap-0.5">
              {[
                { Icon: Mic, label: "Voice" },
                { Icon: Paperclip, label: "Attach" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  disabled={disabled}
                  className={cn(
                    "flex items-center justify-center size-8 rounded-xl",
                    "text-zinc-600 hover:text-zinc-300",
                    "hover:bg-white/5",
                    "transition-all duration-150",
                  )}
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={!value.trim() || disabled}
              onClick={handleSubmit}
              className={cn(
                "flex items-center justify-center size-9 rounded-xl",
                "transition-all duration-200",
                value.trim()
                  ? [
                      "text-white",
                      "shadow-[0_2px_16px_rgba(139,92,246,0.5)]",
                      "hover:shadow-[0_4px_20px_rgba(139,92,246,0.6)]",
                      "hover:scale-105 active:scale-95",
                    ]
                  : "bg-zinc-800 text-zinc-600 cursor-not-allowed",
              )}
              style={
                value.trim()
                  ? {
                      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    }
                  : undefined
              }
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
