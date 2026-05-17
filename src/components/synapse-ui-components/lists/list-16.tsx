"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { X, Plus, GripVertical } from "lucide-react";

interface ListItem {
  id: string;
  title: string;
  color: string;
}

interface List16Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  { id: "1", title: "Personal", color: "bg-blue-500" },
  { id: "2", title: "Work", color: "bg-emerald-500" },
  { id: "3", title: "Shopping", color: "bg-amber-500" },
  { id: "4", title: "Health", color: "bg-rose-500" },
];

export default function List16({ items = ITEMS, className }: List16Props) {
  const [tags, setTags] = useState(items);
  const [newTag, setNewTag] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-purple-500",
    "bg-cyan-500",
  ];

  const addTag = () => {
    if (newTag.trim()) {
      setTags((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          title: newTag.trim(),
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ]);
      setNewTag("");
      setIsAdding(false);
    }
  };

  const removeTag = (id: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm mx-auto p-5 rounded-2xl",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Tags</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={cn(
              "group flex items-center gap-3 p-3 rounded-xl",
              "bg-zinc-50 dark:bg-zinc-800/50",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "transition-colors cursor-pointer",
            )}
          >
            <GripVertical className="w-4 h-4 text-zinc-300 dark:text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={cn("w-3 h-3 rounded-full shrink-0", tag.color)} />
            <span className="flex-1 font-medium text-zinc-700 dark:text-zinc-300">{tag.title}</span>
            <button
              onClick={() => removeTag(tag.id)}
              className="p-1 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {isAdding && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0" />
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              placeholder="Tag name..."
              autoFocus
              className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none"
            />
            <button
              onClick={() => setIsAdding(false)}
              className="p-1 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
