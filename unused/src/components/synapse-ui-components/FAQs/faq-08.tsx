"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "general", label: "General" },
  { id: "pricing", label: "Pricing" },
  { id: "security", label: "Security" },
  { id: "support", label: "Support" },
];

const faqs = [
  {
    category: "general",
    question: "What is this platform?",
    answer:
      "Our platform is a comprehensive solution for managing your digital workflow, designed to boost productivity and collaboration across teams.",
  },
  {
    category: "general",
    question: "How do I get started?",
    answer:
      "Sign up for a free account, complete the onboarding wizard, and you'll be ready to create your first project in under 5 minutes.",
  },
  {
    category: "pricing",
    question: "What's included in the free plan?",
    answer:
      "The free plan includes up to 3 projects, 1GB storage, basic analytics, and access to our community forum.",
  },
  {
    category: "pricing",
    question: "Can I switch plans anytime?",
    answer:
      "Yes, upgrade or downgrade at any time. Pro-rated charges or credits will be applied to your next billing cycle.",
  },
  {
    category: "security",
    question: "How is my data protected?",
    answer:
      "We use AES-256 encryption, regular security audits, and are SOC 2 Type II certified. Your data is stored in secure, redundant data centers.",
  },
  {
    category: "security",
    question: "Do you offer two-factor authentication?",
    answer:
      "Yes, 2FA is available for all accounts. We support authenticator apps, SMS, and hardware security keys.",
  },
  {
    category: "support",
    question: "What support options are available?",
    answer:
      "We offer email support for all users, priority chat support for Pro users, and dedicated account managers for Enterprise customers.",
  },
  {
    category: "support",
    question: "What are your support hours?",
    answer:
      "Our support team is available 24/7 for critical issues. General inquiries are handled Monday-Friday, 9am-6pm EST.",
  },
];

export default function Faq08() {
  const [activeTab, setActiveTab] = useState("general");

  const filteredFaqs = faqs.filter((faq) => faq.category === activeTab);

  return (
    <section className="py-16 w-full bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Browse by category to find what you need
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                  activeTab === cat.id
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg"
                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
