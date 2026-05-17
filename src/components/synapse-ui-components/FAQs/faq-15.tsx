"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const faqs = [
  {
    question: "How secure is your platform?",
    answer:
      "We implement enterprise-grade security including end-to-end encryption, SSO, MFA, audit logs, and compliance with SOC 2, GDPR, and HIPAA standards.",
  },
  {
    question: "What's your uptime guarantee?",
    answer:
      "We guarantee 99.99% uptime with our Enterprise plan. Our infrastructure is distributed across multiple regions for maximum reliability.",
  },
  {
    question: "Can I self-host the platform?",
    answer:
      "Yes, we offer a self-hosted option for Enterprise customers. This includes full control over your data and infrastructure with our support.",
  },
  {
    question: "How does version control work?",
    answer:
      "Every change is automatically versioned. You can view history, compare versions, and restore any previous state with a single click.",
  },
  {
    question: "Do you offer a partner program?",
    answer:
      "Yes! Our partner program includes reseller discounts, co-marketing opportunities, technical training, and dedicated partner support.",
  },
];

export default function Faq15() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-cyan-500" />
            <span className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              FAQ
            </span>
          </div>
          <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl mb-12">
            Things people often ask
          </h2>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2 space-y-2">
              {faqs.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => setOpenIndex(index)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl transition-all duration-200",
                    openIndex === index
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800",
                  )}
                >
                  <span className="font-medium">{faq.question}</span>
                </button>
              ))}
            </div>
            <div className="lg:w-1/2">
              <div className="sticky top-8 p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                  {faqs[openIndex].question}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faqs[openIndex].answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
