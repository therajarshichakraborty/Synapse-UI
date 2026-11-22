"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export type ParallaxScrollProps = {
  /** CSS backgrounds (gradients or url()) for each tile. */
  items: string[];
  className?: string;
  /** Height of the scroll container. */
  height?: string;
};

/** A three-column gallery where the outer columns move at different speeds as you scroll. */
export function ParallaxScroll({ items, className, height = "32rem" }: ParallaxScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const up = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const down = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const third = Math.ceil(items.length / 3);
  const columns = [items.slice(0, third), items.slice(third, 2 * third), items.slice(2 * third)];

  return (
    <div
      ref={ref}
      className={cn("w-full overflow-y-auto rounded-2xl scrollbar-thin", className)}
      style={{ height }}
    >
      <div className="mx-auto grid max-w-4xl grid-cols-2 items-start gap-4 px-4 py-10 md:grid-cols-3">
        {columns.map((col, c) => (
          <motion.div
            key={c}
            style={{ y: c === 1 ? down : up }}
            className={cn("grid gap-4", c === 2 && "hidden md:grid")}
          >
            {col.map((bg, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-xl border border-border"
                style={{ background: bg }}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
