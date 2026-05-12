"use client";

import { useState } from "react";
import { Sparkles, X, Copy, Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert02Props {
  title?: string;
  message?: string;
  code?: string;
  onDismiss?: () => void;
  onRetry?: () => void;
  className?: string;
}

export default function Alert02({
  title = "AI Response",
  message = "Here's a suggestion based on your query:",
  code = "const greeting = 'Hello, World!';",
  onDismiss,
  onRetry,
  className,
}: Alert02Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 200);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      onRetry?.();
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className={cn("w-full max-w-lg mx-auto", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl",
          "bg-gradient-to-b from-violet-50 to-white dark:from-violet-950/30 dark:to-zinc-900",
          "border border-violet-200/60 dark:border-violet-800/30",
          "shadow-[0_4px_12px_0_rgba(139,92,246,0.08)] dark:shadow-[0_4px_12px_0_rgba(139,92,246,0.05)]",
          "transition-all duration-200",
          isExiting && "opacity-0 scale-95",
        )}
        role="alert"
        aria-live="polite"
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/50">
                <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
                <span className="px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300">
                  AI
                </span>
              </div>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400 mb-3">{message}</p>

              <div className="relative group">
                <pre className="p-3 rounded-lg bg-zinc-900 dark:bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                  <code>{code}</code>
                </pre>
                <button
                  onClick={handleCopy}
                  className={cn(
                    "absolute top-2 right-2 p-1.5 rounded-md",
                    "bg-zinc-800 hover:bg-zinc-700",
                    "text-zinc-400 hover:text-zinc-200",
                    "opacity-0 group-hover:opacity-100",
                    "transition-all duration-150",
                    "focus:outline-none focus:opacity-100 focus:ring-2 focus:ring-violet-500",
                  )}
                  aria-label={isCopied ? "Copied" : "Copy code"}
                >
                  {isCopied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0 p-1 rounded-md",
                "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2",
                "dark:focus:ring-offset-zinc-900",
              )}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="px-4 py-3 bg-zinc-50/80 dark:bg-zinc-800/30 border-t border-zinc-200/60 dark:border-zinc-700/50">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg",
                "text-zinc-600 dark:text-zinc-400",
                "hover:bg-zinc-100 dark:hover:bg-zinc-700/50",
                "transition-colors duration-150",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "focus:outline-none focus:ring-2 focus:ring-violet-400",
              )}
            >
              <RotateCcw className={cn("h-3.5 w-3.5", isRetrying && "animate-spin")} />
              Regenerate
            </button>
            <button
              onClick={handleCopy}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg",
                "bg-violet-600 hover:bg-violet-700 text-white",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2",
                "dark:focus:ring-offset-zinc-900",
              )}
            >
              {isCopied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
