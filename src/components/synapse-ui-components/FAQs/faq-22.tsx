"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, Send } from "lucide-react";

const faqs = [
  {
    question: "How do I customize my dashboard?",
    answer:
      "Click the gear icon in the top-right corner of your dashboard. Drag and drop widgets, resize panels, and save custom layouts for different workflows.",
  },
  {
    question: "Can I create custom reports?",
    answer:
      "Yes! Use our report builder to create custom reports with your chosen metrics, filters, and visualizations. Schedule automated delivery to your team.",
  },
  {
    question: "How does the AI assistant work?",
    answer:
      "Our AI learns from your usage patterns to suggest actions, automate repetitive tasks, and surface relevant information. It improves over time.",
  },
  {
    question: "What keyboard shortcuts are available?",
    answer:
      "Press Cmd/Ctrl + K to open the command palette and see all available shortcuts. You can also customize shortcuts in Settings > Preferences.",
  },
  {
    question: "How do I set up SSO?",
    answer:
      "Enterprise plans include SSO setup. We support SAML 2.0 and OAuth with providers like Okta, Azure AD, Google Workspace, and OneLogin.",
  },
];

export default function Faq22() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-16 w-full bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100 dark:from-zinc-950 dark:via-violet-950/20 dark:to-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 shadow-sm mb-6">
              <MessageSquare className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">FAQ</span>
            </div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              Have Questions?
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Here are the answers to our most frequently asked questions
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden transition-all duration-300",
                  activeIndex === index && "shadow-lg shadow-violet-500/10",
                )}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="flex w-full items-center gap-4 p-5"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                      activeIndex === index
                        ? "bg-violet-500 text-white"
                        : "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="flex-1 text-left font-medium text-zinc-900 dark:text-white">
                    {faq.question}
                  </span>
                  <Send
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      activeIndex === index
                        ? "rotate-45 text-violet-500"
                        : "text-zinc-400 -rotate-45",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    activeIndex === index ? "max-h-48" : "max-h-0",
                  )}
                >
                  <p className="px-5 pb-5 pl-[68px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
