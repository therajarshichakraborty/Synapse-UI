"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { AIInput04 } from "@/components/synapse-ui-components/ai-inputs/ai-input-04";

export default function LandingInterfaceCards() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 sm:p-10 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900/20 shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 items-center">
        {/* Left Side Details */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-500 dark:from-amber-400 dark:to-pink-400">
                Build beautiful interfaces
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A curated collection of beautiful, copy-paste-ready UI components that speed up your React and Next.js development.
            </p>
            <p className="mt-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 tracking-wide uppercase">
              Accessible. Fully Styled. Open Source.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl 
                        bg-black text-white dark:bg-white dark:text-black
                        text-sm font-semibold
                        hover:shadow-lg hover:shadow-zinc-950/15 dark:hover:shadow-white/10
                        transition-all duration-200"
            >
              <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform text-amber-500 fill-amber-500" />
              <span>Explore Components</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl
                        border border-zinc-200 dark:border-zinc-800
                        text-sm font-semibold text-zinc-700 dark:text-zinc-300
                        hover:bg-zinc-50 dark:hover:bg-zinc-900
                        hover:shadow-md transition-all duration-200"
            >
              <span>View on GitHub</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* Right Side Card Preview */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 shadow-lg">
          <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 mb-3 uppercase tracking-wider">
            components / AI-Input-04
          </p>
          <div className="select-none pointer-events-none opacity-85">
            <AIInput04 />
          </div>
        </div>
      </div>
    </div>
  );
}
