"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tabs = ["Product", "Pricing", "Security"];

const faqData: Record<string, { question: string; answer: string }[]> = {
  Product: [
    {
      question: "What platforms do you support?",
      answer:
        "We support web, iOS, Android, Windows, and macOS. Our apps sync seamlessly across all platforms in real-time.",
    },
    {
      question: "Can I import from other tools?",
      answer:
        "Yes! We support imports from Notion, Trello, Asana, Jira, and many more. Our migration wizard makes switching easy.",
    },
    {
      question: "Is there offline support?",
      answer:
        "Our desktop and mobile apps work offline. Changes sync automatically when you reconnect to the internet.",
    },
  ],
  Pricing: [
    {
      question: "Is there a free plan?",
      answer:
        "Yes! Our free plan includes core features, 1GB storage, and up to 3 team members. Perfect for getting started.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual enterprise plans.",
    },
    {
      question: "Do you offer educational discounts?",
      answer:
        "Yes! Students and educators get 50% off. Verified educational institutions can get free access for classrooms.",
    },
  ],
  Security: [
    {
      question: "How is my data encrypted?",
      answer:
        "All data is encrypted with AES-256 at rest and TLS 1.3 in transit. We use zero-knowledge architecture for sensitive data.",
    },
    {
      question: "Do you support SSO?",
      answer:
        "Enterprise plans include SSO with SAML 2.0 and OAuth. We integrate with Okta, Azure AD, Google, and more.",
    },
    {
      question: "Are you GDPR compliant?",
      answer:
        "Yes, we're fully GDPR compliant. We also comply with CCPA, HIPAA, and SOC 2 Type II requirements.",
    },
  ],
};

export default function Faq24() {
  const [activeTab, setActiveTab] = useState("Product");

  return (
    <section className="py-16 w-full bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">Find answers organized by topic</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-full bg-zinc-200 dark:bg-zinc-800">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all",
                    activeTab === tab
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6">
            <Accordion type="single" collapsible className="space-y-2">
              {faqData[activeTab].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-0 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 px-4"
                >
                  <AccordionTrigger className="py-4 text-left hover:no-underline font-medium text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
