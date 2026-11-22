"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export type TimelineEntry = { title: string; content: React.ReactNode };

export type TimelineProps = { data: TimelineEntry[]; className?: string };

/** A vertical timeline with a progress beam linked to scroll position. */
export function Timeline({ data, className }: TimelineProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 30%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={ref} className={cn("relative mx-auto w-full max-w-4xl", className)}>
      <ol className="relative">
        {data.map((item) => (
          <li key={item.title} className="flex justify-start gap-6 pt-10 md:gap-10 md:pt-24">
            <div className="sticky top-32 z-10 flex max-w-xs shrink-0 items-start self-start md:w-60">
              <span className="absolute left-0 flex size-10 items-center justify-center rounded-full border border-border bg-background">
                <span className="size-3 rounded-full border border-primary/50 bg-primary/30" />
              </span>
              <h3 className="hidden pl-16 text-2xl font-semibold tracking-tight text-muted-foreground md:block">
                {item.title}
              </h3>
            </div>
            <div className="relative w-full pr-2 pl-14 md:pl-0">
              <h3 className="mb-4 text-xl font-semibold md:hidden">{item.title}</h3>
              {item.content}
            </div>
          </li>
        ))}
      </ol>
      <div
        aria-hidden="true"
        className="absolute top-0 left-5 h-full w-px bg-gradient-to-b from-transparent via-border-strong to-transparent [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      >
        <motion.div
          style={{ height, opacity }}
          className="absolute inset-x-0 top-0 w-px rounded-full bg-gradient-to-b from-glow-cyan via-glow-blue to-transparent"
        />
      </div>
    </div>
  );
}
