"use client";

import { useState } from "react";
import { Info, ChevronDown, ChevronUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StackedItem {
  id: string;
  title: string;
  message: string;
  time: string;
}

interface Alert06Props {
  items?: StackedItem[];
  onDismiss?: (id: string) => void;
  onDismissAll?: () => void;
  className?: string;
}

const defaultItems: StackedItem[] = [
  {
    id: "1",
    title: "System update available",
    message: "A new version is ready to install.",
    time: "2m ago",
  },
  {
    id: "2",
    title: "Backup completed",
    message: "Your data has been backed up successfully.",
    time: "5m ago",
  },
  {
    id: "3",
    title: "New comment",
    message: "Someone commented on your post.",
    time: "12m ago",
  },
];

export default function Alert06({
  items = defaultItems,
  onDismiss,
  onDismissAll,
  className,
}: Alert06Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleItems, setVisibleItems] = useState<StackedItem[]>(items);
  const [exitingId, setExitingId] = useState<string | null>(null);

  const handleDismissItem = (id: string) => {
    setExitingId(id);
    setTimeout(() => {
      setVisibleItems((prev) => prev.filter((item) => item.id !== id));
      setExitingId(null);
      onDismiss?.(id);
    }, 200);
  };

  const handleDismissAll = () => {
    setVisibleItems([]);
    onDismissAll?.();
  };

  if (visibleItems.length === 0) return null;

  const displayedItems = isExpanded ? visibleItems : visibleItems.slice(0, 1);

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="space-y-2">
        {displayedItems.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "relative rounded-xl overflow-hidden",
              "bg-white dark:bg-zinc-900",
              "border border-zinc-200 dark:border-zinc-800",
              "shadow-sm",
              "transition-all duration-200",
              exitingId === item.id && "opacity-0 scale-95 -translate-x-4",
              !isExpanded && index > 0 && "hidden",
            )}
            style={{
              zIndex: visibleItems.length - index,
            }}
            role="alert"
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/50">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {item.title}
                    </h3>
                    <span className="flex-shrink-0 text-[11px] text-zinc-400 dark:text-zinc-500">
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400 truncate">
                    {item.message}
                  </p>
                </div>

                <button
                  onClick={() => handleDismissItem(item.id)}
                  className={cn(
                    "flex-shrink-0 p-1 rounded-md",
                    "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    "transition-colors duration-150",
                    "focus:outline-none focus:ring-2 focus:ring-blue-400",
                  )}
                  aria-label="Dismiss"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {visibleItems.length > 1 && (
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md",
                "text-zinc-600 dark:text-zinc-400",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-blue-400",
              )}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  {visibleItems.length - 1} more notification{visibleItems.length > 2 ? "s" : ""}
                </>
              )}
            </button>

            <button
              onClick={handleDismissAll}
              className={cn(
                "px-2 py-1 text-xs font-medium rounded-md",
                "text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-blue-400",
              )}
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
