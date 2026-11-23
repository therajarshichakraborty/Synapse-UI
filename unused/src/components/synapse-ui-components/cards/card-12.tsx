import { cn } from "@/lib/utils";
import { BarChart3, ArrowDownRight } from "lucide-react";

interface Card10Props {
  metric?: string;
  current?: string;
  previous?: string;
  change?: number;
}

export default function Card_12({
  metric = "Conversion Rate",
  current = "3.24%",
  previous = "2.89%",
  change = -12.5,
}: Card10Props) {
  const isPositive = change >= 0;
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
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{metric}</h3>
        <BarChart3 className="w-5 h-5 text-zinc-400" />
      </div>
      <div className="mb-4">
        <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{current}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Previously: {previous}</p>
      </div>
      <div
        className={cn(
          "flex items-center gap-1 text-sm",
          isPositive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500",
        )}
      >
        <ArrowDownRight className={cn("w-4 h-4", isPositive && "rotate-180")} />
        <span className="font-medium">{Math.abs(change)}%</span>
      </div>
    </div>
  );
}
