"use client";

import { useState } from "react";
import { Rocket, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingStep {
  id: string;
  title: string;
  completed: boolean;
}

interface Alert17Props {
  title?: string;
  description?: string;
  steps?: OnboardingStep[];
  onStepClick?: (stepId: string) => void;
  onDismiss?: () => void;
  onSkip?: () => void;
  className?: string;
}

const defaultSteps: OnboardingStep[] = [
  { id: "profile", title: "Complete your profile", completed: true },
  { id: "team", title: "Invite team members", completed: false },
  { id: "project", title: "Create your first project", completed: false },
];

export default function Alert17({
  title = "Get Started",
  description = "Complete these steps to unlock all features.",
  steps = defaultSteps,
  onStepClick,
  onDismiss,
  onSkip,
  className,
}: Alert17Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [localSteps, setLocalSteps] = useState(steps);

  const completedCount = localSteps.filter((s) => s.completed).length;
  const progress = (completedCount / localSteps.length) * 100;

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 200);
  };

  const handleStepClick = (stepId: string) => {
    setLocalSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, completed: !step.completed } : step)),
    );
    onStepClick?.(stepId);
  };

  if (!isVisible) return null;

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-xl overflow-hidden",
          "bg-white dark:bg-zinc-900",
          "border border-zinc-200 dark:border-zinc-800",
          "shadow-lg shadow-zinc-200/50 dark:shadow-zinc-950/50",
          "transition-all duration-200",
          isExiting && "opacity-0 scale-95",
        )}
        role="region"
        aria-label="Onboarding"
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25">
                <Rocket className="h-5 w-5 text-white" />
              </div>

              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {title}
                </h3>
                <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0 p-1 rounded-md",
                "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400",
              )}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Progress</span>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                {completedCount}/{localSteps.length}
              </span>
            </div>
            <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {localSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 p-3 rounded-lg",
                  "text-left transition-all duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-amber-400",
                  step.completed
                    ? "bg-emerald-50 dark:bg-emerald-950/30"
                    : "bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                      "transition-colors duration-150",
                      step.completed
                        ? "bg-emerald-500 text-white"
                        : "border-2 border-zinc-300 dark:border-zinc-600",
                    )}
                  >
                    {step.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      step.completed
                        ? "text-emerald-700 dark:text-emerald-300 line-through"
                        : "text-zinc-700 dark:text-zinc-300",
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {!step.completed && <ArrowRight className="h-4 w-4 text-zinc-400" />}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => {
              onSkip?.();
              handleDismiss();
            }}
            className={cn(
              "text-xs font-medium text-zinc-500 dark:text-zinc-400",
              "hover:text-zinc-700 dark:hover:text-zinc-300",
              "transition-colors duration-150",
              "focus:outline-none focus:underline",
            )}
          >
            Skip onboarding
          </button>
        </div>
      </div>
    </div>
  );
}
