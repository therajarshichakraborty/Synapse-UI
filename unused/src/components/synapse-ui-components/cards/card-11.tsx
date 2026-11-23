import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface Card09Props {
  title?: string;
  message?: string;
  type?: "alert" | "success";
  action?: string;
}

export default function Card_11({
  title = "Update Available",
  message = "A new version of our software is ready to download.",
  type = "alert",
  action = "Update Now",
}: Card09Props) {
  const isAlert = type === "alert";
  return (
    <div
      className={cn(
        "w-full max-w-sm",
        "bg-white dark:bg-zinc-900",
        "border",
        isAlert
          ? "border-amber-200/50 dark:border-amber-900/30"
          : "border-green-200/50 dark:border-green-900/30",
        "rounded-xl shadow-sm",
        "p-5",
        "transition-all duration-300",
        "hover:shadow-md dark:hover:shadow-zinc-900/50",
      )}
    >
      <div className="flex gap-3">
        {isAlert ? (
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
        )}
        <div>
          <h3
            className={cn(
              "text-sm font-semibold mb-1",
              isAlert ? "text-amber-950 dark:text-amber-200" : "text-green-950 dark:text-green-200",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "text-xs mb-3",
              isAlert ? "text-amber-800 dark:text-amber-300" : "text-green-800 dark:text-green-300",
            )}
          >
            {message}
          </p>
          <button
            className={cn(
              "text-xs font-medium transition-colors",
              isAlert
                ? "text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                : "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300",
            )}
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}
