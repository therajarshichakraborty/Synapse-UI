"use client";

import * as React from "react";
import { CornerDownLeft, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const COMMANDS = ["/help", "/new", "/clear", "/export", "/settings"] as const;

interface AIInput06Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput06({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Type a command or ask a question...",
  disabled = false,
  className,
}: AIInput06Props) {
  const [internalValue, setInternalValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const filteredCommands = value.startsWith("/")
    ? COMMANDS.filter((cmd) => cmd.startsWith(value))
    : [];

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSubmit?.(value);
    setValue("");
  };

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      {/* Command autocomplete */}
      {filteredCommands.length > 0 && (
        <div
          className={cn(
            "mb-1.5 rounded-xl overflow-hidden",
            "border border-zinc-800",
            "bg-zinc-950",
            "shadow-[0_-4px_24px_-4px_rgba(0,0,0,0.5)]",
          )}
        >
          {filteredCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => setValue(cmd + " ")}
              className={cn(
                "w-full text-left px-4 py-2 text-sm font-mono",
                "text-emerald-400 hover:bg-zinc-900",
                "transition-colors duration-100",
                "border-b border-zinc-800/50 last:border-0",
              )}
            >
              {cmd}
              <span className="ml-2 text-zinc-600 text-xs">command</span>
            </button>
          ))}
        </div>
      )}

      {/* Terminal box */}
      <div
        className={cn(
          "rounded-xl overflow-hidden",
          "border border-zinc-800",
          "bg-zinc-950",
          "shadow-[0_4px_32px_-4px_rgba(0,0,0,0.6)]",
          "transition-all duration-200",
          isFocused && "border-zinc-700 shadow-[0_4px_40px_-4px_rgba(0,0,0,0.8)]",
          disabled && "opacity-50",
        )}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/50">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-full bg-red-500/80" />
            <div className="size-3 rounded-full bg-amber-500/80" />
            <div className="size-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <Terminal className="size-3.5 text-zinc-500" />
            <span className="text-[11px] text-zinc-500 font-mono">synapse-ai — terminal</span>
          </div>
          <div className="ml-auto">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded",
                "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
              )}
            >
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              AI ready
            </span>
          </div>
        </div>

        {/* Input area */}
        <div className="flex items-center gap-2 px-4 py-3.5">
          <span className="text-emerald-400 font-mono text-sm select-none">❯</span>
          <input
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className={cn(
              "flex-1 bg-transparent outline-none",
              "text-sm font-mono",
              "text-zinc-100 placeholder:text-zinc-600",
              "disabled:cursor-not-allowed",
            )}
          />
          <kbd
            className={cn(
              "hidden sm:flex items-center gap-1",
              "h-6 px-2 rounded-md",
              "border border-zinc-700 bg-zinc-800",
              "font-mono text-[10px] text-zinc-400",
              "transition-opacity duration-200",
              value.trim() ? "opacity-100" : "opacity-40",
            )}
          >
            <CornerDownLeft className="size-3" />
            return
          </kbd>
        </div>

        {/* Bottom quick commands */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-t border-zinc-800/50 bg-zinc-900/30">
          <span className="text-[10px] text-zinc-600 font-mono mr-1">quick:</span>
          {COMMANDS.slice(0, 4).map((cmd) => (
            <button
              key={cmd}
              type="button"
              disabled={disabled}
              onClick={() => setValue(cmd + " ")}
              className={cn(
                "px-2 py-0.5 rounded text-[10px] font-mono",
                "border border-zinc-800 bg-zinc-900",
                "text-zinc-500 hover:text-zinc-300 hover:border-zinc-700",
                "transition-colors duration-100",
              )}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
