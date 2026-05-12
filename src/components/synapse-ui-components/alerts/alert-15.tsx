"use client";

import { useState } from "react";
import { Download, X, RefreshCw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert15Props {
  version?: string;
  currentVersion?: string;
  releaseNotes?: string;
  onUpdate?: () => void;
  onRemindLater?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export default function Alert15({
  version = "2.4.0",
  currentVersion = "2.3.1",
  releaseNotes = "This update includes performance improvements, bug fixes, and new collaboration features.",
  onUpdate,
  onRemindLater,
  onDismiss,
  className,
}: Alert15Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 200);
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    const interval = setInterval(() => {
      setUpdateProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onUpdate?.();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemindLater = () => {
    onRemindLater?.();
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-xl overflow-hidden",
          "bg-gradient-to-br from-blue-50 via-white to-indigo-50",
          "dark:from-blue-950/30 dark:via-zinc-900 dark:to-indigo-950/30",
          "border border-blue-200/60 dark:border-blue-800/30",
          "shadow-lg shadow-blue-100/50 dark:shadow-blue-950/20",
          "transition-all duration-200",
          isExiting && "opacity-0 scale-95",
        )}
        role="alert"
      >
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                <Download className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Update Available
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                  v{version}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{releaseNotes}</p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                Current: v{currentVersion} → New: v{version}
              </p>
            </div>

            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0 p-1 rounded-md",
                "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-blue-400",
              )}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {isUpdating && (
            <div className="mt-4">
              <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-200"
                  style={{ width: `${updateProgress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-center text-zinc-500 dark:text-zinc-400">
                {updateProgress < 100 ? `Updating... ${updateProgress}%` : "Update complete!"}
              </p>
            </div>
          )}

          {!isUpdating && (
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={handleRemindLater}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg",
                  "text-zinc-600 dark:text-zinc-400",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  "transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-zinc-400",
                )}
              >
                Remind later
              </button>
              <button
                onClick={handleUpdate}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg",
                  "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
                  "text-white shadow-sm",
                  "transition-all duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  "dark:focus:ring-offset-zinc-900",
                )}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Update now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
