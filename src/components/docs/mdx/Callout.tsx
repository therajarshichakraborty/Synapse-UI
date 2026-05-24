import { Info, AlertTriangle, XCircle, CheckCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "danger" | "success" | "tip";

interface CalloutConfig {
  icon: React.ElementType;
  border: string;
  bg: string;
  iconColor: string;
  titleColor: string;
  defaultTitle: string;
}

const calloutConfig: Record<CalloutType, CalloutConfig> = {
  info: {
    icon: Info,
    border: "border-blue-500/15 dark:border-blue-500/25",
    bg: "bg-blue-500/[0.04] dark:bg-blue-500/[0.06]",
    iconColor: "text-blue-500 dark:text-blue-400",
    titleColor: "text-blue-600 dark:text-blue-300",
    defaultTitle: "Info",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-amber-500/15 dark:border-amber-500/25",
    bg: "bg-amber-500/[0.04] dark:bg-amber-500/[0.06]",
    iconColor: "text-amber-600 dark:text-amber-400",
    titleColor: "text-amber-700 dark:text-amber-300",
    defaultTitle: "Warning",
  },
  danger: {
    icon: XCircle,
    border: "border-rose-500/15 dark:border-rose-500/25",
    bg: "bg-rose-500/[0.04] dark:bg-rose-500/[0.06]",
    iconColor: "text-rose-500 dark:text-rose-400",
    titleColor: "text-rose-600 dark:text-rose-300",
    defaultTitle: "Danger",
  },
  success: {
    icon: CheckCircle,
    border: "border-emerald-500/15 dark:border-emerald-500/25",
    bg: "bg-emerald-500/[0.04] dark:bg-emerald-500/[0.06]",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    titleColor: "text-emerald-600 dark:text-emerald-300",
    defaultTitle: "Success",
  },
  tip: {
    icon: Lightbulb,
    border: "border-violet-500/15 dark:border-violet-500/25",
    bg: "bg-violet-500/[0.04] dark:bg-violet-500/[0.06]",
    iconColor: "text-violet-500 dark:text-violet-400",
    titleColor: "text-violet-600 dark:text-violet-300",
    defaultTitle: "Tip",
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Glassmorphic callout / alert card.
 * Used in MDX as <Callout type="warning">…</Callout>
 */
export function Callout({ type = "info", title, children, className }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;
  const resolvedTitle = title ?? config.defaultTitle;

  return (
    <div
      className={cn(
        "relative my-6 rounded-xl border px-5 py-4",
        "backdrop-blur-sm",
        config.border,
        config.bg,
        // Left accent bar via before pseudo
        "before:absolute before:left-0 before:top-4 before:bottom-4 before:w-0.5 before:rounded-full",
        type === "info"    && "before:bg-blue-400/60",
        type === "warning" && "before:bg-amber-400/60",
        type === "danger"  && "before:bg-rose-400/60",
        type === "success" && "before:bg-emerald-400/60",
        type === "tip"     && "before:bg-violet-400/60",
        className
      )}
      role={type === "danger" || type === "warning" ? "alert" : undefined}
    >
      {/* Header */}
      <div className={cn("flex items-center gap-2 mb-2", config.titleColor)}>
        <Icon className={cn("h-4 w-4 shrink-0", config.iconColor)} />
        <span className="text-sm font-semibold">{resolvedTitle}</span>
      </div>

      {/* Content */}
      <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed [&>p]:m-0 [&>p+p]:mt-2">
        {children}
      </div>
    </div>
  );
}
