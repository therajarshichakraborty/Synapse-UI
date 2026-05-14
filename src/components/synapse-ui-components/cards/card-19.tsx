import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

interface Task {
  title: string;
  completed: boolean;
}

interface Card17Props {
  title?: string;
  tasks?: Task[];
  completed?: number;
}

export default function Card_19({
  title = "Project Checklist",
  tasks = [
    { title: "Design mockups", completed: true },
    { title: "Frontend development", completed: true },
    { title: "Backend integration", completed: false },
    { title: "Testing & QA", completed: false },
  ],
  completed = 2,
}: Card17Props) {
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
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">{title}</h3>
      <div className="mb-4 pb-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all"
            style={{ width: `${(completed / tasks.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          {completed} of {tasks.length} completed
        </p>
      </div>
      <div className="space-y-2">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center gap-3">
            {task.completed ? (
              <CheckCircle2 className="w-4 h-4 text-zinc-600 dark:text-zinc-400 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-zinc-300 dark:text-zinc-700 flex-shrink-0" />
            )}
            <span
              className={cn(
                "text-xs",
                task.completed
                  ? "line-through text-zinc-400 dark:text-zinc-600"
                  : "text-zinc-600 dark:text-zinc-400",
              )}
            >
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
