"use client";

import * as React from "react";
import { ArrowUp, Mic, MicOff, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput16Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput16({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Speak or type your message...",
  disabled = false,
  className,
}: AIInput16Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [isRecording, setIsRecording] = React.useState(false);
  const [mode, setMode] = React.useState<"voice" | "text">("voice");
  const [bars] = React.useState(() => Array.from({ length: 20 }, (_, i) => i));
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 160,
  });

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSubmit?.(value);
    setValue("");
    adjustHeight(true);
  };

  const toggleRecording = () => {
    setIsRecording((r) => !r);
  };

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <style>{`
        @keyframes bar-bounce {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
      `}</style>

      <div
        className={cn(
          "rounded-2xl border-2 bg-white dark:bg-zinc-950 overflow-hidden",
          "transition-all duration-300",
          isRecording
            ? "border-red-400/60 dark:border-red-500/40 shadow-[0_4px_24px_-4px_rgba(239,68,68,0.2)]"
            : "border-zinc-200 dark:border-zinc-800 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)]",
          disabled && "opacity-50",
        )}
      >
        {/* Voice / Text toggle */}
        <div className="flex items-center justify-between px-4 pt-3 pb-0">
          <div
            className={cn(
              "flex items-center gap-1 p-1 rounded-lg",
              "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
            )}
          >
            {(["voice", "text"] as const).map((m) => (
              <button
                key={m}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setMode(m);
                  if (m === "text") setIsRecording(false);
                }}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium",
                  "transition-all duration-200",
                  mode === m
                    ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300",
                )}
              >
                {m === "voice" ? <Mic className="size-3.5" /> : <Type className="size-3.5" />}
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>

          {isRecording && (
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-red-500">
              <span className="size-2 rounded-full bg-red-500 animate-pulse" />
              Recording
            </div>
          )}
        </div>

        {/* Voice visualizer OR textarea */}
        {mode === "voice" ? (
          <div className="flex flex-col items-center py-6 px-4 gap-5">
            {/* Waveform bars */}
            <div className="flex items-center gap-[3px] h-12">
              {bars.map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-[3px] rounded-full origin-center transition-colors duration-200",
                    isRecording ? "bg-red-400" : "bg-zinc-200 dark:bg-zinc-800",
                  )}
                  style={{
                    height: `${Math.round(20 + Math.random() * 28)}px`,
                    animation: isRecording
                      ? `bar-bounce ${0.6 + (i % 5) * 0.12}s ease-in-out ${(i * 0.05) % 0.5}s infinite`
                      : "none",
                  }}
                />
              ))}
            </div>

            {/* Mic button */}
            <button
              type="button"
              disabled={disabled}
              onClick={toggleRecording}
              className={cn(
                "flex items-center justify-center size-14 rounded-full",
                "transition-all duration-300",
                isRecording
                  ? "bg-red-500 text-white shadow-[0_4px_20px_rgba(239,68,68,0.5)] scale-110"
                  : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800",
              )}
            >
              {isRecording ? <MicOff className="size-6" /> : <Mic className="size-6" />}
            </button>

            <p className="text-[12px] text-zinc-400 dark:text-zinc-600">
              {isRecording ? "Tap to stop" : "Tap to start speaking"}
            </p>
          </div>
        ) : (
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
              "min-h-[56px] max-h-[160px]",
              "leading-relaxed",
            )}
          />
        )}

        {/* Bottom send row (text mode only) */}
        {mode === "text" && (
          <div className="flex justify-end px-3 pb-3">
            <button
              type="button"
              disabled={!value.trim() || disabled}
              onClick={handleSubmit}
              className={cn(
                "flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold",
                "transition-all duration-200",
                value.trim()
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 active:scale-95 shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
              )}
            >
              Send
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
