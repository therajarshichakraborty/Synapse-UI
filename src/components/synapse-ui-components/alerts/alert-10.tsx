"use client";

import { useState } from "react";
import { Terminal, X, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert10Props {
  command?: string;
  output?: string;
  status?: "success" | "error" | "running";
  onDismiss?: () => void;
  className?: string;
}

export default function Alert10({
  command = "npm install synapse-ui",
  output = "added 42 packages in 2.3s",
  status = "success",
  onDismiss,
  className,
}: Alert10Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 200);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className={cn("w-full max-w-lg mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-lg overflow-hidden",
          "bg-zinc-950 dark:bg-zinc-950",
          "border border-zinc-800",
          "shadow-2xl",
          "transition-all duration-200",
          isExiting && "opacity-0 scale-95",
        )}
        role="alert"
      >
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-2 text-xs font-medium text-zinc-400">Terminal</span>
          </div>
          <button
            onClick={handleDismiss}
            className={cn(
              "p-1 rounded-md",
              "text-zinc-500 hover:text-zinc-300",
              "hover:bg-zinc-800",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-zinc-600",
            )}
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="p-4 font-mono text-sm">
          <div className="flex items-start gap-2 group">
            <span className="text-emerald-400 select-none">$</span>
            <code className="flex-1 text-zinc-100">{command}</code>
            <button
              onClick={handleCopy}
              className={cn(
                "p-1 rounded opacity-0 group-hover:opacity-100",
                "text-zinc-500 hover:text-zinc-300",
                "hover:bg-zinc-800",
                "transition-all duration-150",
                "focus:outline-none focus:opacity-100 focus:ring-2 focus:ring-zinc-600",
              )}
              aria-label="Copy command"
            >
              {isCopied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {output && (
            <div className="mt-3 pl-4 border-l-2 border-zinc-800">
              <code
                className={cn(
                  "text-xs",
                  status === "success" && "text-emerald-400",
                  status === "error" && "text-red-400",
                  status === "running" && "text-yellow-400",
                )}
              >
                {status === "running" && <span className="inline-block animate-pulse mr-2">●</span>}
                {output}
              </code>
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-zinc-900/50 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  status === "success" && "bg-emerald-400",
                  status === "error" && "bg-red-400",
                  status === "running" && "bg-yellow-400 animate-pulse",
                )}
              />
              <span className="text-[11px] text-zinc-500 capitalize">{status}</span>
            </div>
            <span className="text-[11px] text-zinc-600">zsh</span>
          </div>
        </div>
      </div>
    </div>
  );
}
