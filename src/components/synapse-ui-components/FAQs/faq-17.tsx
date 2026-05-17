"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do notifications work?",
    answer:
      "Customize notifications for email, push, and in-app. Set quiet hours, choose notification types, and control frequency for each channel.",
  },
  {
    question: "Can I white-label the product?",
    answer:
      "Enterprise plans include full white-label capabilities including custom domains, branding, and removal of our logo.",
  },
  {
    question: "What languages are supported?",
    answer:
      "We support 25+ languages including English, Spanish, French, German, Japanese, Chinese, and more. The interface adapts automatically.",
  },
  {
    question: "How do I report a bug?",
    answer:
      "Use the in-app feedback button or email bugs@example.com. Include steps to reproduce, screenshots, and your browser/OS details.",
  },
  {
    question: "Is there a community forum?",
    answer:
      "Yes! Join our community of 50,000+ users to share tips, get help, and connect with other professionals in your industry.",
  },
];

export default function Faq17() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white sm:text-4xl mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-10">
            Click any question to reveal the answer
          </p>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "overflow-hidden rounded-2xl transition-all duration-300",
                  openItems.includes(index)
                    ? "bg-gradient-to-r from-fuchsia-500 to-pink-500 p-[2px]"
                    : "bg-transparent",
                )}
              >
                <div
                  className={cn(
                    "rounded-2xl transition-colors",
                    openItems.includes(index)
                      ? "bg-white dark:bg-zinc-950"
                      : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
                  )}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between p-5"
                  >
                    <span
                      className={cn(
                        "font-semibold text-left transition-colors",
                        openItems.includes(index)
                          ? "text-fuchsia-600 dark:text-fuchsia-400"
                          : "text-zinc-900 dark:text-white",
                      )}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 transition-all duration-300",
                        openItems.includes(index) ? "rotate-180 text-fuchsia-500" : "text-zinc-400",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      openItems.includes(index) ? "max-h-48" : "max-h-0",
                    )}
                  >
                    <p className="px-5 pb-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
