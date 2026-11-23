"use client";

import { useState } from "react";
import { Bell, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert05Props {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export default function Alert05({
  title = "New notification",
  message = "You have a new message from the team.",
  actionLabel = "View",
  onAction,
  onDismiss,
  className,
}: Alert05Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 250);
  };

  const handleAction = () => {
    onAction?.();
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden",
          "bg-white/70 dark:bg-zinc-900/70",
          "backdrop-blur-xl backdrop-saturate-150",
          "border border-white/20 dark:border-zinc-700/50",
          "shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.1)_inset]",
          "dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)_inset]",
          "transition-all duration-250",
          isExiting && "opacity-0 translate-y-2 scale-95 blur-sm",
        )}
        role="alert"
        aria-live="polite"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent dark:from-white/5 pointer-events-none" />

        <div className="relative p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                <Bell className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
              <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {message}
              </p>

              <button
                onClick={handleAction}
                className={cn(
                  "inline-flex items-center gap-1 mt-3 text-xs font-medium",
                  "text-blue-600 dark:text-blue-400",
                  "hover:text-blue-700 dark:hover:text-blue-300",
                  "transition-colors duration-150",
                  "focus:outline-none focus:underline",
                )}
              >
                {actionLabel}
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>

            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0 p-1.5 rounded-lg",
                "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-blue-400",
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
