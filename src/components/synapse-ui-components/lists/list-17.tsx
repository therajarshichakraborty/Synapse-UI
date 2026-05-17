"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";

interface ListItem {
  id: string;
  step: number;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
}

interface List17Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    step: 1,
    title: "Create Account",
    description: "Sign up with your email address",
    status: "completed",
  },
  {
    id: "2",
    step: 2,
    title: "Verify Email",
    description: "Confirm your email to continue",
    status: "completed",
  },
  {
    id: "3",
    step: 3,
    title: "Setup Profile",
    description: "Add your personal information",
    status: "current",
  },
  {
    id: "4",
    step: 4,
    title: "Get Started",
    description: "You are ready to use the platform",
    status: "upcoming",
  },
];

export default function List17({ items = ITEMS, className }: List17Props) {
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="relative">
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        <div className="space-y-0">
          {items.map((item, index) => (
            <div key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
              <div
                className={cn(
                  "relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                  item.status === "completed" && "bg-emerald-500 text-white",
                  item.status === "current" &&
                    "bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-900",
                  item.status === "upcoming" && "bg-zinc-100 dark:bg-zinc-800 text-zinc-400",
                )}
              >
                {item.status === "completed" ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{item.step}</span>
                )}
              </div>
              <div className={cn("flex-1 pt-2.5", item.status === "upcoming" && "opacity-50")}>
                <h3
                  className={cn(
                    "font-semibold mb-1",
                    item.status === "completed" && "text-zinc-900 dark:text-zinc-100",
                    item.status === "current" && "text-blue-600 dark:text-blue-400",
                    item.status === "upcoming" && "text-zinc-500 dark:text-zinc-400",
                  )}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
