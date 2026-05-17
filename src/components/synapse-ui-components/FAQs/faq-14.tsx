"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What are the system requirements?",
    answer:
      "Our web app works on any modern browser. Desktop apps require Windows 10+, macOS 10.15+, or Ubuntu 18.04+. Mobile apps need iOS 14+ or Android 10+.",
  },
  {
    question: "How do I collaborate with my team?",
    answer:
      "Invite team members via email, set permissions and roles, and start collaborating in real-time. Comments, mentions, and activity feeds keep everyone in sync.",
  },
  {
    question: "Can I customize the workspace?",
    answer:
      "Yes! Customize themes, layouts, keyboard shortcuts, and workflows. Enterprise plans include custom branding and white-label options.",
  },
  {
    question: "What analytics are available?",
    answer:
      "Track usage, performance metrics, team productivity, and custom KPIs. Export reports or connect to your BI tools via our API.",
  },
  {
    question: "How do backups work?",
    answer:
      "We perform automatic backups every hour with 30-day retention. Enterprise plans include custom backup schedules and longer retention periods.",
  },
];

export default function Faq14() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-16 w-full bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked</h2>
            <div className="mt-2 mx-auto h-1 w-24 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full" />
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-violet-500 to-cyan-500" />
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="relative pl-16">
                  <div
                    className={cn(
                      "absolute left-6 top-6 h-4 w-4 rounded-full border-2 transition-colors duration-300",
                      activeIndex === index
                        ? "bg-violet-500 border-violet-500"
                        : "bg-zinc-950 border-zinc-700",
                    )}
                  />
                  <div
                    className={cn(
                      "p-6 rounded-2xl transition-all duration-300 cursor-pointer",
                      activeIndex === index
                        ? "bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-violet-500/30"
                        : "bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700",
                    )}
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  >
                    <h3 className="font-semibold text-white text-lg">{faq.question}</h3>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        activeIndex === index ? "max-h-48 mt-3" : "max-h-0",
                      )}
                    >
                      <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
                    </div>
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
