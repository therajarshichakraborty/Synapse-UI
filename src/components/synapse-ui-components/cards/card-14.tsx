import { cn } from "@/lib/utils";
import { Folder, MoreVertical, Users } from "lucide-react";

interface Card12Props {
  name?: string;
  description?: string;
  files?: number;
  collaborators?: number;
  lastModified?: string;
}

export default function Card_14({
  name = "Design System v2.0",
  description = "Comprehensive design tokens and components",
  files = 48,
  collaborators = 6,
  lastModified = "2 hours ago",
}: Card12Props) {
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
          <Folder className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
        </div>
        <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4 text-zinc-400" />
        </button>
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{name}</h3>
      <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">{description}</p>
      <div className="flex items-center justify-between pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{files} files</span>
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{collaborators}</span>
        </div>
      </div>
    </div>
  );
}
