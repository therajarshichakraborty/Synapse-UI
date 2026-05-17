"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle, ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "What file formats can I upload?",
    answer:
      "We support PDF, DOCX, XLSX, PPTX, images (PNG, JPG, GIF, WebP), videos (MP4, MOV), and more. Maximum file size is 100MB on Pro plans.",
  },
  {
    question: "How does real-time collaboration work?",
    answer:
      "Multiple users can edit simultaneously with live cursors, presence indicators, and instant sync. Changes appear in real-time for all participants.",
  },
  {
    question: "Can I automate workflows?",
    answer:
      "Yes! Use our visual automation builder to create custom workflows. Trigger actions based on events, schedules, or conditions.",
  },
  {
    question: "What's the difference between workspaces and projects?",
    answer:
      "Workspaces are for your organization or team. Projects live inside workspaces and contain your actual work, tasks, and files.",
  },
  {
    question: "How do permissions work?",
    answer:
      "Set granular permissions at workspace, project, and item levels. Choose from Owner, Admin, Editor, Commenter, or Viewer roles.",
  },
];

export default function Faq18() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-16 w-full bg-zinc-100 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-lime-500 flex items-center justify-center">
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">Quick answers to common questions</p>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "border-b border-zinc-100 dark:border-zinc-800 last:border-0",
                  activeIndex === index && "bg-lime-50 dark:bg-lime-950/20",
                )}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <ChevronRight
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-200",
                      activeIndex === index
                        ? "rotate-90 text-lime-600 dark:text-lime-400"
                        : "text-zinc-400",
                    )}
                  />
                  <span
                    className={cn(
                      "font-medium transition-colors",
                      activeIndex === index
                        ? "text-lime-700 dark:text-lime-400"
                        : "text-zinc-900 dark:text-white",
                    )}
                  >
                    {faq.question}
                  </span>
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    activeIndex === index ? "max-h-48" : "max-h-0",
                  )}
                >
                  <p className="px-5 pb-5 pl-14 text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
