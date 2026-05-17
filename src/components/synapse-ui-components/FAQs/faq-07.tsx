"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for annual plans.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! We offer a 14-day free trial with full access to all Pro features. No credit card required to start your trial.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact support for a full refund.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Reach us via live chat (available 24/7), email at support@example.com, or schedule a call with our team through the help center.",
  },
];

export default function Faq07() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          <div className="lg:sticky lg:top-8">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
              Questions & Answers
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Find quick answers to common questions. Need more help? Our support team is always
              ready to assist you.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">?</span>
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-white">Still have questions?</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Contact our friendly support team
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-xl border-2 transition-all duration-200",
                  openIndex === index
                    ? "border-violet-500 dark:border-violet-500"
                    : "border-zinc-200 dark:border-zinc-800",
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between p-5"
                >
                  <span className="text-left font-semibold text-zinc-900 dark:text-white">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                      openIndex === index
                        ? "bg-violet-500 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
                    )}
                  >
                    {openIndex === index ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
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
