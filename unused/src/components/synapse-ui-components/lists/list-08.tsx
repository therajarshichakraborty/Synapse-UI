"use client";

import { cn } from "@/lib/utils";
import { MapPin, Calendar, Users, ChevronRight } from "lucide-react";

interface ListItem {
  id: string;
  title: string;
  location: string;
  date: string;
  attendees: number;
  image: string;
}

interface List08Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    title: "Design Systems Workshop",
    location: "San Francisco, CA",
    date: "Mar 25, 2024",
    attendees: 156,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    title: "React Conference",
    location: "New York, NY",
    date: "Apr 12, 2024",
    attendees: 842,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    title: "Startup Pitch Night",
    location: "Austin, TX",
    date: "Apr 28, 2024",
    attendees: 234,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=200&h=200&fit=crop",
  },
];

export default function List08({ items = ITEMS, className }: List08Props) {
  return (
    <div className={cn("w-full max-w-lg mx-auto space-y-4", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "group flex gap-4 p-3 rounded-2xl",
            "bg-white dark:bg-zinc-900",
            "border border-zinc-100 dark:border-zinc-800",
            "hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50",
            "hover:border-zinc-200 dark:hover:border-zinc-700",
            "transition-all duration-300 cursor-pointer",
          )}
        >
          <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0 py-1">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate mb-2">
              {item.title}
            </h3>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <MapPin className="w-4 h-4" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <Users className="w-4 h-4" />
                  <span>{item.attendees}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <ChevronRight className="w-5 h-5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      ))}
    </div>
  );
}
