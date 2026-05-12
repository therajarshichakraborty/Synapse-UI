"use client";

import * as React from "react";
import { ArrowUp, Paperclip, X, Image as ImageIcon, FileText, File, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AttachedFile {
  id: string;
  name: string;
  type: "image" | "document" | "other";
  size: string;
}

interface AIInput07Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, files: AttachedFile[]) => void;
  onAttach?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  defaultFiles?: AttachedFile[];
}

const FILE_TYPE_CONFIG = {
  image: {
    icon: ImageIcon,
    bg: "bg-violet-500/10 dark:bg-violet-500/10",
    text: "text-violet-500",
    border: "border-violet-200 dark:border-violet-500/20",
  },
  document: {
    icon: FileText,
    bg: "bg-blue-500/10 dark:bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-200 dark:border-blue-500/20",
  },
  other: {
    icon: File,
    bg: "bg-zinc-500/10 dark:bg-zinc-500/10",
    text: "text-zinc-500",
    border: "border-zinc-200 dark:border-zinc-700",
  },
} as const;

export function AIInput07({
  value: controlledValue,
  onChange,
  onSubmit,
  onAttach,
  placeholder = "Describe what you'd like to do with these files...",
  disabled = false,
  className,
  defaultFiles = [
    { id: "1", name: "screenshot.png", type: "image", size: "2.4 MB" },
    { id: "2", name: "report.pdf", type: "document", size: "1.2 MB" },
  ],
}: AIInput07Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [files, setFiles] = React.useState<AttachedFile[]>(defaultFiles);
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 200,
  });

  const handleSubmit = () => {
    if ((!value.trim() && files.length === 0) || disabled) return;
    onSubmit?.(value, files);
    setValue("");
    setFiles([]);
    adjustHeight(true);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div
        className={cn(
          "rounded-2xl border border-zinc-200 dark:border-zinc-800",
          "bg-white dark:bg-zinc-950",
          "shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_16px_-4px_rgba(0,0,0,0.4)]",
          "focus-within:border-zinc-300 dark:focus-within:border-zinc-700",
          "focus-within:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)]",
          "transition-all duration-300",
          disabled && "opacity-50",
        )}
      >
        {/* File chips */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 pb-1">
            {files.map((file) => {
              const config = FILE_TYPE_CONFIG[file.type];
              const Icon = config.icon;
              return (
                <div
                  key={file.id}
                  className={cn(
                    "group flex items-center gap-2 pl-2.5 pr-1.5 py-1.5 rounded-xl",
                    "border text-sm",
                    config.bg,
                    config.border,
                    "transition-all duration-150",
                  )}
                >
                  <Icon className={cn("size-3.5 shrink-0", config.text)} />
                  <span className="max-w-[120px] truncate text-zinc-700 dark:text-zinc-300 text-[13px]">
                    {file.name}
                  </span>
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-600 shrink-0">
                    {file.size}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className={cn(
                      "flex items-center justify-center size-4 rounded-full shrink-0",
                      "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300",
                      "hover:bg-white/60 dark:hover:bg-zinc-800/60",
                      "opacity-0 group-hover:opacity-100",
                      "transition-all duration-150",
                    )}
                  >
                    <X className="size-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

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
            "py-3.5 px-4",
            "text-[15px] text-zinc-800 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "outline-none border-none ring-0",
            "min-h-[52px] max-h-[200px]",
            "leading-relaxed",
          )}
        />

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-3 pb-3">
          <button
            type="button"
            disabled={disabled}
            onClick={onAttach}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px]",
              "border border-dashed border-zinc-300 dark:border-zinc-700",
              "text-zinc-500 dark:text-zinc-400",
              "hover:border-zinc-400 dark:hover:border-zinc-600",
              "hover:bg-zinc-50 dark:hover:bg-zinc-900",
              "transition-all duration-150",
            )}
          >
            <Plus className="size-3.5" />
            Attach
          </button>

          <div className="flex items-center gap-2">
            {files.length > 0 && (
              <span className="text-[11px] text-zinc-400">
                {files.length} file{files.length > 1 ? "s" : ""}
              </span>
            )}
            <button
              type="button"
              disabled={(!value.trim() && files.length === 0) || disabled}
              onClick={handleSubmit}
              className={cn(
                "flex items-center gap-1.5 h-8 px-3 rounded-xl text-sm font-medium",
                "transition-all duration-200",
                value.trim() || files.length > 0
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
              )}
            >
              <ArrowUp className="size-3.5" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
