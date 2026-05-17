"use client";

import { cn } from "@/lib/utils";
import { MoreVertical, Reply, Forward, Trash2 } from "lucide-react";
import { useState } from "react";

interface ListItem {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  avatar: string;
  unread: boolean;
  starred?: boolean;
}

interface List19Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    sender: "GitHub",
    subject: "New pull request on project-alpha",
    preview: "alexdev opened a new pull request #142: Implement user authentication...",
    time: "10:42 AM",
    avatar: "GH",
    unread: true,
  },
  {
    id: "2",
    sender: "Linear",
    subject: "Weekly summary for your team",
    preview: "Your team completed 23 issues this week. Here is your progress report...",
    time: "9:15 AM",
    avatar: "LN",
    unread: true,
  },
  {
    id: "3",
    sender: "Vercel",
    subject: "Deployment successful",
    preview: "Your deployment to production was successful. View the changes at...",
    time: "Yesterday",
    avatar: "VC",
    unread: false,
  },
];

export default function List19({ items = ITEMS, className }: List19Props) {
  const [emails, setEmails] = useState(items);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const markAsRead = (id: string) => {
    setEmails((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  };

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto rounded-2xl overflow-hidden",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        className,
      )}
    >
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {emails.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedId(item.id);
              markAsRead(item.id);
            }}
            className={cn(
              "group relative flex gap-4 p-4 cursor-pointer transition-colors",
              selectedId === item.id
                ? "bg-blue-50 dark:bg-blue-900/20"
                : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
              item.unread && "bg-zinc-50/50 dark:bg-zinc-800/30",
            )}
          >
            {item.unread && (
              <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500" />
            )}
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
                "bg-gradient-to-br from-zinc-700 to-zinc-900 text-white",
              )}
            >
              {item.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className={cn(
                    "font-semibold truncate",
                    item.unread
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-700 dark:text-zinc-300",
                  )}
                >
                  {item.sender}
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0">
                  {item.time}
                </span>
              </div>
              <h3
                className={cn(
                  "truncate mb-0.5",
                  item.unread
                    ? "font-semibold text-zinc-900 dark:text-zinc-100"
                    : "font-medium text-zinc-700 dark:text-zinc-300",
                )}
              >
                {item.subject}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{item.preview}</p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500">
                <Reply className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500">
                <Forward className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-zinc-500 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
