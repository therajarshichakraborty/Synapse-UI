"use client";

import type React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, ArrowDownRight } from "lucide-react";

import Features from "./featchers";
import Card_01 from "@/components/synapse-ui-components/cards/card-01";
import Card_25 from "@/components/synapse-ui-components/cards/card-25";
import { AIInput04 } from "@/components/synapse-ui-components/ai-inputs/ai-input-04";
import Input_01 from "@/components/synapse-ui-components/inputs/input-01";
import Input_06 from "@/components/synapse-ui-components/inputs/input-06";
import Btn01 from "@/components/synapse-ui-components/buttons/button-01";
import Button02 from "@/components/synapse-ui-components/buttons/button-02";
import Button08 from "@/components/synapse-ui-components/buttons/button-08";
import Button09 from "@/components/synapse-ui-components/buttons/button-09";

// Inline TailwindCSS Logo for portability
const TailwindLogo = () => (
  <svg
    viewBox="0 0 256 154"
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
  >
    <defs>
      <linearGradient x1="-2.778%" y1="32%" x2="100%" y2="67.556%" id="tailwind-logo-grad">
        <stop stopColor="#2298BD" offset="0%" />
        <stop stopColor="#0ED7B5" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z"
      fill="url(#tailwind-logo-grad)"
    />
  </svg>
);

export default function LandingHero() {
  return (
    <div className="mx-auto w-full max-w-7xl min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-6 py-12 md:py-16">
      {/* Left side - Title and CTA */}
      <div className="w-full lg:w-[45%] flex flex-col items-start text-left space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-100">
            Craft with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-cyan-500 to-indigo-500 dark:from-rose-400 dark:via-cyan-400 dark:to-indigo-400">
              precision
            </span>
            <br />
            build with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-cyan-500 to-rose-500 dark:from-indigo-400 dark:via-cyan-400 dark:to-rose-400">
              ease
            </span>
            .
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
            A curated collection of{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              100+ premium UI components
            </span>{" "}
            crafted with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-cyan-500 dark:from-rose-400 dark:to-cyan-400 font-bold">
              Tailwind CSS
            </span>{" "}
            and{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-indigo-500 dark:from-cyan-400 dark:to-indigo-400 font-bold">
              shadcn/ui
            </span>{" "}
            for modern React and Next.js applications.
          </p>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-start w-full"
        >
          <span className="text-xs text-zinc-500 dark:text-zinc-400 pb-3 text-start flex items-center gap-2">
            <TailwindLogo />
            <span className="flex items-center gap-1.5 font-medium">
              Now updated for Tailwind CSS 4.0!
              <span className="inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300">
                <Sparkles className="h-3 w-3 mr-1" />
                New
              </span>
            </span>
          </span>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 w-full sm:w-auto">
            {/* Browse Components Button */}
            <Link href="/docs" className="group">
              <div className="relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl font-semibold h-11 px-5 bg-black text-white dark:bg-white dark:text-black border border-zinc-800 dark:border-zinc-200 hover:opacity-90 active:scale-[0.98] transition-all shadow-xs">
                <span>Browse Components</span>
                <ArrowDownRight className="w-4 h-4 rotate-[270deg] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>

            {/* Premium UI Blocks Button */}
            <Link href="#" className="group">
              <div className="relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl font-semibold h-11 px-5 bg-white text-black dark:bg-[#0e1111] dark:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-[0.98] transition-all shadow-xs">
                <span>Visit Premium UI Blocks</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </motion.div>

        <Features />
      </div>

      {/* Right side - Components Layout */}
      <div className="w-full lg:w-[50%] flex flex-col justify-between gap-6 lg:pl-4">
        {/* Top row: Card + Action Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-center"
        >
          {/* Card component */}
          <div className="w-full flex flex-col items-center justify-center">
            <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-2 font-mono">
              card-01
            </span>
            <div className="w-full max-w-xs">
              <Card_01 href="/docs/components/card" />
            </div>
          </div>

          {/* Action Search Bar */}
          <div className="w-full flex flex-col items-center justify-center">
            <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-2 font-mono">
              card-25
            </span>
            <div className="w-full max-w-xs">
              <Card_25 />
            </div>
          </div>
        </motion.div>

        {/* Middle row: AI Chat Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex flex-col items-center"
        >
          <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-2 font-mono">
            ai-input-04
          </span>
          <div className="w-full max-w-md p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-center">
            <AIInput04 />
          </div>
        </motion.div>

        {/* Bottom row: Buttons on left, Inputs on right */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Left side - Buttons Stack */}
          <div className="w-full flex flex-col items-center">
            <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-2 font-mono">
              buttons showcase
            </span>
            <div className="w-full max-w-xs flex flex-col items-center gap-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/20">
              <Link href="/docs/components/button">
                <Button02 className="w-40 py-2.5" />
              </Link>
              <Link href="/docs/components/button">
                <Button09 className="w-40 py-2.5" />
              </Link>
              <Link href="/docs/components/button">
                <Btn01 className="w-40 py-2.5" />
              </Link>
              <Link href="/docs/components/button">
                <Button08 className="w-40 py-2.5" />
              </Link>
            </div>
          </div>

          {/* Right side - Inputs Stack */}
          <div className="w-full flex flex-col items-center">
            <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-2 font-mono">
              inputs showcase
            </span>
            <div className="w-full max-w-xs flex flex-col gap-6 p-4 justify-center h-full">
              <Link href="/docs/components/input" className="w-full block">
                <Input_01 />
              </Link>
              <Link href="/docs/components/input" className="w-full block">
                <Input_06 />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
