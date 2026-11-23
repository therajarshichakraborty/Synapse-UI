"use client";

import { useState } from "react";
import { FileText, ChevronDown, ChevronUp, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert13Props {
  title?: string;
  summary?: string;
  details?: string;
  onDownload?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export default function Alert13({
  title = "Report Generated",
  summary = "Your monthly analytics report is ready for download.",
  details = "This report includes: page views, unique visitors, bounce rate, average session duration, top referrers, geographic distribution, device breakdown, and conversion metrics. The data covers the period from March 1 to March 31, 2024.",
  onDownload,
  onDismiss,
  className,
}: Alert13Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 200);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      onDownload?.();
    }, 1500);
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
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
              <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">{summary}</p>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  isExpanded ? "max-h-40 mt-3" : "max-h-0",
                )}
              >
                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {details}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg",
                    "bg-blue-600 hover:bg-blue-700 text-white",
                    "transition-colors duration-150",
                    "disabled:opacity-70",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    "dark:focus:ring-offset-zinc-900",
                  )}
                >
                  {isDownloading ? (
                    <>
                      <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-lg",
                    "text-zinc-600 dark:text-zinc-400",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    "transition-colors duration-150",
                    "focus:outline-none focus:ring-2 focus:ring-zinc-400",
                  )}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-3.5 w-3.5" />
                      Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3.5 w-3.5" />
                      Details
                    </>
                  )}
                </button>
              </div>
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
