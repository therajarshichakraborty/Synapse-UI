"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeIn,
} from "@/design-system/motion-variants";
import type { Variants, UseInViewOptions } from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "none";

const directionVariants: Record<Direction, Variants> = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
  none: fadeIn,
};

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  /** Trigger once on first scroll-into-view */
  once?: boolean;
  /** Margin before element triggers */
  margin?: UseInViewOptions["margin"];
  /** Override variants completely */
  variants?: Variants;
  as?: React.ElementType;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  margin = "-40px",
  variants,
  as: Tag = "div",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin });

  const selectedVariants = variants ?? directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedVariants}
      custom={delay}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered children — wrap FadeIn items in this */
export function FadeInStagger({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0.05,
  once = true,
  margin = "-40px",
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  margin?: UseInViewOptions["margin"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Use inside FadeInStagger — each child animates in sequence */
export function FadeInItem({
  children,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
}) {
  return (
    <motion.div className={className} variants={directionVariants[direction]}>
      {children}
    </motion.div>
  );
}
