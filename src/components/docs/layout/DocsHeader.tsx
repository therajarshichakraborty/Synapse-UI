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
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#09001a]/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 max-w-[1800px] mx-auto">
        {/* Left — Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Blocks className="w-5 h-5 text-fuchsia-500 transition-all duration-300 group-hover:text-violet-400 group-hover:scale-110" />
            <span className="font-semibold text-sm text-zinc-100 tracking-tight">
              Synapse UI
            </span>
          </Link>

          <div className="hidden sm:block h-4 w-px bg-white/10" />

          <nav className="hidden sm:flex items-center gap-5">
            <Link
              href="/docs"
              className="text-xs font-medium text-violet-300 border-b border-violet-500/50 pb-0.5"
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              Templates
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/20">
                NEW
              </span>
            </Link>
          </nav>
        </div>

        {/* Right — Search + Theme */}
        <div className="flex items-center gap-3">
          <DocsSearch />
          <div className="hidden sm:block h-4 w-px bg-white/10" />
          <AnimatedThemeToggler className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] transition-colors text-zinc-400 hover:text-zinc-200" />
        </div>
      </div>
    </header>
  );
}
