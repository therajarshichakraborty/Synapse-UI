"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check, Circle, Trash2 } from "lucide-react";

interface ListItem {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

interface List07Props {
  items?: ListItem[];
  className?: string;
}

const priorityColors = {
  high: "border-l-red-500",
  medium: "border-l-amber-500",
  low: "border-l-blue-500",
};

const ITEMS: ListItem[] = [
  {
    id: "1",
    text: "Review quarterly report",
    completed: false,
    priority: "high",
  },
  {
    id: "2",
    text: "Schedule team meeting",
    completed: true,
    priority: "medium",
  },
  {
    id: "3",
    text: "Update documentation",
    completed: false,
    priority: "low",
  },
  {
    id: "4",
    text: "Send client proposal",
    completed: false,
    priority: "high",
  },
];

export default function List07({ items = ITEMS, className }: List07Props) {
  const [todos, setTodos] = useState(items);

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  };

  const deleteItem = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto rounded-2xl overflow-hidden",
        "bg-zinc-950 dark:bg-zinc-950",
        "border border-zinc-800",
        className,
      )}
    >
      <div className="px-5 py-4 border-b border-zinc-800">
        <h2 className="font-semibold text-white">Tasks</h2>
        <p className="text-sm text-zinc-500 mt-0.5">
          {todos.filter((t) => !t.completed).length} remaining
        </p>
      </div>
      <div className="divide-y divide-zinc-800">
        {todos.map((item) => (
          <div
            key={item.id}
            className={cn(
              "group flex items-center gap-3 p-4 border-l-2",
              priorityColors[item.priority],
              "hover:bg-zinc-900/50 transition-colors",
            )}
          >
            <button
              onClick={() => toggleComplete(item.id)}
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                item.completed
                  ? "bg-emerald-500 border-emerald-500"
                  : "border-zinc-600 hover:border-zinc-400",
              )}
            >
              {item.completed && <Check className="w-3 h-3 text-white" />}
            </button>
            <span
              className={cn(
                "flex-1 transition-colors",
                item.completed ? "text-zinc-500 line-through" : "text-zinc-100",
              )}
            >
              {item.text}
            </span>
            <button
              onClick={() => deleteItem(item.id)}
              className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
