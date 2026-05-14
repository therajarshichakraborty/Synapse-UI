import { cn } from "@/lib/utils";
import { Mail, Lock, AlertCircle } from "lucide-react";

interface Card15Props {
  title?: string;
  message?: string;
  fields?: { label: string; value: string }[];
}

export default function Card_17({
  title = "Security Alert",
  message = "Your account has unusual activity detected. Review and confirm actions below.",
  fields = [
    { label: "Email", value: "user@example.com" },
    { label: "Last Login", value: "2 hours ago" },
  ],
}: Card15Props) {
  return (
    <div
      className={cn(
        "w-full max-w-sm",
        "bg-white dark:bg-zinc-900",
        "border border-red-200/50 dark:border-red-900/30",
        "rounded-xl shadow-sm",
        "p-5",
        "transition-all duration-300",
        "hover:shadow-md dark:hover:shadow-zinc-900/50",
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-100 dark:bg-red-950/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">{message}</p>
      <div className="space-y-3 mb-4">
        {fields.map((field, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{field.label}</span>
            <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              {field.value}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <button className="flex-1 text-xs font-medium py-2 px-3 bg-red-600 dark:bg-red-600 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-700 transition-colors">
          Confirm
        </button>
        <button className="flex-1 text-xs font-medium py-2 px-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
          Later
        </button>
      </div>
    </div>
  );
}
