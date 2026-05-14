import { cn } from "@/lib/utils";
import { Code, GitBranch, Star } from "lucide-react";

interface Card06Props {
  name?: string;
  description?: string;
  language?: string;
  stars?: number;
  url?: string;
}

export default function Card_08({
  name = "React Query",
  description = "Powerful asynchronous state management library for data fetching and caching.",
  language = "TypeScript",
  stars = 42100,
  url = "github.com/example/repo",
}: Card06Props) {
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
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <Code className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
        </div>
        <GitBranch className="w-4 h-4 text-zinc-400" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{name}</h3>
      <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{language}</span>
        <div className="flex items-center gap-1 text-xs">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-zinc-600 dark:text-zinc-400">{stars.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
