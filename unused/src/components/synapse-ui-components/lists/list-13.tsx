"use client";

import { cn } from "@/lib/utils";
//import { ExternalLink, Github, Twitter, Linkedin } from "lucide-react";

interface ListItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface List13Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    name: "Olivia Chen",
    role: "CEO",
    company: "TechFlow",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    social: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "CTO",
    company: "TechFlow",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    social: { twitter: "#", github: "#" },
  },
  {
    id: "3",
    name: "Emma Williams",
    role: "Head of Design",
    company: "TechFlow",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    social: { linkedin: "#", twitter: "#" },
  },
];

export default function List13({ items = ITEMS, className }: List13Props) {
  return (
    <div className={cn("w-full max-w-lg mx-auto space-y-3", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "group relative flex items-center gap-4 p-4 rounded-2xl",
            "bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800/50",
            "border border-zinc-100 dark:border-zinc-800",
            "hover:from-zinc-100 hover:to-zinc-50 dark:hover:from-zinc-800 dark:hover:to-zinc-900",
            "transition-all duration-300",
          )}
        >
          <div className="relative">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-white dark:ring-zinc-800"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {item.role} at {item.company}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {item.social.twitter && (
              <a
                href={item.social.twitter}
                className="p-2 rounded-lg text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              ></a>
            )}
            {item.social.linkedin && (
              <a
                href={item.social.linkedin}
                className="p-2 rounded-lg text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              ></a>
            )}
            {item.social.github && (
              <a
                href={item.social.github}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              ></a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
