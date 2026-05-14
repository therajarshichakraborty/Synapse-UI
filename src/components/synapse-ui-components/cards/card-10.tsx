import { cn } from "@/lib/utils";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface Card08Props {
  title?: string;
  date?: string;
  time?: string;
  category?: string;
}

export default function Card_12({
  title = "Product Launch Event",
  date = "March 15, 2024",
  time = "2:00 PM - 4:00 PM",
  category = "Conference",
}: Card08Props) {
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
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
          {category}
        </span>
        <ArrowRight className="w-4 h-4 text-zinc-400" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">{title}</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Calendar className="w-4 h-4 text-zinc-400" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Clock className="w-4 h-4 text-zinc-400" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
