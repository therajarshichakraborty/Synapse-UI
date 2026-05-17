"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    number: "01",
    question: "What makes your platform unique?",
    answer:
      "Our platform combines cutting-edge AI technology with intuitive design, enabling teams to work smarter and faster than ever before.",
  },
  {
    number: "02",
    question: "How long does setup take?",
    answer:
      "Most teams are fully set up within 30 minutes. Our onboarding specialists are available to help if you need personalized assistance.",
  },
  {
    number: "03",
    question: "Do you offer custom solutions?",
    answer:
      "Yes, our Enterprise plan includes custom feature development, dedicated infrastructure, and white-label options tailored to your needs.",
  },
  {
    number: "04",
    question: "What training resources are available?",
    answer:
      "We provide comprehensive documentation, video tutorials, live webinars, and optional one-on-one training sessions for enterprise clients.",
  },
  {
    number: "05",
    question: "How do updates and new features work?",
    answer:
      "We release updates bi-weekly. All updates are automatic and backward-compatible, so your workflows remain uninterrupted.",
  },
];

export default function Faq10() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-16 w-full bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Common Questions
            </h2>
            <p className="mt-4 text-zinc-400 text-lg">
              Everything you need to know before getting started
            </p>
          </div>
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "border-b border-zinc-800 transition-colors",
                  activeIndex === index && "bg-zinc-800/30",
                )}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="flex w-full items-start gap-6 py-6 px-4 text-left group"
                >
                  <span
                    className={cn(
                      "text-2xl font-bold transition-colors",
                      activeIndex === index
                        ? "text-amber-500"
                        : "text-zinc-700 group-hover:text-zinc-500",
                    )}
                  >
                    {faq.number}
                  </span>
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "text-lg font-semibold transition-colors",
                        activeIndex === index
                          ? "text-white"
                          : "text-zinc-300 group-hover:text-white",
                      )}
                    >
                      {faq.question}
                    </h3>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        activeIndex === index ? "max-h-48 mt-3" : "max-h-0",
                      )}
                    >
                      <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
