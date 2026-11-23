"use client";

import { cn } from "@/lib/utils";
import { Bell, Calendar, Mail, type LucideIcon } from "lucide-react";

interface ListItem {
  id: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  time: string;
  unread?: boolean;
}

interface List02Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    title: "New email received",
    description: "Sarah sent you a project update",
    icon: Mail,
    time: "Just now",
    unread: true,
  },
  {
    id: "2",
    title: "Meeting reminder",
    description: "Team standup in 15 minutes",
    icon: Calendar,
    time: "15 min",
    unread: true,
  },
  {
    id: "3",
    title: "System notification",
    description: "Your backup completed successfully",
    icon: Bell,
    time: "1 hour ago",
    unread: false,
  },
];

export default function List02({ items = ITEMS, className }: List02Props) {
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center gap-4 p-4 transition-colors duration-200",
              "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer",
              item.unread && "bg-blue-50/50 dark:bg-blue-950/20",
            )}
          >
            <div
              className={cn(
                "shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                item.unread
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400",
              )}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className={cn(
                    "text-sm truncate",
                    item.unread
                      ? "font-semibold text-zinc-900 dark:text-zinc-100"
                      : "font-medium text-zinc-700 dark:text-zinc-300",
                  )}
                >
                  {item.title}
                </h3>
                {item.unread && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
              </div>
              {item.description && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {item.description}
                </p>
              )}
            </div>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
