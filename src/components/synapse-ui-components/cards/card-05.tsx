import { cn } from "@/lib/utils";
import { TrendingUp, ArrowUpRight } from "lucide-react";

interface Card03Props {
  title?: string;
  value?: string;
  change?: number;
  period?: string;
}

export default function Card_05({
  title = "Total Revenue",
  value = "$45,231.89",
  change = 12.5,
  period = "from last month",
}: Card03Props) {
  return (
    <div
      className={cn(
        "w-full max-w-sm",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200/50 dark:border-zinc-800/50",
        "rounded-xl shadow-sm",
        "p-6",
        "transition-all duration-300",
        "hover:shadow-md dark:hover:shadow-zinc-900/50",
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">{title}</p>
          <h3 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{value}</h3>
        </div>
        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <TrendingUp className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
        </div>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <div className="flex items-center gap-0.5 text-green-600 dark:text-green-500">
          <ArrowUpRight className="w-4 h-4" />
          <span className="font-medium">{change}%</span>
        </div>
        <span className="text-zinc-500 dark:text-zinc-400">{period}</span>
      </div>
    </div>
  );
}
