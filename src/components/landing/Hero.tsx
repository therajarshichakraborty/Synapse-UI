"use client";

import type React from "react";
import Link from "next/link";
import TailwindCSS from "@/components/Icons/tailwindcss";
import { motion } from "motion/react";
import {
  PlaneTakeoff,
  BarChart2,
  Video,
  AudioLines,
  Globe,
  Diamond,
  Sparkles,
  Code,
  Layers,
} from "lucide-react";

import { BrowseBlocksButton } from "../ui/browse-blocks";
import { BrowseComponentsButton } from "../ui/browse-button";
import Features from "@/components/landing/featchers";
import Card_01 from "../synapse-ui-components/cards/card-01";
import Card_25 from "../synapse-ui-components/cards/card-25";
import { AIInput04 } from "../synapse-ui-components/ai-inputs/ai-input-04";
import Input_01 from "../synapse-ui-components/inputs/input-01";
import Input_06 from "../synapse-ui-components/inputs/input-06";
import Btn01 from "../synapse-ui-components/buttons/button-01";
import Button02 from "../synapse-ui-components/buttons/button-02";
import Button08 from "../synapse-ui-components/buttons/button-08";
import Button09 from "../synapse-ui-components/buttons/button-09";

interface Action {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  short?: string;
  end?: string;
}

export default function HeroSection() {
  return (
    <div className="mx-auto w-full max-w-7xl min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-6 py-12 md:py-16 lg:py-20  ">
      {/* Left side - Title and CTA */}
      <div className="w-full lg:w-[45%] flex flex-col items-start text-left space-y-8 lg:-mt-70">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-100">
            Craft with{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-rose-500 via-fuchsia-500 to-purple-500 dark:from-rose-400 dark:via-fuchsia-400 dark:to-purple-400">
              precision
            </span>
            <br />
            build with{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-500 via-fuchsia-500 to-rose-500 dark:from-purple-400 dark:via-fuchsia-400 dark:to-rose-400">
              ease
            </span>
            .
          </h1>
          <p className="mt-6 text-base md:text-xl text-zinc-700 dark:text-zinc-300 max-w-lg">
            A curated collection of{" "}
            <span className="font-semibold">100+ premium UI components</span> crafted with{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-rose-500 to-fuchsia-500 dark:from-rose-400 dark:to-fuchsia-400">
              Tailwind CSS
            </span>{" "}
            and{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-purple-500 dark:from-fuchsia-400 dark:to-purple-400">
              shadcn/ui
            </span>{" "}
            for modern React and Next.js applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-start w-full"
        >
          <span className="text-sm text-zinc-500 dark:text-zinc-300 pb-3 text-start flex items-center gap-2">
            <TailwindCSS />
            <span className="flex items-center gap-1.5">
              Now updated for Tailwind CSS 4.0!
              <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">
                <Sparkles className="h-3 w-3 mr-1" />
                New
              </span>
            </span>
          </span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-3">
            <BrowseComponentsButton />
            <BrowseBlocksButton />
          </div>
        </motion.div>
        <Features />
      </div>

      {/* Right side - Components Layout */}
      <div className="w-full lg:w-[55%] flex flex-col justify-between gap-6 lg:pl-8">
        {/* Top row: Card + Action Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center"
        >
          {/* Card component */}
          <div className="w-full flex flex-col items-center justify-center ">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 block text-center mb-2">
              <Card_01 href="/docs/components/card" />
            </span>
          </div>

          {/* Action Search Bar */}
          <div className="w-full max-w-150 bg-transparent mx-8">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 block text-center mb-2">
              <Card_25 />
            </span>
          </div>
        </motion.div>

        {/* Middle row: AI Chat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <span className="text-sm text-zinc-500 dark:text-zinc-400 block text-center mb-2"></span>

          <div className="w-full h-48 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            <AIInput04 />
          </div>
        </motion.div>

        {/* Bottom row: Buttons on left, Input on right */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left side - Buttons */}
          <div className="w-full ">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 block text-center mb-2 ">
              <div className="w-full h-68 rounded-xl  flex flex-col items-center justify-center gap-3 bg-transparent">
                <Link href="/docs/components/button">
                  <Button02 className=" w-42 py-5" />
                </Link>
                <Link href="/docs/components/button">
                  <Button09 className=" w-42 py-5" />
                </Link>
                <Link href="/docs/components/button">
                  <Btn01 className=" w-42 py-5" />
                </Link>
                <Link href="/docs/components/button">
                  <Button08 className=" w-42 py-5" />
                </Link>
              </div>
            </span>
          </div>

          {/* Right side - Input */}

          <div className="w-full mx-10 mt-4">
            <div className="flex flex-col gap-8">
              <Link href="/docs/components/input">
                <Input_01 />
              </Link>
              <Link href="/docs/components/input">
                <Input_06 />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
