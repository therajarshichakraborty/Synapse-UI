import { cn } from "@/lib/utils";
import { BookOpen, Clock } from "lucide-react";

interface Card13Props {
  title?: string;
  category?: string;
  readTime?: number;
  excerpt?: string;
  date?: string;
}

export default function Card_15({
  title = "Getting Started with Next.js 14",
  category = "Tutorial",
  readTime = 8,
  excerpt = "Learn the fundamentals of Next.js 14 and build your first application with server components and more.",
  date = "Mar 10, 2024",
}: Card13Props) {
  return (
    <div
      className={cn(
        "w-full max-w-sm",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200/50 dark:border-zinc-800/50",
        "rounded-xl shadow-sm",
        "p-5",
        "transition-all duration-300",
        "hover:shadow-md dark:hover:shadow-zinc-900/50",
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
          {category}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{date}</span>
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
      <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">{excerpt}</p>
      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <Clock className="w-3.5 h-3.5" />
        <span>{readTime} min read</span>
      </div>
    </div>
  );
}
