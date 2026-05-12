"use client";

import { useState } from "react";
import { Shield, X, Lock, Smartphone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecurityEvent {
  id: string;
  type: "login" | "device" | "password";
  title: string;
  description: string;
  time: string;
  icon: typeof Lock;
}

interface Alert19Props {
  title?: string;
  events?: SecurityEvent[];
  onReviewActivity?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const defaultEvents: SecurityEvent[] = [
  {
    id: "1",
    type: "login",
    title: "New login detected",
    description: "Chrome on MacOS • San Francisco, CA",
    time: "Just now",
    icon: Lock,
  },
  {
    id: "2",
    type: "device",
    title: "New device added",
    description: "iPhone 15 Pro",
    time: "2 hours ago",
    icon: Smartphone,
  },
  {
    id: "3",
    type: "password",
    title: "Recovery email updated",
    description: "j***@example.com",
    time: "Yesterday",
    icon: Mail,
  },
];

export default function Alert19({
  title = "Security Alert",
  events = defaultEvents,
  onReviewActivity,
  onDismiss,
  className,
}: Alert19Props) {
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
          "shadow-lg shadow-zinc-200/50 dark:shadow-zinc-950/50",
          "transition-all duration-200",
          isExiting && "opacity-0 scale-95",
        )}
        role="alert"
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
                <Shield className="h-5 w-5 text-white" />
              </div>

              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {title}
                </h3>
                <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                  Recent account activity
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

          <div className="mt-4 space-y-3">
            {events.map((event) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg",
                    "bg-zinc-50 dark:bg-zinc-800/50",
                  )}
                >
                  <div className="flex-shrink-0 p-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-700">
                    <Icon className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {event.title}
                      </p>
                      <span className="flex-shrink-0 text-[11px] text-zinc-500 dark:text-zinc-400">
                        {event.time}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400 truncate">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-4 bg-zinc-50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Wasn&apos;t you?{" "}
              <button
                className="font-medium text-red-600 dark:text-red-400 hover:underline focus:outline-none"
                onClick={() => {}}
              >
                Secure account
              </button>
            </p>
            <button
              onClick={onReviewActivity}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg",
                "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
                "hover:bg-zinc-800 dark:hover:bg-zinc-200",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2",
                "dark:focus:ring-offset-zinc-900",
              )}
            >
              Review activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
