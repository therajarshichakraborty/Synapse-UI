"use client";

import { cn } from "@/lib/utils";
import { Clock, MapPin, DollarSign, Briefcase } from "lucide-react";

interface ListItem {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  tags: string[];
}

interface List15Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Stripe",
    logo: "https://logo.clearbit.com/stripe.com",
    location: "Remote",
    salary: "$150k - $200k",
    type: "Full-time",
    posted: "2d ago",
    tags: ["React", "TypeScript", "GraphQL"],
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Figma",
    logo: "https://logo.clearbit.com/figma.com",
    location: "San Francisco",
    salary: "$140k - $180k",
    type: "Full-time",
    posted: "1w ago",
    tags: ["UI/UX", "Figma", "Design Systems"],
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "Vercel",
    logo: "https://logo.clearbit.com/vercel.com",
    location: "Remote",
    salary: "$160k - $220k",
    type: "Full-time",
    posted: "3d ago",
    tags: ["Node.js", "Go", "Kubernetes"],
  },
];

export default function List15({ items = ITEMS, className }: List15Props) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto space-y-4", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "group p-5 rounded-2xl",
            "bg-white dark:bg-zinc-900",
            "border border-zinc-100 dark:border-zinc-800",
            "hover:border-blue-200 dark:hover:border-blue-800",
            "hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20",
            "transition-all duration-300 cursor-pointer",
          )}
        >
          <div className="flex gap-4">
            <img
              src={item.logo}
              alt={item.company}
              className="w-12 h-12 rounded-xl object-contain bg-zinc-50 dark:bg-zinc-800 p-2"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.company}</p>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0">
                  {item.posted}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  <span>{item.salary}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  <span>{item.type}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
