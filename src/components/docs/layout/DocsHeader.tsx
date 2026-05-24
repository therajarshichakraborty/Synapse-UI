"use client";

import { Blocks } from "lucide-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/lib/theme-toggler";
import { DocsSearch } from "./DocsSearch";

/**
 * Docs-specific top navigation bar.
 * Uses the same visual language as the landing Header.tsx but scoped for docs.
 */
export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <div className="flex justify-center px-4 py-3">
        <div
          className="w-full md:w-[75%] max-w-[1800px]
          flex items-center justify-between
          px-5 py-2
          rounded-xl
          backdrop-blur-md
          bg-background/80
          border border-border
          shadow-sm
          transition-colors duration-200"
        >
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <Blocks className="w-5 h-5 text-zinc-900 dark:text-zinc-50 transition-transform duration-300 group-hover:scale-105" />
              <span className="font-semibold text-sm text-[var(--fd-foreground)] tracking-tight">
                Synapse UI
              </span>
            </Link>

            <div className="hidden sm:block h-4 w-px bg-border" />

            <nav className="hidden sm:flex items-center gap-5">
              <Link
                href="/docs"
                className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/pricing"
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-250 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors flex items-center gap-1.5"
              >
                Templates
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  NEW
                </span>
              </Link>
            </nav>
          </div>

          {/* Right — Search + Theme */}
          <div className="flex items-center gap-3">
            <DocsSearch />
            <div className="hidden sm:block h-4 w-px bg-border" />
            <AnimatedThemeToggler className="p-2 rounded-lg border border-border bg-white/50 dark:bg-zinc-950/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
