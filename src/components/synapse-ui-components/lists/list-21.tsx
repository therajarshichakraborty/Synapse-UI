"use client";

import { cn } from "@/lib/utils";
import { Wifi, Battery, Signal, Bluetooth, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { type LucideIcon } from "lucide-react";

interface ListItem {
  id: string;
  label: string;
  icon: LucideIcon;
  enabled: boolean;
  description?: string;
}

interface List21Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  { id: "1", label: "Wi-Fi", icon: Wifi, enabled: true, description: "HomeNetwork_5G" },
  {
    id: "2",
    label: "Bluetooth",
    icon: Bluetooth,
    enabled: true,
    description: "2 devices connected",
  },
  { id: "3", label: "Cellular", icon: Signal, enabled: false, description: "Disabled" },
  { id: "4", label: "Dark Mode", icon: Moon, enabled: false },
];

export default function List21({ items = ITEMS, className }: List21Props) {
  const [settings, setSettings] = useState(items);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm mx-auto rounded-3xl overflow-hidden",
        "bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900",
        "p-1",
        className,
      )}
    >
      <div className="bg-white dark:bg-zinc-900 rounded-[22px] overflow-hidden">
        {settings.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center gap-4 px-5 py-4",
              index !== settings.length - 1 && "border-b border-zinc-100 dark:border-zinc-800",
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                item.enabled
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400",
              )}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{item.label}</h3>
              {item.description && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.description}</p>
              )}
            </div>
            <button
              onClick={() => toggleSetting(item.id)}
              className={cn(
                "relative w-12 h-7 rounded-full transition-colors duration-200",
                item.enabled ? "bg-blue-500" : "bg-zinc-200 dark:bg-zinc-700",
              )}
            >
              <div
                className={cn(
                  "absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200",
                  item.enabled ? "left-6" : "left-1",
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
