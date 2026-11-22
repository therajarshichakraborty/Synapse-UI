"use client";

import Link from "next/link";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";

export function BrowseComponentsButton() {
  return (
    <Link href="/docs/components/button" className="flex items-center gap-8">
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
        whileHover={{ x: 5, transition: { duration: 0.2 } }}
      >
        <Button
          className={cn(
            "relative inline-flex items-center justify-center gap-4 rounded-xl font-medium",
            "relative h-12 px-6 min-w-72 md:min-w-56",
            "bg-zinc-900 hover:bg-zinc-900/90 dark:bg-zinc-100 dark:hover:bg-zinc-100/90",
            "text-zinc-50 dark:text-zinc-900",
            "border border-zinc-800 dark:border-zinc-200",
            "shadow-sm",
            "backdrop-blur-xs",
          )}
        >
          <span className="font-medium">Browse Components</span>
          {/* <CompassOutline className="w-8 h-8" /> */}
          <ArrowDownRight className="w-5 h-5 rotate-[270deg]" />
        </Button>
      </motion.div>
    </Link>
  );
}
