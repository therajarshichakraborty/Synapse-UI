import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface Card18Props {
  title?: string;
  description?: string;
}

export default function Card_20({
  title = "Loading Data",
  description = "Fetching your information...",
}: Card18Props) {
  return (
    <div
      className={cn(
        "w-full max-w-sm",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200/50 dark:border-zinc-800/50",
        "rounded-xl shadow-sm",
        "p-8",
        "flex flex-col items-center justify-center gap-4",
      )}
    >
      <Loader className="w-8 h-8 text-zinc-400 dark:text-zinc-600 animate-spin" />
      <div className="text-center">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{title}</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
