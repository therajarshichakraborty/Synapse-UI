"use client";

import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password' on the login page, enter your email, and follow the instructions in the reset email we send you.",
  },
  {
    question: "Can I use the app offline?",
    answer:
      "Yes, our desktop and mobile apps support offline mode. Changes sync automatically when you reconnect to the internet.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Go to Settings > Account > Delete Account. Please note this action is permanent and cannot be undone.",
  },
  {
    question: "What browsers are supported?",
    answer:
      "We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, keep your browser updated.",
  },
  {
    question: "How do I enable dark mode?",
    answer:
      "Click your profile icon, go to Preferences, and toggle the theme setting. You can also set it to follow your system preference.",
  },
  {
    question: "Can I import data from other tools?",
    answer:
      "Yes, we support imports from most popular tools. Go to Settings > Import and select your source to begin the migration.",
  },
];

export default function Faq09() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              Help Center
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Search our knowledge base for quick answers
            </p>
          </div>
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
            />
          </div>
          <div className="space-y-2">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-500 dark:text-zinc-400">
                  No results found for &quot;{searchQuery}&quot;
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-zinc-900 dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 text-zinc-400 transition-transform duration-200",
                        expandedIndex === index && "rotate-90",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      expandedIndex === index ? "max-h-48" : "max-h-0",
                    )}
                  >
                    <div className="px-5 pb-5 pt-0 border-t border-zinc-100 dark:border-zinc-800">
                      <p className="pt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
