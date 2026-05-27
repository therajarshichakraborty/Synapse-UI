"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TailwindCSS from "@/components/Icons/tailwindcss";
import { Sparkles } from "lucide-react";

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

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const base = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-5";
  const visible = "opacity-100 translate-y-0";

  const topRowBase = "transition-all duration-500 ease-out";
  const hiddenScale = "opacity-0 -translate-y-5 scale-95";
  const visibleScale = "opacity-100 translate-y-0 scale-100";

  const bottomBase = "transition-all duration-500 ease-out";
  const hiddenBottom = "opacity-0 translate-y-5 scale-95";
  const visibleBottom = "opacity-100 translate-y-0 scale-100";

  return (
    <div className="mx-auto w-full max-w-7xl min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 px-4 sm:px-6 py-12 md:py-16 lg:py-20">
      {/* ── Left side ── */}
      <div className="w-full lg:w-[45%] flex flex-col items-start text-left space-y-8">
        {/* Gradient headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          <span className="text-zinc-900 dark:text-zinc-100">Welcome to </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">
            Synapse UI ...
          </span>
          <br />
          <span className="text-zinc-900 dark:text-zinc-100">Craft with </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500">
            ease
          </span>
          <br />
          <span className="text-zinc-900 dark:text-zinc-100">Build with </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500">
            precision
          </span>
        </h1>

        {/* Sub-headline */}
        <div className={`${base} ${mounted ? visible : hidden}`} style={{ transitionDelay: "0ms" }}>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
            A curated collection of{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              100+ premium UI components
            </span>{" "}
            crafted with{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Tailwind CSS</span> and{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">shadcn/ui</span> for
            modern React and Next.js applications.
          </p>
        </div>

        {/* CTA */}
        <div
          className={`${base} flex flex-col justify-start w-full ${mounted ? visible : hidden}`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="text-sm text-zinc-500 dark:text-zinc-400 pb-3 flex items-center gap-2">
            <TailwindCSS />
            <span className="flex items-center gap-1.5">
              Now updated for Tailwind CSS 4.0!
              <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                <Sparkles className="h-3 w-3 mr-1" />
                New
              </span>
            </span>
          </span>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <BrowseComponentsButton />
            <BrowseBlocksButton />
          </div>
        </div>

        <Features />
      </div>

      {/* ── Right side ── */}
      <div className="w-full lg:w-[55%] flex flex-col gap-5 lg:pl-4">
        {/* Row 1 — two cards side by side */}
        <div
          className={`${topRowBase} grid grid-cols-1 sm:grid-cols-2 gap-15 ${mounted ? visibleScale : hiddenScale}`}
          style={{ transitionDelay: "0ms" }}
        >
          <div className="flex items-center justify-center">
            <Card_01 href="/docs/components/card" />
          </div>
          <div className="flex items-center justify-center">
            <Card_25 />
          </div>
        </div>

        {/* Row 2 — AI input */}
        <div
          className={`${topRowBase} ${mounted ? visibleScale : hiddenScale}`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="w-full flex items-center justify-center py-2">
            <div className="w-full max-w-xl">
              <AIInput04 />
            </div>
          </div>
        </div>

        {/* Row 3 — buttons + inputs */}
        <div
          className={`${bottomBase} grid grid-cols-1 sm:grid-cols-2 gap-5 ${mounted ? visibleBottom : hiddenBottom}`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Buttons */}
          <div className="flex flex-col items-center gap-2.5">
            <Link href="/docs/components/button" className="w-full max-w-[220px]">
              <Button02 className="w-full" />
            </Link>
            <Link href="/docs/components/button" className="w-full max-w-[220px]">
              <Button09 className="w-full" />
            </Link>
            <Link href="/docs/components/button" className="w-full max-w-[220px]">
              <Btn01 className="w-full" />
            </Link>
            <Link href="/docs/components/button" className="w-full max-w-[220px]">
              <Button08 className="w-full" />
            </Link>
          </div>

          {/* Inputs */}
          <div className="flex flex-col justify-center gap-7 px-2">
            <Link href="/docs/components/input" className="w-full">
              <Input_01 />
            </Link>
            <Link href="/docs/components/input" className="w-full">
              <Input_06 />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
