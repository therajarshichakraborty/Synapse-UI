"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export type DockItem = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export type FloatingDockProps = {
  items: DockItem[];
  className?: string;
  /** Base icon tile size in px. */
  size?: number;
  /** Magnified tile size in px. */
  magnification?: number;
};

/** A macOS-style dock whose icons magnify near the pointer. */
export function FloatingDock({
  items,
  className,
  size = 40,
  magnification = 64,
}: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity);
  return (
    <nav
      aria-label="Dock"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "glass mx-auto flex h-16 items-end gap-3 rounded-2xl border border-border px-3 pb-3",
        className,
      )}
    >
      {items.map((item) => (
        <DockIcon
          key={item.title}
          item={item}
          mouseX={mouseX}
          size={size}
          magnification={magnification}
        />
      ))}
    </nav>
  );
}

function DockIcon({
  item,
  mouseX,
  size,
  magnification,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  size: number;
  magnification: number;
}) {
  const ref = React.useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = React.useState(false);

  const distance = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - b.x - b.width / 2;
  });
  const target = useTransform(distance, [-150, 0, 150], [size, magnification, size]);
  const width = useSpring(target, { mass: 0.1, stiffness: 160, damping: 12 });
  const iconTarget = useTransform(
    distance,
    [-150, 0, 150],
    [size * 0.5, magnification * 0.5, size * 0.5],
  );
  const iconSize = useSpring(iconTarget, { mass: 0.1, stiffness: 160, damping: 12 });

  const Comp = item.href ? motion.a : motion.button;

  return (
    <Comp
      ref={ref}
      href={item.href}
      onClick={item.onClick}
      aria-label={item.title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={reduce ? { width: size, height: size } : { width, height: width }}
      className="relative flex aspect-square items-center justify-center rounded-full border border-border bg-surface-2 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      {hovered && (
        <motion.span
          initial={{ opacity: 0, y: 6, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          className="pointer-events-none absolute -top-9 left-1/2 rounded-md border border-border bg-popover px-2 py-0.5 text-xs whitespace-nowrap text-popover-foreground shadow-md"
        >
          {item.title}
        </motion.span>
      )}
      <motion.span
        style={
          reduce ? { width: size / 2, height: size / 2 } : { width: iconSize, height: iconSize }
        }
        className="flex items-center justify-center [&_svg]:size-full"
      >
        {item.icon}
      </motion.span>
    </Comp>
  );
}
