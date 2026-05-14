import { cn } from "@/lib/utils";
import { Star, MessageSquare } from "lucide-react";

interface Card04Props {
  author?: string;
  role?: string;
  text?: string;
  rating?: number;
  avatar?: string;
}

export default function Card_06({
  author = "Marcus Johnson",
  role = "CEO at TechCorp",
  text = "This product has transformed how we approach our workflow. Highly recommended for any team.",
  rating = 5,
  avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
}: Card04Props) {
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
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">{text}</p>
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <img src={avatar} alt={author} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{author}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{role}</p>
        </div>
      </div>
    </div>
  );
}
