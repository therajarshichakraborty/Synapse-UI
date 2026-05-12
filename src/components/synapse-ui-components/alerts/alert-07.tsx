"use client";

import { useState } from "react";
import { Settings, X, ToggleLeft, ToggleRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface Alert07Props {
  title?: string;
  options?: SettingOption[];
  onSave?: (options: SettingOption[]) => void;
  onDismiss?: () => void;
  className?: string;
}

const defaultOptions: SettingOption[] = [
  {
    id: "notifications",
    label: "Push notifications",
    description: "Receive alerts on your device",
    enabled: true,
  },
  {
    id: "sounds",
    label: "Sound effects",
    description: "Play sounds for interactions",
    enabled: false,
  },
];

export default function Alert07({
  title = "Quick Settings",
  options = defaultOptions,
  onSave,
  onDismiss,
  className,
}: Alert07Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [settings, setSettings] = useState<SettingOption[]>(options);
  const [isSaving, setIsSaving] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 200);
  };

  const handleToggle = (id: string) => {
    setSettings((prev) =>
      prev.map((option) => (option.id === id ? { ...option, enabled: !option.enabled } : option)),
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onSave?.(settings);
      handleDismiss();
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div className={cn("w-full max-w-sm mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-xl overflow-hidden",
          "bg-white dark:bg-zinc-900",
          "border border-zinc-200 dark:border-zinc-800",
          "shadow-lg shadow-zinc-200/50 dark:shadow-zinc-950/50",
          "transition-all duration-200",
          isExiting && "opacity-0 scale-95",
        )}
        role="dialog"
        aria-labelledby="settings-title"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3
              id="settings-title"
              className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
            >
              {title}
            </h3>
          </div>
          <button
            onClick={handleDismiss}
            className={cn(
              "p-1 rounded-md",
              "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-zinc-400",
            )}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {settings.map((option) => (
            <div key={option.id} className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {option.label}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{option.description}</p>
              </div>
              <button
                onClick={() => handleToggle(option.id)}
                className={cn(
                  "flex-shrink-0 relative p-0.5 rounded-full w-10 h-6",
                  "transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                  "dark:focus:ring-offset-zinc-900",
                  option.enabled ? "bg-blue-600" : "bg-zinc-200 dark:bg-zinc-700",
                )}
                role="switch"
                aria-checked={option.enabled}
                aria-label={option.label}
              >
                <span
                  className={cn(
                    "block w-5 h-5 rounded-full bg-white shadow-sm",
                    "transition-transform duration-200",
                    option.enabled ? "translate-x-4" : "translate-x-0",
                  )}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex justify-end gap-2">
            <button
              onClick={handleDismiss}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg",
                "text-zinc-600 dark:text-zinc-400",
                "hover:bg-zinc-100 dark:hover:bg-zinc-700",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400",
              )}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg",
                "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
                "hover:bg-zinc-800 dark:hover:bg-zinc-200",
                "transition-colors duration-150",
                "disabled:opacity-50",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2",
                "dark:focus:ring-offset-zinc-900",
              )}
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
