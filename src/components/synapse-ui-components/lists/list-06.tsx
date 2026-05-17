"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface ListItem {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
}

interface List06Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    label: "Total Revenue",
    value: "$48,352",
    change: 12.5,
    trend: "up",
  },
  {
    id: "2",
    label: "Active Users",
    value: "2,847",
    change: -3.2,
    trend: "down",
  },
  {
    id: "3",
    label: "Conversion Rate",
    value: "3.24%",
    change: 0,
    trend: "neutral",
  },
  {
    id: "4",
    label: "Avg. Session",
    value: "4m 23s",
    change: 8.1,
    trend: "up",
  },
];

const trendConfig = {
  up: {
    icon: ArrowUpRight,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  down: {
    icon: ArrowDownRight,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  neutral: {
    icon: Minus,
    color: "text-zinc-500 dark:text-zinc-400",
    bg: "bg-zinc-100 dark:bg-zinc-800",
  },
};

export default function List06({ items = ITEMS, className }: List06Props) {
  return (
    <div className={cn("w-full max-w-md mx-auto grid grid-cols-2 gap-3", className)}>
      {items.map((item) => {
        const config = trendConfig[item.trend];
        const TrendIcon = config.icon;
        return (
          <div
            key={item.id}
            className={cn(
              "p-5 rounded-2xl",
              "bg-white dark:bg-zinc-900",
              "border border-zinc-100 dark:border-zinc-800",
              "hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50",
              "transition-shadow duration-300",
            )}
          >
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{item.label}</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{item.value}</p>
            <div
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium",
                config.bg,
                config.color,
              )}
            >
              <TrendIcon className="w-4 h-4" />
              <span>{Math.abs(item.change)}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
