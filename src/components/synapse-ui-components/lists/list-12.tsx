"use client";

import { cn } from "@/lib/utils";
import { Zap, Shield, Globe, Sparkles } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface ListItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface List12Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    title: "Lightning Fast",
    description: "Optimized for speed with sub-second response times",
    icon: Zap,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "2",
    title: "Enterprise Security",
    description: "Bank-grade encryption and SOC 2 compliance",
    icon: Shield,
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: "3",
    title: "Global CDN",
    description: "Content delivered from edge locations worldwide",
    icon: Globe,
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "4",
    title: "AI Powered",
    description: "Smart automation that learns and adapts",
    icon: Sparkles,
    color: "from-purple-400 to-pink-500",
  },
];

export default function List12({ items = ITEMS, className }: List12Props) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "group relative p-6 rounded-2xl overflow-hidden",
              "bg-white dark:bg-zinc-900",
              "border border-zinc-100 dark:border-zinc-800",
              "hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50",
              "transition-all duration-300",
            )}
          >
            <div
              className={cn(
                "absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl rounded-full",
                "bg-gradient-to-br",
                item.color,
                "group-hover:opacity-20 transition-opacity duration-300",
              )}
            />
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                "bg-gradient-to-br text-white",
                item.color,
              )}
            >
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-2">
              {item.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
