"use client";

import * as React from "react";
import { ArrowUp, AtSign, Hash, FileText, Code, Globe, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

const MENTION_SOURCES = [
  { id: "docs", icon: FileText, label: "Docs", color: "text-blue-500" },
  { id: "code", icon: Code, label: "Codebase", color: "text-emerald-500" },
  { id: "web", icon: Globe, label: "Web", color: "text-violet-500" },
  { id: "db", icon: Database, label: "Database", color: "text-amber-500" },
] as const;

interface AIInput08Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput08({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Type @ to mention a source, # to add a tag...",
  disabled = false,
  className,
}: AIInput08Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 200,
  });

  // Parse tokens for highlight rendering
  const tokens = React.useMemo(() => {
    const parts = value.split(/(@\w+|#\w+)/g);
    return parts.map((part, i) => ({
      text: part,
      isMention: part.startsWith("@"),
      isTag: part.startsWith("#"),
      key: i,
    }));
  }, [value]);

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSubmit?.(value);
    setValue("");
    adjustHeight(true);
  };

  const insertToken = (token: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const pos = textarea.selectionStart;
    const before = value.slice(0, pos);
    const after = value.slice(pos);
    const newValue = before + token + after;
    setValue(newValue);
    setTimeout(() => {
      textarea.setSelectionRange(pos + token.length, pos + token.length);
      textarea.focus();
    }, 0);
  };

  const mentionCount = (value.match(/@\w+/g) ?? []).length;
  const tagCount = (value.match(/#\w+/g) ?? []).length;

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div
        className={cn(
          "rounded-2xl border border-zinc-200 dark:border-zinc-800",
          "bg-white dark:bg-zinc-950",
          "shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.4)]",
          "focus-within:border-zinc-300 dark:focus-within:border-zinc-700",
          "transition-all duration-300",
          disabled && "opacity-50",
        )}
      >
        {/* Source mention chips */}
        <div className="flex items-center gap-1.5 px-3 pt-3 pb-0 flex-wrap">
          <span className="text-[11px] text-zinc-400 dark:text-zinc-600 font-medium mr-0.5">
            Add context:
          </span>
          {MENTION_SOURCES.map((source) => (
            <button
              key={source.id}
              type="button"
              disabled={disabled}
              onClick={() => insertToken(`@${source.id} `)}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-lg text-[12px] font-medium",
                "border border-zinc-200 dark:border-zinc-800",
                "bg-zinc-50 dark:bg-zinc-900",
                "text-zinc-600 dark:text-zinc-400",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-all duration-150",
              )}
            >
              <source.icon className={cn("size-3", source.color)} />
              {source.label}
            </button>
          ))}
        </div>

        {/* Textarea */}
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
            "py-3 px-4",
            "text-[15px] text-zinc-800 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "outline-none border-none ring-0",
            "min-h-[52px] max-h-[200px]",
            "leading-relaxed",
          )}
        />

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={disabled}
              onClick={() => insertToken("@")}
              title="Add mention"
              className={cn(
                "flex items-center gap-1 text-[12px] font-medium",
                "text-zinc-400 hover:text-blue-500",
                "transition-colors duration-150",
              )}
            >
              <AtSign className="size-3.5" />
              {mentionCount > 0 && <span className="ml-0.5 text-blue-500">{mentionCount}</span>}
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => insertToken("#")}
              title="Add tag"
              className={cn(
                "flex items-center gap-1 text-[12px] font-medium",
                "text-zinc-400 hover:text-violet-500",
                "transition-colors duration-150",
              )}
            >
              <Hash className="size-3.5" />
              {tagCount > 0 && <span className="ml-0.5 text-violet-500">{tagCount}</span>}
            </button>
          </div>

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
        </div>
      </div>
    </div>
  );
}
