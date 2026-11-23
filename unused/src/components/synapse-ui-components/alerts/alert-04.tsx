"use client";

import { useState } from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert04Props {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}

export default function Alert04({
  title = "Delete project?",
  message = "This action cannot be undone. All data associated with this project will be permanently removed.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  className,
}: Alert04Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCancel = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onCancel?.();
    }, 200);
  };

  const handleConfirm = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onConfirm?.();
      handleCancel();
    }, 800);
  };

  if (!isVisible) return null;

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-xl overflow-hidden",
          "bg-white dark:bg-zinc-900",
          "border border-red-200 dark:border-red-900/50",
          "shadow-[0_4px_16px_0_rgba(239,68,68,0.1)] dark:shadow-[0_4px_16px_0_rgba(239,68,68,0.05)]",
          "transition-all duration-200",
          isExiting && "opacity-0 scale-95",
        )}
        role="alertdialog"
        aria-labelledby="alert-title"
        aria-describedby="alert-description"
      >
        <div className="p-5">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="p-2.5 rounded-full bg-red-100 dark:bg-red-950/50">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <div className="flex-1">
              <h3
                id="alert-title"
                className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
              >
                {title}
              </h3>
              <p
                id="alert-description"
                className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
              >
                {message}
              </p>
            </div>

            <button
              onClick={handleCancel}
              className={cn(
                "flex-shrink-0 self-start p-1 rounded-md -mt-1 -mr-1",
                "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400",
              )}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg",
                "text-zinc-700 dark:text-zinc-300",
                "bg-white dark:bg-zinc-800",
                "border border-zinc-300 dark:border-zinc-700",
                "hover:bg-zinc-50 dark:hover:bg-zinc-700",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2",
                "dark:focus:ring-offset-zinc-900",
              )}
            >
              {cancelLabel}
            </button>
            <button
              onClick={handleConfirm}
              disabled={isDeleting}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg",
                "bg-red-600 hover:bg-red-700 text-white",
                "transition-all duration-150",
                "disabled:opacity-70 disabled:cursor-not-allowed",
                "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
                "dark:focus:ring-offset-zinc-900",
              )}
            >
              {isDeleting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  {confirmLabel}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
