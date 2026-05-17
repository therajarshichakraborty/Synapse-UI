"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ListItem {
  id: string;
  day: number;
  events: {
    title: string;
    time: string;
    color: string;
  }[];
}

interface List20Props {
  className?: string;
}

const generateDays = (): ListItem[] => {
  const days: ListItem[] = [];
  const events = [
    { title: "Team Standup", time: "9:00 AM", color: "bg-blue-500" },
    { title: "Design Review", time: "2:00 PM", color: "bg-purple-500" },
    { title: "Client Call", time: "4:30 PM", color: "bg-emerald-500" },
    { title: "Sprint Planning", time: "10:00 AM", color: "bg-amber-500" },
  ];
  for (let i = 1; i <= 7; i++) {
    days.push({
      id: i.toString(),
      day: i + 9,
      events: i % 2 === 0 ? [events[i % events.length]] : i === 3 ? events.slice(0, 2) : [],
    });
  }
  return days;
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function List20({ className }: List20Props) {
  const [days] = useState(generateDays());
  const [selectedDay, setSelectedDay] = useState<string>("3");

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto rounded-2xl overflow-hidden",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        className,
      )}
    >
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">March 2024</h2>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex gap-1">
          {days.map((day, index) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={cn(
                "flex-1 py-3 rounded-xl transition-all",
                selectedDay === day.id
                  ? "bg-zinc-900 dark:bg-zinc-100"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              )}
            >
              <p
                className={cn(
                  "text-xs font-medium mb-1",
                  selectedDay === day.id
                    ? "text-zinc-400 dark:text-zinc-500"
                    : "text-zinc-500 dark:text-zinc-400",
                )}
              >
                {DAYS[(index + 1) % 7]}
              </p>
              <p
                className={cn(
                  "text-sm font-semibold",
                  selectedDay === day.id
                    ? "text-white dark:text-zinc-900"
                    : "text-zinc-900 dark:text-zinc-100",
                )}
              >
                {day.day}
              </p>
              {day.events.length > 0 && (
                <div className="flex justify-center gap-0.5 mt-1.5">
                  {day.events.slice(0, 3).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-1 h-1 rounded-full",
                        selectedDay === day.id
                          ? "bg-zinc-400 dark:bg-zinc-500"
                          : "bg-zinc-300 dark:bg-zinc-600",
                      )}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
          Events for March {days.find((d) => d.id === selectedDay)?.day}
        </h3>
        <div className="space-y-2">
          {days
            .find((d) => d.id === selectedDay)
            ?.events.map((event, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl",
                  "bg-zinc-50 dark:bg-zinc-800/50",
                )}
              >
                <div className={cn("w-1 h-10 rounded-full", event.color)} />
                <div>
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{event.title}</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{event.time}</p>
                </div>
              </div>
            )) || (
            <p className="text-sm text-zinc-400 dark:text-zinc-500 text-center py-4">
              No events scheduled
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
