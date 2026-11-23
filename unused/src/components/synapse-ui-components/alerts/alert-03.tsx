"use client";

import { useState } from "react";
import { CheckCircle2, X, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert03Props {
  title?: string;
  message?: string;
  undoLabel?: string;
  undoDuration?: number;
  onUndo?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export default function Alert03({
  title = "Item deleted",
  message = "The selected item has been moved to trash.",
  undoLabel = "Undo",
  undoDuration = 5000,
  onUndo,
  onDismiss,
  className,
}: Alert03Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isUndoing, setIsUndoing] = useState(false);

  useState(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / undoDuration) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        handleDismiss();
      }
    }, 50);

    return () => clearInterval(interval);
  });

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 200);
  };

  const handleUndo = () => {
    setIsUndoing(true);
    setTimeout(() => {
      onUndo?.();
      handleDismiss();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl",
          "bg-emerald-50 dark:bg-emerald-950/40",
          "border border-emerald-200 dark:border-emerald-800/50",
          "shadow-[0_2px_8px_0_rgba(16,185,129,0.08)]",
          "transition-all duration-200",
          isExiting && "opacity-0 translate-y-2 scale-95",
        )}
        role="alert"
        aria-live="polite"
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                {title}
              </h3>
              <p className="mt-0.5 text-[13px] text-emerald-700 dark:text-emerald-300/80">
                {message}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleUndo}
                disabled={isUndoing}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg",
                  "bg-emerald-600 hover:bg-emerald-700 text-white",
                  "transition-all duration-150",
                  "disabled:opacity-50",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                  "dark:focus:ring-offset-emerald-950",
                )}
                aria-label={undoLabel}
              >
                <Undo2 className={cn("h-3.5 w-3.5", isUndoing && "animate-spin")} />
                {undoLabel}
              </button>
              <button
                onClick={handleDismiss}
                className={cn(
                  "p-1.5 rounded-md",
                  "text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200",
                  "hover:bg-emerald-100 dark:hover:bg-emerald-900/50",
                  "transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-500",
                )}
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-1 bg-emerald-200/50 dark:bg-emerald-800/30">
          <div
            className="h-full bg-emerald-500 dark:bg-emerald-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
