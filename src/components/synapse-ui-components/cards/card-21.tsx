import { cn } from "@/lib/utils";
import { InboxIcon } from "lucide-react";

interface Card19Props {
  title?: string;
  message?: string;
  actionText?: string;
  icon?: React.ReactNode;
}

export default function Card_21({
  title = "No Results",
  message = "Try adjusting your search or filters to find what you're looking for.",
  actionText = "Clear Filters",
  icon = <InboxIcon className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />,
}: Card19Props) {
  return (
    <div
      className={cn(
        "w-full max-w-sm",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200/50 dark:border-zinc-800/50",
        "rounded-xl shadow-sm",
        "p-8",
        "flex flex-col items-center justify-center gap-4 text-center",
      )}
    >
      {icon}
      <div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{title}</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">{message}</p>
        <button className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          {actionText}
        </button>
      </div>
    </div>
  );
}
