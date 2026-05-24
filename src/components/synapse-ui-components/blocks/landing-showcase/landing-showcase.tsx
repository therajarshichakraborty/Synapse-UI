"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Text02 from "@/components/synapse-ui-components/texts/text-02";

export default function LandingShowcase() {
  return (
    <div className="w-full py-12 sm:py-20 text-center relative border border-zinc-200/50 dark:border-zinc-800/50 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900/20 rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 dark:bg-pink-500/2.5 rounded-full blur-3xl pointer-events-none" />

      <div className="inline-block mb-10">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          <Text02
            text="Showcase"
            className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-amber-500 dark:from-pink-400 dark:to-amber-400 text-3xl sm:text-6xl"
          />
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Floating Side Badges (Desktop only) */}
        <div className="hidden lg:block absolute -left-8 top-1/4 transform -translate-x-full text-left">
          <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">50+ Components</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Ready to Use</p>
        </div>

        <div className="hidden lg:block absolute -right-8 top-1/3 transform translate-x-full text-right">
          <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">
            Built in minutes
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">not hours</p>
        </div>

        <div className="hidden lg:block absolute -left-8 bottom-1/3 transform -translate-x-full text-left">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Fully Customizable</p>
        </div>

        <div className="hidden lg:block absolute -right-8 bottom-1/4 transform translate-x-full text-right">
          <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Beautiful interfaces
          </p>
        </div>

        {/* Interactive Screenshot Card */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-950/5 group">
          <img
            src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/Screenshot%202025-01-06%20at%2011.53.17%E2%80%AFAM-cjYGbgucRv0EPwuOF2VdsvMIUDrERS.png"
            alt="Synapse UI Showcase"
            className="w-full h-[250px] sm:h-[480px] object-cover transition-all duration-500 group-hover:scale-[1.02] filter brightness-95 group-hover:brightness-100"
          />

          {/* Central Overlay Link */}
          <Link
            href="https://codesnippetui-demo.vercel.app/"
            target="_blank"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl
                      bg-white text-zinc-900 text-sm font-semibold
                      shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95
                      transition-all duration-200 ease-in-out
                      backdrop-blur-xs bg-opacity-95"
          >
            <span>View Live Demo</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Subtitles */}
        <div className="lg:hidden mt-6 space-y-2">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Beautiful interfaces built in minutes
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>50+ Components</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span>Ready to Use</span>
          </div>
        </div>
      </div>
    </div>
  );
}
