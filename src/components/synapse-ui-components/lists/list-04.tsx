"use client";

import { cn } from "@/lib/utils";
import { Star, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface ListItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  starred?: boolean;
}

interface List04Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    name: "Emma Wilson",
    email: "emma@company.com",
    avatar: "EW",
    role: "Product Designer",
    starred: true,
  },
  {
    id: "2",
    name: "James Chen",
    email: "james@company.com",
    avatar: "JC",
    role: "Senior Developer",
    starred: false,
  },
  {
    id: "3",
    name: "Sofia Martinez",
    email: "sofia@company.com",
    avatar: "SM",
    role: "Marketing Lead",
    starred: true,
  },
];

const avatarColors = [
  "bg-gradient-to-br from-rose-400 to-rose-600",
  "bg-gradient-to-br from-cyan-400 to-cyan-600",
  "bg-gradient-to-br from-amber-400 to-amber-600",
];

export default function List04({ items = ITEMS, className }: List04Props) {
  const [starredItems, setStarredItems] = useState<Record<string, boolean>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.starred }), {}),
  );

  const toggleStar = (id: string) => {
    setStarredItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={cn("w-full max-w-xl mx-auto space-y-2", className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "group flex items-center gap-4 p-4 rounded-xl",
            "bg-white dark:bg-zinc-900",
            "border border-zinc-100 dark:border-zinc-800",
            "hover:border-zinc-200 dark:hover:border-zinc-700",
            "hover:shadow-md transition-all duration-200",
          )}
        >
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm",
              avatarColors[index % avatarColors.length],
            )}
          >
            {item.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{item.email}</p>
          </div>
          <span className="hidden sm:block px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            {item.role}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleStar(item.id)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                starredItems[item.id]
                  ? "text-amber-500"
                  : "text-zinc-300 dark:text-zinc-600 hover:text-amber-500",
              )}
            >
              <Star className="w-5 h-5" fill={starredItems[item.id] ? "currentColor" : "none"} />
            </button>
            <button className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
