import { cn } from "@/lib/utils";
import { Zap, Activity } from "lucide-react";

interface Card16Props {
  status?: "online" | "offline" | "idle";
  name?: string;
  activity?: string;
  lastSeen?: string;
}

export default function Card_18({
  status = "online",
  name = "Alex Thompson",
  activity = "In a meeting",
  lastSeen = "Active now",
}: Card16Props) {
  const statusColors = {
    online: "bg-green-500 dark:bg-green-500",
    offline: "bg-zinc-400 dark:bg-zinc-600",
    idle: "bg-yellow-500 dark:bg-yellow-500",
  };

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
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div
            className={cn(
              "absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-zinc-900",
              statusColors[status],
            )}
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{name}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{activity}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <Activity className="w-3.5 h-3.5" />
        <span>{lastSeen}</span>
      </div>
    </div>
  );
}
