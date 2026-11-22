"use client";

import Link from "next/link";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function BrowseBlocksButton() {
  return (
    <Link
      id="browse-blocks-button"
      href="https://kokonutui.pro/templates"
      className="flex items-center gap-8"
    >
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
        whileHover={{ x: 5, transition: { duration: 0.2 } }}
        className="relative"
      >
        <Button
          className={cn(
            "relative inline-flex items-center justify-center gap-4 rounded-xl font-medium",
            "relative h-12 px-6 min-w-72 md:min-w-56",
            "bg-background",
            "text-foreground",
            "border border-border",
            "hover:bg-zinc-50 dark:hover:bg-zinc-900",
            "backdrop-blur-xs",
            "shadow-sm transition-all duration-200",
          )}
        >
          <span className="font-medium flex items-center gap-2">Visit Premium UI Blocks</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </motion.div>
    </Link>
  );
}
