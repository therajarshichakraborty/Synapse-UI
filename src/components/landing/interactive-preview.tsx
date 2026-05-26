"use client";

import { useState, useEffect } from "react";
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
        <pre className="text-xs text-white dark:text-zinc-900">
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
          "bg-zinc-950 dark:bg-zinc-50 border border-zinc-900 dark:border-zinc-100",
          "bg-zinc-800 dark:bg-zinc-200 border border-zinc-700 dark:border-zinc-300",
          "bg-zinc-600 dark:bg-zinc-400 border border-zinc-550 dark:border-zinc-450",
          "bg-zinc-400 dark:bg-zinc-600 border border-zinc-350 dark:border-zinc-650",
          "bg-zinc-200 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-900",
          "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50",
        ].map((color, i) => (
          <div
            key={i}
            className={cn("aspect-square rounded-lg transition-transform hover:scale-105", color)}
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
      <div className="flex items-center justify-center">
        <div
          className="w-16 h-16 bg-linear-to-tr from-zinc-900 via-zinc-400 to-zinc-100 dark:from-zinc-100 dark:via-zinc-650 dark:to-zinc-900 rounded-2xl animate-spin border border-zinc-200 dark:border-zinc-800"
          style={{ animationDuration: "2s", animationTimingFunction: "ease-in-out" }}
        />
      </div>
    ),
  },
];

export function InteractivePreview() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [panelVisible, setPanelVisible] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleFeatureChange = (index: number) => {
    // Briefly hide panel to retrigger CSS entrance animation
    setPanelVisible(false);
    setTimeout(() => {
      setActiveFeature(index);
      setPanelVisible(true);
    }, 60);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
        <div className="space-y-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-2xl cursor-pointer",
                "transition-transform duration-200 ease-out hover:translate-x-1",
                activeFeature === index
                  ? "bg-zinc-100 dark:bg-zinc-800/50"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-800/30",
              )}
              onClick={() => handleFeatureChange(index)}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:h-[400px] p-8 rounded-3xl bg-linear-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
          <div
            className={cn(
              "w-full h-full",
              "transition-all duration-300 ease-out",
              mounted && panelVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            )}
          >
            {FEATURES[activeFeature].preview}
          </div>
        </div>
      </div>
    </div>
  );
}
