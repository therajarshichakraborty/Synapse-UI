import { cn } from "@/lib/utils";
import { Users, Plus } from "lucide-react";

interface Card07Props {
  teamName?: string;
  members?: number;
  maxMembers?: number;
  avatars?: string[];
}

export default function Card_09({
  teamName = "Design Team",
  members = 5,
  maxMembers = 10,
  avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
  ],
}: Card07Props) {
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{teamName}</h3>
        </div>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        {members} of {maxMembers} members
      </p>
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {avatars.map((avatar, i) => (
            <img
              key={i}
              src={avatar}
              alt={`Member ${i}`}
              className="w-8 h-8 rounded-full border border-white dark:border-zinc-900 object-cover"
            />
          ))}
        </div>
        <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
          <Plus className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
        </button>
      </div>
    </div>
  );
}
