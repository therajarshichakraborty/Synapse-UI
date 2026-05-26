"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Info, AlertCircle, CheckCircle, HelpCircle, Lightbulb, Zap } from "lucide-react";

const iconTooltipVariants = cva(
  "z-50 flex items-start gap-2 rounded-lg px-3 py-2 text-sm shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      intent: {
        info: "bg-blue-50 text-blue-900 border border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800",
        success:
          "bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800",
        warning:
          "bg-amber-50 text-amber-900 border border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800",
        error:
          "bg-red-50 text-red-900 border border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800",
        help: "bg-violet-50 text-violet-900 border border-violet-200 dark:bg-violet-950 dark:text-violet-100 dark:border-violet-800",
        tip: "bg-cyan-50 text-cyan-900 border border-cyan-200 dark:bg-cyan-950 dark:text-cyan-100 dark:border-cyan-800",
      },
    },
    defaultVariants: {
      intent: "info",
    },
  },
);

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
  help: HelpCircle,
  tip: Lightbulb,
};

const iconColorMap = {
  info: "text-blue-600 dark:text-blue-400",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
  help: "text-violet-600 dark:text-violet-400",
  tip: "text-cyan-600 dark:text-cyan-400",
};

interface IconTooltipProps extends VariantProps<typeof iconTooltipVariants> {
  children: React.ReactNode;
  title?: string;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  customIcon?: React.ReactNode;
}

export function IconTooltip({
  children,
  title,
  content,
  intent = "info",
  side = "top",
  className,
  customIcon,
}: IconTooltipProps) {
  const Icon = iconMap[intent || "info"];

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            className={cn(iconTooltipVariants({ intent }), "max-w-xs", className)}
          >
            <span className={cn("mt-0.5 shrink-0", iconColorMap[intent || "info"])}>
              {customIcon || <Icon className="h-4 w-4" />}
            </span>
            <div className="flex flex-col gap-0.5">
              {title && <span className="font-semibold">{title}</span>}
              <span className="text-xs opacity-90">{content}</span>
            </div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
