"use client";

import * as React from "react";
import {
  ArrowUp,
  Paperclip,
  Image as ImageIcon,
  Mic,
  Globe,
  Settings,
  Sparkles,
  Loader2,
  Eye,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput13Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  agentName?: string;
}

export function AIInput13({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "How can I help you today?",
  disabled = false,
  isLoading = false,
  className,
  agentName = "AI Assistant",
}: AIInput13Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [webSearch, setWebSearch] = React.useState(true);
  const [preview, setPreview] = React.useState(false);
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  const handleSubmit = () => {
    if (!value.trim() || disabled || isLoading) return;
    onSubmit?.(value);
    setValue("");
    adjustHeight(true);
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div
        className={cn(
          "rounded-2xl border border-zinc-200 dark:border-zinc-800",
          "bg-white dark:bg-zinc-950",
          "shadow-[0_4px_32px_-4px_rgba(0,0,0,0.10)] dark:shadow-[0_4px_32px_-4px_rgba(0,0,0,0.5)]",
          "focus-within:shadow-[0_8px_40px_-4px_rgba(0,0,0,0.14)] dark:focus-within:shadow-[0_8px_40px_-4px_rgba(0,0,0,0.65)]",
          "focus-within:border-zinc-300 dark:focus-within:border-zinc-700",
          "transition-all duration-300",
          disabled && "opacity-50",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3.5 pb-0">
          <div className="flex items-center gap-2.5">
            {/* Avatar */}
            <div
              className={cn(
                "flex items-center justify-center size-7 rounded-xl",
                "bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600",
                "shadow-[0_2px_8px_rgba(139,92,246,0.4)]",
              )}
            >
              <Sparkles className="size-3.5 text-white" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-100 leading-none">
                {agentName}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="size-1.5 rounded-full bg-emerald-500 inline-block" />
                <span className="text-[10px] text-zinc-400 dark:text-zinc-600">Online</span>
              </div>
            </div>
          </div>

          {/* Settings dropdown */}
          <div className="relative">
            <button
              type="button"
              disabled={disabled}
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px]",
                "text-zinc-500 dark:text-zinc-400",
                "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                "transition-colors duration-150",
              )}
            >
              <Settings className="size-3.5" />
              <ChevronDown
                className={cn(
                  "size-3 transition-transform duration-200",
                  settingsOpen && "rotate-180",
                )}
              />
            </button>

            {settingsOpen && (
              <div
                className={cn(
                  "absolute top-full right-0 mt-1.5 z-50 w-52",
                  "rounded-xl border border-zinc-200 dark:border-zinc-800",
                  "bg-white dark:bg-zinc-950",
                  "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.16)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6)]",
                  "overflow-hidden",
                )}
              >
                {[
                  {
                    icon: Globe,
                    label: "Web search",
                    state: webSearch,
                    toggle: () => setWebSearch(!webSearch),
                  },
                  {
                    icon: Eye,
                    label: "Preview mode",
                    state: preview,
                    toggle: () => setPreview(!preview),
                  },
                ].map(({ icon: Icon, label, state, toggle }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={toggle}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2.5",
                      "text-sm text-zinc-700 dark:text-zinc-300",
                      "hover:bg-zinc-50 dark:hover:bg-zinc-900",
                      "transition-colors duration-100",
                      "border-b border-zinc-100 dark:border-zinc-800 last:border-0",
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="size-4 text-zinc-400" />
                      {label}
                    </div>
                    <div
                      className={cn(
                        "w-8 h-4.5 h-[18px] rounded-full transition-all duration-200",
                        "relative",
                        state ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-700",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute top-0.5 size-3.5 rounded-full bg-white dark:bg-zinc-900",
                          "shadow-sm transition-all duration-200",
                          state ? "left-[18px]" : "left-0.5",
                        )}
                      />
                    </div>
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
            "py-3.5 px-4",
            "text-[15px] text-zinc-800 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
            "outline-none border-none ring-0",
            "min-h-[60px] max-h-[200px]",
            "leading-relaxed",
          )}
        />

        {/* Active pills */}
        {(webSearch || preview) && (
          <div className="flex items-center gap-1.5 px-4 pb-0">
            {webSearch && (
              <span
                className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded-full",
                  "bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20",
                  "text-[11px] text-blue-500 font-medium",
                )}
              >
                <Globe className="size-3" />
                Web search on
              </span>
            )}
            {preview && (
              <span
                className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded-full",
                  "bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20",
                  "text-[11px] text-violet-500 font-medium",
                )}
              >
                <Eye className="size-3" />
                Preview on
              </span>
            )}
          </div>
        )}

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between px-3 pb-3 mt-2">
          <div className="flex items-center gap-0.5">
            {[
              { Icon: Paperclip, label: "Attach" },
              { Icon: ImageIcon, label: "Image" },
              { Icon: Mic, label: "Voice" },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                type="button"
                title={label}
                disabled={disabled}
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

          <button
            type="button"
            disabled={!value.trim() || disabled || isLoading}
            onClick={handleSubmit}
            className={cn(
              "flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-semibold",
              "transition-all duration-200",
              value.trim() && !isLoading
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 active:scale-[0.98] shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed",
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                Send message
                <ArrowUp className="size-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
