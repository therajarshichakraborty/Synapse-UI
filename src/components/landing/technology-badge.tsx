import { Sparkles } from "lucide-react";

export function TechnologyBadges() {
  return (
    <div className="flex flex-col sm:flex-row justify-center my-8 sm:my-24 gap-4">
      <div
        className="inline-flex items-center px-4 py-2 rounded-full text-sm 
          bg-linear-to-r from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800
          border border-zinc-200 dark:border-zinc-800 shadow-xs"
      >
        <Sparkles className="w-4 h-4 mr-2 text-zinc-500 dark:text-zinc-400" />
        <span className="bg-clip-text text-transparent bg-linear-to-r from-zinc-850 to-zinc-650 dark:from-zinc-150 dark:to-zinc-350">
          Crafted with Next.js 15 & Tailwind CSS
        </span>
      </div>

      <div
        className="inline-flex items-center px-4 py-2 rounded-full text-sm 
          bg-linear-to-r from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800
          border border-zinc-200 dark:border-zinc-800 shadow-xs"
      >
        <Sparkles className="w-4 h-4 mr-2 text-zinc-550 dark:text-zinc-450" />
        <span className="bg-clip-text text-transparent bg-linear-to-r from-zinc-850 to-zinc-650 dark:from-zinc-150 dark:to-zinc-350">
          Optionally with shadcn/ui and Framer Motion
        </span>
      </div>
    </div>
  );
}
