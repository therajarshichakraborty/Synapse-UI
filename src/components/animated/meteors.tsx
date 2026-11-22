"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type MeteorsProps = { number?: number; className?: string };

/** Meteors streaking diagonally. Positioned randomly on mount to avoid hydration mismatch. */
export function Meteors({ number = 18, className }: MeteorsProps) {
  const [meteors, setMeteors] = React.useState<{ left: string; delay: string; duration: string }[]>(
    [],
  );

  React.useEffect(() => {
    setMeteors(
      Array.from({ length: number }).map(() => ({
        left: `${Math.floor(Math.random() * 120) - 10}%`,
        delay: `${(Math.random() * 6).toFixed(2)}s`,
        duration: `${(Math.random() * 6 + 3).toFixed(2)}s`,
      })),
    );
  }, [number]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
    >
      {meteors.map((m, i) => (
        <span
          key={i}
          className={cn(
            "absolute top-0 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-brand-300 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]",
            "before:absolute before:top-1/2 before:h-px before:w-[60px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-brand-400 before:to-transparent before:content-['']",
            className,
          )}
          style={{ left: m.left, animationDelay: m.delay, animationDuration: m.duration }}
        />
      ))}
    </div>
  );
}
