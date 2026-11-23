"use client";

import { useState } from "react";
import { Activity, X, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
}

interface Alert16Props {
  title?: string;
  activities?: ActivityItem[];
  onViewAll?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    user: "Sarah",
    avatar: "S",
    action: "commented on",
    target: "Design Review",
    time: "2m ago",
  },
  {
    id: "2",
    user: "Mike",
    avatar: "M",
    action: "merged",
    target: "PR #234",
    time: "15m ago",
  },
  {
    id: "3",
    user: "Emma",
    avatar: "E",
    action: "completed",
    target: "Dashboard UI",
    time: "1h ago",
  },
];

export default function Alert16({
  title = "Recent Activity",
  activities = defaultActivities,
  onViewAll,
  onDismiss,
  className,
}: Alert16Props) {
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
    <div className={cn("w-full max-w-sm mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-xl overflow-hidden",
          "bg-white dark:bg-zinc-900",
          "border border-zinc-200 dark:border-zinc-800",
          "shadow-lg shadow-zinc-200/50 dark:shadow-zinc-950/50",
          "transition-all duration-200",
          isExiting && "opacity-0 scale-95",
        )}
        role="log"
        aria-label={title}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
          </div>
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

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3",
                "hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
                "transition-colors duration-150",
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full",
                  "flex items-center justify-center",
                  "bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800",
                  "text-xs font-semibold text-zinc-700 dark:text-zinc-300",
                )}
              >
                {activity.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-700 dark:text-zinc-300 truncate">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {activity.user}
                  </span>{" "}
                  {activity.action}{" "}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {activity.target}
                  </span>
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-500">{activity.time}</p>
              </div>

              <button
                className={cn(
                  "flex-shrink-0 p-1 rounded-md opacity-0 group-hover:opacity-100",
                  "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  "transition-all duration-150",
                  "focus:outline-none focus:opacity-100 focus:ring-2 focus:ring-zinc-400",
                )}
                aria-label="More options"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={onViewAll}
            className={cn(
              "w-full py-1.5 text-xs font-medium text-center rounded-lg",
              "text-zinc-600 dark:text-zinc-400",
              "hover:bg-zinc-100 dark:hover:bg-zinc-700",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-zinc-400",
            )}
          >
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
}
