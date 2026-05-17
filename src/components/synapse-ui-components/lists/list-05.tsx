"use client";

import { cn } from "@/lib/utils";
import { FileText, Image, Film, File, Download, Trash2 } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface ListItem {
  id: string;
  name: string;
  size: string;
  type: "document" | "image" | "video" | "other";
  date: string;
}

interface List05Props {
  items?: ListItem[];
  className?: string;
}

const typeConfig: Record<string, { icon: LucideIcon; bg: string; color: string }> = {
  document: {
    icon: FileText,
    bg: "bg-blue-100 dark:bg-blue-900/30",
    color: "text-blue-600 dark:text-blue-400",
  },
  image: {
    icon: Image,
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  video: {
    icon: Film,
    bg: "bg-purple-100 dark:bg-purple-900/30",
    color: "text-purple-600 dark:text-purple-400",
  },
  other: {
    icon: File,
    bg: "bg-zinc-100 dark:bg-zinc-800",
    color: "text-zinc-600 dark:text-zinc-400",
  },
};

const ITEMS: ListItem[] = [
  {
    id: "1",
    name: "Project_Proposal.pdf",
    size: "2.4 MB",
    type: "document",
    date: "Today",
  },
  {
    id: "2",
    name: "Design_Assets.zip",
    size: "156 MB",
    type: "image",
    date: "Yesterday",
  },
  {
    id: "3",
    name: "Demo_Recording.mp4",
    size: "89 MB",
    type: "video",
    date: "Mar 12",
  },
];

export default function List05({ items = ITEMS, className }: List05Props) {
  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto rounded-2xl overflow-hidden",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        className,
      )}
    >
      <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Recent Files</h2>
      </div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {items.map((item) => {
          const config = typeConfig[item.type];
          const TypeIcon = config.icon;
          return (
            <div
              key={item.id}
              className="group flex items-center gap-4 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <div
                className={cn("w-11 h-11 rounded-xl flex items-center justify-center", config.bg)}
              >
                <TypeIcon className={cn("w-5 h-5", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{item.size}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{item.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
