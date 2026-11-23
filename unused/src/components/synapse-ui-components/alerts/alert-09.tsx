"use client";

import { useState } from "react";
import { CheckCircle2, X, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertType = "success" | "info" | "warning" | "error";

interface Alert09Props {
  type?: AlertType;
  title?: string;
  message?: string;
  onDismiss?: () => void;
  className?: string;
}

const alertConfig: Record<
  AlertType,
  {
    icon: typeof CheckCircle2;
    bgColor: string;
    borderColor: string;
    iconColor: string;
    titleColor: string;
    messageColor: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    bgColor: "bg-white dark:bg-zinc-900",
    borderColor: "border-l-4 border-l-emerald-500 border-zinc-200 dark:border-zinc-800",
    iconColor: "text-emerald-500",
    titleColor: "text-zinc-900 dark:text-zinc-100",
    messageColor: "text-zinc-600 dark:text-zinc-400",
  },
  info: {
    icon: Info,
    bgColor: "bg-white dark:bg-zinc-900",
    borderColor: "border-l-4 border-l-blue-500 border-zinc-200 dark:border-zinc-800",
    iconColor: "text-blue-500",
    titleColor: "text-zinc-900 dark:text-zinc-100",
    messageColor: "text-zinc-600 dark:text-zinc-400",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-white dark:bg-zinc-900",
    borderColor: "border-l-4 border-l-amber-500 border-zinc-200 dark:border-zinc-800",
    iconColor: "text-amber-500",
    titleColor: "text-zinc-900 dark:text-zinc-100",
    messageColor: "text-zinc-600 dark:text-zinc-400",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-white dark:bg-zinc-900",
    borderColor: "border-l-4 border-l-red-500 border-zinc-200 dark:border-zinc-800",
    iconColor: "text-red-500",
    titleColor: "text-zinc-900 dark:text-zinc-100",
    messageColor: "text-zinc-600 dark:text-zinc-400",
  },
};

export default function Alert09({
  type = "success",
  title = "Operation successful",
  message = "Your changes have been saved and applied.",
  onDismiss,
  className,
}: Alert09Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const config = alertConfig[type];
  const Icon = config.icon;

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-lg overflow-hidden",
          config.bgColor,
          config.borderColor,
          "border shadow-sm",
          "transition-all duration-200",
          isExiting && "opacity-0 translate-x-4",
        )}
        role="alert"
        aria-live="polite"
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.iconColor)} />

            <div className="flex-1 min-w-0">
              <h3 className={cn("text-sm font-semibold", config.titleColor)}>{title}</h3>
              <p className={cn("mt-1 text-sm", config.messageColor)}>{message}</p>
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
      </div>
    </div>
  );
}
