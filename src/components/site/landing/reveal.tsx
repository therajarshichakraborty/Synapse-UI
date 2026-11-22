"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Staggers its RevealItem children in when scrolled into view. */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul";
}) {
  const Comp = motion[as];
  return (
    <Comp
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "h2" | "p";
}) {
  const Comp = motion[as];
  return (
    <Comp variants={item} className={className}>
      {children}
    </Comp>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <RevealItem
          as="p"
          className="inline-flex items-center rounded-full border border-border bg-surface-1 px-3 py-1 text-xs font-medium text-muted-foreground"
        >
          {eyebrow}
        </RevealItem>
      )}
      <RevealItem
        as="h2"
        className="mt-5 text-[clamp(2rem,1.4rem+2.2vw,3rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance"
      >
        {title}
      </RevealItem>
      {description && (
        <RevealItem
          as="p"
          className="mt-4 text-[1.0625rem] leading-7 text-pretty text-muted-foreground"
        >
          {description}
        </RevealItem>
      )}
    </Reveal>
  );
}
