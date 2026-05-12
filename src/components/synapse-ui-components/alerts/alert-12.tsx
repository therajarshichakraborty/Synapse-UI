"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, X, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

interface Alert12Props {
  type?: ToastType;
  title?: string;
  message?: string;
  duration?: number;
  onDismiss?: () => void;
  className?: string;
}

const toastConfig: Record<
  ToastType,
  {
    icon: typeof CheckCircle2;
    accentColor: string;
    iconColor: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    accentColor: "from-emerald-500",
    iconColor: "text-emerald-500",
  },
  error: {
    icon: AlertCircle,
    accentColor: "from-red-500",
    iconColor: "text-red-500",
  },
  info: {
    icon: Info,
    accentColor: "from-blue-500",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    accentColor: "from-amber-500",
    iconColor: "text-amber-500",
  },
};

export default function Alert12({
  type = "success",
  title = "Success",
  message = "Your action was completed successfully.",
  duration = 5000,
  onDismiss,
  className,
}: Alert12Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration <= 0) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        handleDismiss();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <div className={cn("w-full max-w-sm mx-auto", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl",
          "bg-white dark:bg-zinc-900",
          "border border-zinc-200 dark:border-zinc-800",
          "shadow-lg shadow-zinc-200/50 dark:shadow-zinc-950/50",
          "transition-all duration-200",
          isExiting && "opacity-0 translate-x-8 scale-95",
        )}
        role="alert"
        aria-live="assertive"
      >
        <div
          className={cn(
            "absolute top-0 left-0 w-1 h-full",
            "bg-gradient-to-b",
            config.accentColor,
            "to-transparent",
          )}
        />

        <div className="p-4 pl-5">
          <div className="flex items-start gap-3">
            <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.iconColor)} />

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
              <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">{message}</p>
            </div>

            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0 p-1 rounded-md -mt-1 -mr-1",
                "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400",
              )}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {duration > 0 && (
          <div className="h-0.5 bg-zinc-100 dark:bg-zinc-800">
            <div
              className={cn(
                "h-full bg-gradient-to-r",
                config.accentColor,
                "to-transparent",
                "transition-all duration-100 ease-linear",
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
