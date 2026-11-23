"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I get started with the API?",
    answer:
      "Sign up for an account, generate your API key in Settings > Developer, and follow our quickstart guide. We provide SDKs for Python, JavaScript, Ruby, and Go.",
  },
  {
    question: "What are the rate limits?",
    answer:
      "Free: 100 req/min. Pro: 1,000 req/min. Enterprise: Custom limits. All plans include burst allowances for temporary spikes.",
  },
  {
    question: "Do you provide webhooks?",
    answer:
      "Yes! Configure webhooks for any event type. We support retry logic, signature verification, and delivery logs for debugging.",
  },
  {
    question: "Is there sandbox/testing mode?",
    answer:
      "Absolutely. Use our sandbox environment for development and testing. It mirrors production with no rate limits or billing.",
  },
  {
    question: "How do I migrate from a competitor?",
    answer:
      "We offer free migration assistance. Our team will help you map data, run parallel systems, and ensure a smooth transition.",
  },
];

export default function Faq19() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              Questions & Answers
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Find answers to the most common questions
            </p>
          </div>
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 flex flex-col gap-2">
              {faqs.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "p-4 rounded-xl text-left transition-all duration-200 border-2",
                    activeIndex === index
                      ? "bg-sky-50 dark:bg-sky-950/30 border-sky-500 text-sky-700 dark:text-sky-400"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700",
                  )}
                >
                  <span className="font-medium">{faq.question}</span>
                </button>
              ))}
            </div>
            <div className="lg:col-span-7">
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white">
                <span className="text-sky-200 text-sm font-medium uppercase tracking-wider">
                  Answer
                </span>
                <h3 className="mt-4 text-xl font-semibold">{faqs[activeIndex].question}</h3>
                <p className="mt-4 text-sky-100 leading-relaxed text-lg">
                  {faqs[activeIndex].answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
