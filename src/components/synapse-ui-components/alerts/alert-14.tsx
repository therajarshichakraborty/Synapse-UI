"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricData {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
}

interface Alert14Props {
  title?: string;
  metrics?: MetricData[];
  onViewDetails?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const defaultMetrics: MetricData[] = [
  { label: "Revenue", value: "$12.4K", change: 12.5, trend: "up" },
  { label: "Users", value: "2,340", change: 8.2, trend: "up" },
  { label: "Bounce Rate", value: "24%", change: -3.1, trend: "down" },
];

export default function Alert14({
  title = "Weekly Performance",
  metrics = defaultMetrics,
  onViewDetails,
  onDismiss,
  className,
}: Alert14Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

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
          "border border-zinc-200 dark:border-zinc-800",
          "shadow-sm",
          "transition-all duration-200",
          isExiting && "opacity-0 scale-95",
        )}
        role="alert"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
          <button
            onClick={handleDismiss}
            className={cn(
              "p-1 rounded-md",
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

        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <p className="text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                  {metric.label}
                </p>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{metric.value}</p>
                <div
                  className={cn(
                    "inline-flex items-center gap-0.5 mt-1 text-xs font-medium",
                    metric.trend === "up"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400",
                  )}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={onViewDetails}
            className={cn(
              "w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg",
              "text-zinc-700 dark:text-zinc-300",
              "hover:bg-zinc-100 dark:hover:bg-zinc-700",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-zinc-400",
            )}
          >
            View detailed analytics
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
