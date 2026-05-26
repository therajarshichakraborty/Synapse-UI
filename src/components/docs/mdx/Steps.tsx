import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StepsProps {
  children: ReactNode;
  className?: string;
}

interface StepProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Animated step indicator for installation/usage guides.
 * Uses a connecting vertical line with numbered circles.
 *
 * MDX usage:
 * <Steps>
 *   <Step title="Install dependencies">…</Step>
 *   <Step title="Configure tailwind">…</Step>
 * </Steps>
 */
export function Steps({ children, className }: StepsProps) {
  return <div className={cn("my-8 relative", className)}>{children}</div>;
}

export function Step({ title, children, className }: StepProps) {
  return (
    <div className={cn("relative flex gap-5 pb-8 last:pb-0 group", className)}>
      {/* Vertical connector line */}
      <div className="flex flex-col items-center">
        {/* Numbered circle */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-zinc-100 z-10 counter-item">
          <span>●</span>
        </div>
        {/* Connector */}
        <div className="mt-2 flex-1 w-px bg-gradient-to-b from-zinc-200 dark:from-zinc-800 to-transparent group-last:hidden" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5 pb-2">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-2">{title}</h4>
        <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed [&>pre]:my-3 [&>p]:my-2">
          {children}
        </div>
      </div>
    </div>
  );
}
