"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const faqs = [
  {
    question: "What's your pricing model?",
    answer:
      "We offer transparent per-seat pricing with no hidden fees. Pay monthly or save 20% with annual billing. Volume discounts available for 50+ seats.",
  },
  {
    question: "Can I try before I buy?",
    answer:
      "Absolutely! Start with our 14-day free trial with full feature access. No credit card required. Upgrade anytime during or after your trial.",
  },
  {
    question: "What integrations are available?",
    answer:
      "We integrate with 200+ tools including Slack, GitHub, Jira, Figma, Google Workspace, and Microsoft 365. Use our API for custom integrations.",
  },
  {
    question: "How does onboarding work?",
    answer:
      "Get started in minutes with our self-service setup. Enterprise customers receive dedicated onboarding, training sessions, and a success manager.",
  },
  {
    question: "What's your data retention policy?",
    answer:
      "Active accounts: unlimited retention. After cancellation: 30-day grace period, then data is permanently deleted. Enterprise can customize retention.",
  },
];

export default function Faq21() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-8">
              <span className="text-sm font-semibold text-red-500 uppercase tracking-wider">
                Support
              </span>
              <h2 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-white lg:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Can&apos;t find what you&apos;re looking for? Feel free to contact our friendly
                team.
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-red-500 font-medium hover:text-red-600 transition-colors"
              >
                Contact support
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className={cn(
                    "p-5 rounded-2xl cursor-pointer transition-all duration-200",
                    activeIndex === index
                      ? "bg-red-50 dark:bg-red-950/30 ring-1 ring-red-200 dark:ring-red-900"
                      : "bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className={cn(
                        "font-semibold transition-colors",
                        activeIndex === index
                          ? "text-red-600 dark:text-red-400"
                          : "text-zinc-900 dark:text-white",
                      )}
                    >
                      {faq.question}
                    </h3>
                    <span
                      className={cn(
                        "shrink-0 text-xl font-light transition-transform duration-200",
                        activeIndex === index ? "text-red-500 rotate-45" : "text-zinc-400",
                      )}
                    >
                      +
                    </span>
                  </div>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      activeIndex === index ? "max-h-48 mt-3" : "max-h-0",
                    )}
                  >
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
