"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What industries do you serve?",
    answer:
      "We serve a wide range of industries including technology, healthcare, finance, education, retail, and manufacturing. Our flexible platform adapts to various business needs.",
  },
  {
    question: "Can I integrate with existing tools?",
    answer:
      "Absolutely! We offer native integrations with 200+ popular tools including Salesforce, HubSpot, Slack, Microsoft Teams, and many more. Custom API integrations are also available.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide 24/7 email support for all users, priority chat support for Pro users, and dedicated success managers for Enterprise customers.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "Monthly plans have no long-term commitment—cancel anytime. Annual plans offer significant savings and can be canceled with prorated refunds.",
  },
  {
    question: "How do you handle data privacy?",
    answer:
      "We are GDPR, CCPA, and SOC 2 compliant. You own your data and can export or delete it at any time. We never sell your information to third parties.",
  },
];

export default function Faq12() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-16 w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">FAQ</span>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              Have questions? We have answers.
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className={cn(
                  "group relative p-6 rounded-2xl cursor-pointer transition-all duration-300",
                  "bg-white dark:bg-zinc-900",
                  "border-2",
                  activeIndex === index
                    ? "border-indigo-500 shadow-xl shadow-indigo-500/10"
                    : hoveredIndex === index
                      ? "border-indigo-300 dark:border-indigo-700 shadow-lg"
                      : "border-zinc-200 dark:border-zinc-800",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={cn(
                      "font-semibold text-lg transition-colors",
                      activeIndex === index
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-zinc-900 dark:text-white",
                    )}
                  >
                    {faq.question}
                  </h3>
                  <ArrowRight
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      activeIndex === index
                        ? "rotate-90 text-indigo-600 dark:text-indigo-400"
                        : "text-zinc-400 group-hover:translate-x-1",
                    )}
                  />
                </div>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    activeIndex === index ? "max-h-48 mt-4" : "max-h-0",
                  )}
                >
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
