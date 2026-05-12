"use client";

import { useState } from "react";
import { Megaphone, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert11Props {
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export default function Alert11({
  message = "We've just released a new feature! Check out our improved dashboard.",
  actionLabel = "Learn more",
  onAction,
  onDismiss,
  className,
}: Alert11Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 200);
  };

  const handleAction = () => {
    onAction?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "absolute bottom-0 left-1/2 -translate-x-1/2 w-[750px] rounded-2xl bg-white overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "relative",
          "bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-800",
          "dark:from-zinc-100 dark:via-zinc-100 dark:to-zinc-200",
          "transition-all duration-200",
          isExiting && "opacity-0 -translate-y-full",
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 p-1 rounded-full bg-blue-500/20 dark:bg-blue-500/20">
                <Megaphone className="h-4 w-4 text-blue-400 dark:text-blue-600" />
              </span>
              <p className="text-sm text-zinc-100 dark:text-zinc-900">{message}</p>
            </div>

            <button
              onClick={handleAction}
              className={cn(
                "inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full",
                "bg-white/10 dark:bg-zinc-900/10 hover:bg-white/20 dark:hover:bg-zinc-900/20",
                "text-white dark:text-zinc-900",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-white/50",
              )}
            >
              {actionLabel}
              <ArrowRight className="h-3 w-3" />
            </button>

            <button
              onClick={handleDismiss}
              className={cn(
                "absolute right-4 p-1 rounded-md",
                "text-zinc-400 hover:text-zinc-200 dark:text-zinc-600 dark:hover:text-zinc-800",
                "hover:bg-white/10 dark:hover:bg-zinc-900/10",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-white/50",
              )}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
