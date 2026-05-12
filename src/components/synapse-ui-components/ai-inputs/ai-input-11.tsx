"use client";

import * as React from "react";
import { ArrowUp, MessageSquare, Image as ImageIcon, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

type InputMode = "chat" | "image" | "code";

const MODES = [
  {
    id: "chat" as const,
    icon: MessageSquare,
    label: "Chat",
    placeholder: "Ask me anything...",
    accent: "text-blue-500",
    bg: "bg-blue-500",
    ring: "shadow-[0_0_0_3px_rgba(59,130,246,0.15)]",
    border: "border-blue-200 dark:border-blue-500/30",
  },
  {
    id: "image" as const,
    icon: ImageIcon,
    label: "Image",
    placeholder: "Describe the image you want to generate...",
    accent: "text-violet-500",
    bg: "bg-violet-500",
    ring: "shadow-[0_0_0_3px_rgba(139,92,246,0.15)]",
    border: "border-violet-200 dark:border-violet-500/30",
  },
  {
    id: "code" as const,
    icon: Code,
    label: "Code",
    placeholder: "Describe the code you need...",
    accent: "text-emerald-500",
    bg: "bg-emerald-500",
    ring: "shadow-[0_0_0_3px_rgba(16,185,129,0.15)]",
    border: "border-emerald-200 dark:border-emerald-500/30",
  },
] as const;

interface AIInput11Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, mode: InputMode) => void;
  disabled?: boolean;
  className?: string;
}

export function AIInput11({
  value: controlledValue,
  onChange,
  onSubmit,
  disabled = false,
  className,
}: AIInput11Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [mode, setMode] = React.useState<InputMode>("chat");
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 200,
  });

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSubmit?.(value, mode);
    setValue("");
    adjustHeight(true);
  };

  const currentMode = MODES.find((m) => m.id === mode) ?? MODES[0];

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      {/* Mode tab row */}
      <div
        className={cn(
          "flex items-center gap-1 p-1 mb-2 rounded-xl w-fit",
          "bg-zinc-100 dark:bg-zinc-900",
          "border border-zinc-200 dark:border-zinc-800",
        )}
      >
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            disabled={disabled}
            onClick={() => setMode(m.id)}
            className={cn(
              "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium",
              "transition-all duration-200",
              mode === m.id
                ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300",
            )}
          >
            <m.icon
              className={cn(
                "size-3.5 transition-colors",
                mode === m.id ? m.accent : "text-current",
              )}
            />
            {m.label}
            {mode === m.id && (
              <span
                className={cn(
                  "absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full",
                  m.bg,
                )}
              />
            )}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div
        className={cn(
          "relative rounded-2xl border-2 bg-white dark:bg-zinc-950",
          "transition-all duration-300",
          "focus-within:shadow-md",
          currentMode.border,
          `focus-within:${currentMode.ring}`,
          disabled && "opacity-50",
        )}
      >
        <textarea
          ref={textareaRef}
          placeholder={currentMode.placeholder}
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
            mode === "code" && "font-mono text-[14px]",
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
              ? [currentMode.bg, "text-white hover:opacity-90 active:scale-95 shadow-sm"]
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
          )}
        >
          <ArrowUp className="size-4" />
        </button>
      </div>
    </div>
  );
}
