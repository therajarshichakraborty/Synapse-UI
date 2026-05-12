"use client";

import { useState } from "react";
import { CreditCard, X, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert18Props {
  planName?: string;
  daysRemaining?: number;
  amount?: string;
  renewalDate?: string;
  onUpgrade?: () => void;
  onManageBilling?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export default function Alert18({
  planName = "Pro Plan",
  daysRemaining = 7,
  amount = "$29",
  renewalDate = "April 15, 2024",
  onUpgrade,
  onManageBilling,
  onDismiss,
  className,
}: Alert18Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const isUrgent = daysRemaining <= 3;

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
          "relative rounded-xl overflow-hidden",
          "bg-white dark:bg-zinc-900",
          "border",
          isUrgent
            ? "border-amber-200 dark:border-amber-800/50"
            : "border-zinc-200 dark:border-zinc-800",
          "shadow-lg",
          isUrgent
            ? "shadow-amber-100/50 dark:shadow-amber-950/20"
            : "shadow-zinc-200/50 dark:shadow-zinc-950/50",
          "transition-all duration-200",
          isExiting && "opacity-0 scale-95",
        )}
        role="alert"
      >
        {isUrgent && (
          <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200/50 dark:border-amber-800/30">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                Action required - subscription expiring soon
              </span>
            </div>
          </div>
        )}

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "flex-shrink-0 p-2.5 rounded-xl",
                  isUrgent
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25"
                    : "bg-gradient-to-br from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-600 shadow-lg",
                )}
              >
                <CreditCard className="h-5 w-5 text-white dark:text-zinc-900" />
              </div>

              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {planName}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {daysRemaining > 0 ? (
                    <>
                      Renews in <span className="font-medium">{daysRemaining} days</span> on{" "}
                      {renewalDate}
                    </>
                  ) : (
                    "Your subscription has expired"
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0 p-1 rounded-md",
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

          <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                  Next payment
                </p>
                <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {amount}
                  <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                    /month
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Payment method</p>
                <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  •••• 4242
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 bg-zinc-50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={onManageBilling}
              className={cn(
                "text-sm font-medium text-zinc-600 dark:text-zinc-400",
                "hover:text-zinc-900 dark:hover:text-zinc-100",
                "transition-colors duration-150",
                "focus:outline-none focus:underline",
              )}
            >
              Manage billing
            </button>
            <button
              onClick={onUpgrade}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg",
                "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
                "hover:bg-zinc-800 dark:hover:bg-zinc-200",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2",
                "dark:focus:ring-offset-zinc-900",
              )}
            >
              Upgrade plan
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
