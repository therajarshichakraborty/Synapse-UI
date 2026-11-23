import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The landing page "blueprint" frame: dotted rails on both sides and dotted
 * rules between sections, with small corner ticks where they meet.
 */
export function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[1200px]", className)}>
      <span
        aria-hidden="true"
        className="dotted-rail-y pointer-events-none absolute inset-y-0 left-0 hidden md:block"
      />
      <span
        aria-hidden="true"
        className="dotted-rail-y pointer-events-none absolute inset-y-0 right-0 hidden md:block"
      />
      {children}
    </div>
  );
}

export function DottedRule({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative h-px w-full", className)}>
      <span className="dotted-rail-x absolute inset-x-0 top-0" />
      <span className="absolute top-1/2 -left-[3.5px] hidden size-[7px] -translate-y-1/2 rotate-45 border border-border-strong bg-background md:block" />
      <span className="absolute top-1/2 -right-[3.5px] hidden size-[7px] -translate-y-1/2 rotate-45 border border-border-strong bg-background md:block" />
    </div>
  );
}
