import { cn } from "@/lib/utils";

interface CardSetting {
  title: string;
  description: string;
  enabled: boolean;
}

interface Card20Props {
  title?: string;
  settings?: CardSetting[];
}

export default function Card_22({
  title = "Notification Settings",
  settings = [
    {
      title: "Email Notifications",
      description: "Get notified via email",
      enabled: true,
    },
    {
      title: "Push Notifications",
      description: "Receive push alerts",
      enabled: false,
    },
    {
      title: "SMS Updates",
      description: "Text message reminders",
      enabled: true,
    },
  ],
}: Card20Props) {
  return (
    <div
      className={cn(
        "w-full max-w-sm",
        "rounded-3xl",
        "border border-zinc-200/60 dark:border-zinc-800/70",
        "bg-white/90 dark:bg-zinc-900/90",
        "backdrop-blur-xl",
        "shadow-[0_10px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_50px_rgba(0,0,0,0.45)]",
        "p-6",
      )}
    >
      <div className="mb-6">
        <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Control how you receive updates and alerts.
        </p>
      </div>

      <div className="space-y-4">
        {settings.map((setting, i) => (
          <div
            key={i}
            className={cn(
              "group",
              "flex items-center justify-between gap-4",
              "rounded-2xl",
              "border border-zinc-200/70 dark:border-zinc-800",
              "bg-zinc-50/70 dark:bg-zinc-950/40",
              "px-4 py-4",
              "transition-all duration-300",
              "hover:bg-zinc-100/80 dark:hover:bg-zinc-900/60",
              "hover:border-zinc-300 dark:hover:border-zinc-700",
            )}
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {setting.title}
              </p>

              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 mt-1">
                {setting.description}
              </p>
            </div>

            {/* Premium Action Button */}
            <button
              className={cn(
                "relative inline-flex items-center justify-center",
                "min-w-[88px] h-10 px-4",
                "rounded-xl",
                "text-xs font-semibold tracking-wide",
                "border transition-all duration-300",
                "active:scale-[0.98]",
                setting.enabled
                  ? [
                      "bg-zinc-900 text-white border-zinc-900",
                      "shadow-[0_8px_25px_rgba(0,0,0,0.18)]",
                      "hover:bg-zinc-800",
                      "dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100",
                      "dark:hover:bg-zinc-200",
                    ]
                  : [
                      "bg-white text-zinc-700 border-zinc-300",
                      "hover:border-zinc-400 hover:bg-zinc-100",
                      "dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700",
                      "dark:hover:bg-zinc-800 dark:hover:border-zinc-600",
                    ],
              )}
            >
              <span className="relative z-10">{setting.enabled ? "Enabled" : "Disabled"}</span>

              {setting.enabled && (
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl",
                    "bg-gradient-to-r from-white/10 via-white/5 to-transparent",
                    "pointer-events-none",
                  )}
                />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
