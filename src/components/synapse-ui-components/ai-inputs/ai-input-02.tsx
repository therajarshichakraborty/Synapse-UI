"use client";

import * as React from "react";
import {
  ArrowUp,
  Paperclip,
  Globe,
  Image as ImageIcon,
  ChevronDown,
  Sparkles,
  Loader2,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

const MODELS = [
  { id: "claude-sonnet", name: "Claude Sonnet", tag: "Smart" },
  { id: "claude-haiku", name: "Claude Haiku", tag: "Fast" },
  { id: "gpt-4o", name: "GPT-4o", tag: "Balanced" },
  { id: "gemini-pro", name: "Gemini Pro", tag: "Creative" },
] as const;

interface AIInput02Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onAttach?: () => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onStop?: () => void;
  className?: string;
  defaultModel?: string;
}

export function AIInput02({
  value: controlledValue,
  onChange,
  onSubmit,
  onAttach,
  placeholder = "Message AI...",
  disabled = false,
  isLoading = false,
  onStop,
  className,
  defaultModel = "Claude Sonnet",
}: AIInput02Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState(defaultModel);
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 200,
  });

  const handleSubmit = () => {
    if (!value.trim() || disabled || isLoading) return;
    onSubmit?.(value);
    setValue("");
    adjustHeight(true);
  };

  const currentModel = MODELS.find((m) => m.name === selectedModel) ?? MODELS[0];

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div
        className={cn(
          "rounded-2xl border border-zinc-200 dark:border-zinc-800",
          "bg-white dark:bg-zinc-950",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_4px_24px_-4px_rgba(0,0,0,0.1)]",
          "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_24px_-4px_rgba(0,0,0,0.5)]",
          "transition-all duration-200",
          "focus-within:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_32px_-4px_rgba(0,0,0,0.14)]",
          "dark:focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_-4px_rgba(0,0,0,0.6)]",
          disabled && "opacity-50",
        )}
      >
        {/* Top toolbar */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-0">
          {/* Model selector */}
          <div className="relative">
            <button
              type="button"
              disabled={disabled}
              onClick={() => setIsModelOpen(!isModelOpen)}
              className={cn(
                "flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs font-medium",
                "border border-zinc-200 dark:border-zinc-800",
                "bg-zinc-50 dark:bg-zinc-900",
                "text-zinc-700 dark:text-zinc-300",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors duration-150",
              )}
            >
              <Sparkles className="size-3 text-violet-500" />
              {currentModel.name}
              <ChevronDown
                className={cn(
                  "size-3 text-zinc-400 transition-transform duration-200",
                  isModelOpen && "rotate-180",
                )}
              />
            </button>

            {/* Dropdown */}
            {isModelOpen && (
              <div
                className={cn(
                  "absolute top-full left-0 mt-1.5 z-50 w-48",
                  "rounded-xl border border-zinc-200 dark:border-zinc-800",
                  "bg-white dark:bg-zinc-950",
                  "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.16)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6)]",
                  "overflow-hidden",
                )}
              >
                {MODELS.map((model) => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => {
                      setSelectedModel(model.name);
                      setIsModelOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 text-sm",
                      "text-zinc-700 dark:text-zinc-300",
                      "hover:bg-zinc-50 dark:hover:bg-zinc-900",
                      "transition-colors duration-100",
                      selectedModel === model.name && "bg-zinc-50 dark:bg-zinc-900 font-medium",
                    )}
                  >
                    <span>{model.name}</span>
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-md font-medium",
                        "bg-zinc-100 dark:bg-zinc-800",
                        "text-zinc-500 dark:text-zinc-400",
                      )}
                    >
                      {model.tag}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          disabled={disabled || isLoading}
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
            "py-3 px-4",
            "text-[15px] text-zinc-800 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "outline-none border-none ring-0",
            "min-h-[52px] max-h-[200px]",
            "leading-relaxed",
          )}
        />

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-0.5">
            {[
              { Icon: Paperclip, label: "Attach files", onClick: onAttach },
              { Icon: ImageIcon, label: "Add image", onClick: undefined },
              { Icon: Globe, label: "Search web", onClick: undefined },
            ].map(({ Icon, label, onClick }) => (
              <button
                key={label}
                type="button"
                title={label}
                disabled={disabled}
                onClick={onClick}
                className={cn(
                  "flex items-center justify-center size-8 rounded-lg",
                  "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  "transition-all duration-150",
                )}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {value.length > 0 && !isLoading && (
              <span className="text-[11px] text-zinc-400 tabular-nums">{value.length}</span>
            )}
            <button
              type="button"
              disabled={(!value.trim() && !isLoading) || disabled}
              onClick={isLoading ? onStop : handleSubmit}
              className={cn(
                "flex items-center gap-1.5 h-8 px-3 rounded-xl text-sm font-medium",
                "transition-all duration-200",
                isLoading
                  ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  : value.trim()
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
              )}
            >
              {isLoading ? (
                <>
                  <Square className="size-3.5 fill-current" />
                  Stop
                </>
              ) : (
                <>
                  Send
                  <ArrowUp className="size-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
