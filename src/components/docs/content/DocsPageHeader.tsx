"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface DocsPageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: "new" | "beta" | "deprecated" | "updated";
}

const badgeStyles = {
  new:        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  beta:       "bg-amber-500/10  text-amber-700  dark:text-amber-400  border-amber-500/20",
  deprecated: "bg-red-500/10    text-red-600    dark:text-red-400    border-red-500/20",
  updated:    "bg-blue-500/10   text-blue-600   dark:text-blue-400   border-blue-500/20",
};

/**
 * Cinematic page header — animated title, gradient separator, description.
 * Used at the top of every docs page.
 */
export function DocsPageHeader({
  title,
  description,
  badge,
  badgeVariant = "new",
}: DocsPageHeaderProps) {
  return (
    <div className="mb-8">
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-3"
        >
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border tracking-wide uppercase",
              badgeStyles[badgeVariant]
            )}
          >
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
        className={cn(
          "text-3xl sm:text-4xl font-bold tracking-tight leading-tight",
          "bg-clip-text text-transparent",
          "bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400"
        )}
      >
        {title}
      </motion.h1>

      {/* Separator */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-4 origin-left h-px w-full bg-gradient-to-r from-violet-500/40 via-fuchsia-500/20 to-transparent"
      />

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
