import { cn } from "@/lib/utils";
import { Award, Zap } from "lucide-react";

interface Card11Props {
  title?: string;
  points?: number;
  level?: number;
  progress?: number;
}

export default function Card_13({
  title = "Pro Member",
  points = 2450,
  level = 5,
  progress = 75,
}: Card11Props) {
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
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <Award className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Level {level}</p>
        </div>
      </div>
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Progress to Level {level + 1}
          </span>
          <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-zinc-900 dark:bg-zinc-100" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Zap className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
        <span className="text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold">{points}</span> points earned
        </span>
      </div>
    </div>
  );
}
