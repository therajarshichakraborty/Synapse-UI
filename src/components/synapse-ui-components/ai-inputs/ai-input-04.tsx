"use client";

import * as React from "react";
import { ArrowUp, FileText, Code, Image as ImageIcon, Brain, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

const QUICK_ACTIONS = [
  { id: "write", icon: FileText, label: "Write", color: "text-blue-500" },
  { id: "code", icon: Code, label: "Code", color: "text-emerald-500" },
  { id: "image", icon: ImageIcon, label: "Image", color: "text-violet-500" },
  { id: "analyze", icon: Brain, label: "Analyze", color: "text-amber-500" },
  { id: "improve", icon: Wand2, label: "Improve", color: "text-rose-500" },
] as const;

interface AIInput04Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onActionClick?: (action: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput04({
  value: controlledValue,
  onChange,
  onSubmit,
  onActionClick,
  placeholder = "What would you like to create?",
  disabled = false,
  className,
}: AIInput04Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [activeAction, setActiveAction] = React.useState<string | null>(null);
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
    setActiveAction(null);
    adjustHeight(true);
  };

  const handleActionClick = (id: string, label: string) => {
    setActiveAction(id);
    onActionClick?.(id);
  };

  const currentAction = QUICK_ACTIONS.find((a) => a.id === activeAction);

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      {/* Action chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            disabled={disabled}
            onClick={() => handleActionClick(action.id, action.label)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium",
              "border transition-all duration-200",
              activeAction === action.id
                ? [
                    "border-transparent",
                    "bg-zinc-900 dark:bg-zinc-100",
                    "text-white dark:text-zinc-900",
                    "shadow-sm",
                  ]
                : [
                    "border-zinc-200 dark:border-zinc-800",
                    "bg-white dark:bg-zinc-950",
                    "text-zinc-600 dark:text-zinc-400",
                    "hover:border-zinc-300 dark:hover:border-zinc-700",
                    "hover:bg-zinc-50 dark:hover:bg-zinc-900",
                  ],
            )}
          >
            <action.icon
              className={cn(
                "size-3.5 transition-colors",
                activeAction === action.id ? "text-current" : action.color,
              )}
            />
            {action.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        className={cn(
          "relative rounded-2xl border bg-white dark:bg-zinc-950",
          "border-zinc-200 dark:border-zinc-800",
          "shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.4)]",
          "focus-within:border-zinc-300 dark:focus-within:border-zinc-700",
          "focus-within:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] dark:focus-within:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]",
          "transition-all duration-300",
          disabled && "opacity-50",
        )}
      >
        {/* Active action indicator */}
        {currentAction && (
          <div className="flex items-center gap-2 px-4 pt-3 pb-0">
            <div
              className={cn("flex items-center gap-1.5 text-xs font-medium", currentAction.color)}
            >
              <currentAction.icon className="size-3" />
              {currentAction.label} mode
            </div>
            <button
              type="button"
              onClick={() => setActiveAction(null)}
              className="text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 ml-auto"
            >
              ✕ clear
            </button>
          </div>
        )}

        <textarea
          ref={textareaRef}
          placeholder={currentAction ? `${currentAction.label} something...` : placeholder}
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
            "py-4 pl-4 pr-14",
            "text-[15px] text-zinc-800 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "outline-none border-none ring-0",
            "min-h-[56px] max-h-[200px]",
            "leading-relaxed",
            currentAction && "pt-2",
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
    </div>
  );
}
