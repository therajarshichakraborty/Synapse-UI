"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Code, Palette, Zap } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  preview: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    icon: <Code className="w-5 h-5" />,
    title: "Copy & Paste Ready",
    description: "Every component is ready to be copied directly into your project.",
    preview: (
      <div className="w-full h-full bg-linear-to-br from-zinc-900 to-zinc-800 dark:from-zinc-200 dark:to-zinc-100 rounded-lg p-4">
        <pre className="text-xs text-white dark:text-zinc-900 overflow-x-auto">
          <code>{`export function Button() {\n  return (\n    <button className="...">\n      Click me\n    </button>\n  );\n}`}</code>
        </pre>
      </div>
    ),
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Fully Customizable",
    description: "Tailwind-based styling that's easy to modify and extend.",
    preview: (
      <div className="grid grid-cols-3 gap-2">
        {[
          "bg-blue-500",
          "bg-emerald-500",
          "bg-indigo-500",
          "bg-amber-500",
          "bg-indigo-500",
          "bg-cyan-500",
        ].map((color, i) => (
          <div
            key={i}
            className={cn(
              "aspect-square rounded-lg transition-transform hover:scale-105 cursor-pointer",
              color,
            )}
          />
        ))}
      </div>
    ),
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Interactive Elements",
    description: "Smooth animations and transitions built-in.",
    preview: (
      <div className="flex items-center justify-center h-full min-h-[150px]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 bg-linear-to-r from-indigo-500 via-indigo-500 to-indigo-500 rounded-2xl"
        />
      </div>
    ),
  },
];

export default function LandingInteractivePreview() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 rounded-3xl p-6 sm:p-10 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-center">
        {/* Left Side: Accordion/Tab Picker */}
        <div className="space-y-4">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              className={cn(
                "p-5 rounded-2xl cursor-pointer border transition-all duration-300",
                activeFeature === index
                  ? "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                  : "bg-transparent border-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30",
              )}
              onClick={() => setActiveFeature(index)}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1 text-zinc-900 dark:text-zinc-50">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Showcase Display */}
        <div className="h-[300px] p-6 rounded-2xl bg-linear-to-b from-zinc-50/50 to-zinc-100/30 dark:from-zinc-900 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm"
          >
            {FEATURES[activeFeature].preview}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
