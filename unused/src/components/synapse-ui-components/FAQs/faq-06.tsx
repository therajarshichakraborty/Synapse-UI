"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I create my first project?",
    answer:
      "Click the 'New Project' button in your dashboard, choose a template or start from scratch, and follow the guided setup wizard to configure your project settings.",
  },
  {
    question: "What integrations are available?",
    answer:
      "We support 200+ integrations including Slack, GitHub, Jira, Notion, Google Workspace, Microsoft 365, Salesforce, and many more. Check our integrations page for the full list.",
  },
  {
    question: "How do I invite team members?",
    answer:
      "Go to Settings > Team > Invite Members. Enter their email addresses and assign roles. They'll receive an invitation link to join your workspace.",
  },
  {
    question: "What's the difference between plans?",
    answer:
      "Our plans differ in storage limits, number of team members, advanced features, and support levels. Compare plans on our pricing page to find the best fit.",
  },
  {
    question: "How do I export my data?",
    answer:
      "Navigate to Settings > Data > Export. Choose your preferred format (CSV, JSON, or PDF) and select the data range. Your export will be ready within minutes.",
  },
];

export default function Faq06() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 w-full bg-gradient-to-b from-slate-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              Got Questions?
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              We have answers. If you can&apos;t find what you&apos;re looking for, reach out to our
              support team.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border transition-all duration-300",
                  openIndex === index
                    ? "border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/20 shadow-lg shadow-blue-500/10"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700",
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span
                    className={cn(
                      "font-medium transition-colors",
                      openIndex === index
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-zinc-900 dark:text-white",
                    )}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-300",
                      openIndex === index
                        ? "rotate-180 text-blue-600 dark:text-blue-400"
                        : "text-zinc-400",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openIndex === index ? "max-h-96" : "max-h-0",
                  )}
                >
                  <p className="px-5 pb-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
