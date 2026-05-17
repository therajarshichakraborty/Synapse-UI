"use client";

import { cn } from "@/lib/utils";
import { Check, Clock, AlertCircle, type LucideIcon } from "lucide-react";

interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  status: "completed" | "pending" | "failed";
  progress?: number;
}

interface List03Props {
  items?: ListItem[];
  className?: string;
}

const statusConfig = {
  completed: {
    icon: Check,
    bg: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Completed",
  },
  pending: {
    icon: Clock,
    bg: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    label: "Pending",
  },
  failed: {
    icon: AlertCircle,
    bg: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    label: "Failed",
  },
};

const ITEMS: ListItem[] = [
  {
    id: "1",
    title: "Database Migration",
    subtitle: "Production server",
    status: "completed",
    progress: 100,
  },
  {
    id: "2",
    title: "API Integration",
    subtitle: "Payment gateway",
    status: "pending",
    progress: 65,
  },
  {
    id: "3",
    title: "SSL Certificate",
    subtitle: "Domain renewal",
    status: "failed",
    progress: 0,
  },
];

export default function List03({ items = ITEMS, className }: List03Props) {
  return (
    <div
      className={cn(
        "w-full max-w-lg mx-auto rounded-2xl overflow-hidden",
        "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
        "shadow-lg shadow-zinc-200/50 dark:shadow-zinc-900/50",
        className,
      )}
    >
      {items.map((item, index) => {
        const config = statusConfig[item.status];
        const StatusIcon = config.icon;
        return (
          <div
            key={item.id}
            className={cn(
              "p-5",
              index !== items.length - 1 && "border-b border-zinc-100 dark:border-zinc-800",
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-white",
                    config.bg,
                  )}
                >
                  <StatusIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.subtitle}</p>
                </div>
              </div>
              <span className={cn("text-sm font-medium", config.text)}>{config.label}</span>
            </div>
            {item.progress !== undefined && (
              <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all", config.bg)}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
