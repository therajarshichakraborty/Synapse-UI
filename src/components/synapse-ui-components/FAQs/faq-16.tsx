"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqColumns = [
  [
    {
      question: "What is your refund policy?",
      answer:
        "We offer a full refund within 30 days of purchase, no questions asked. Simply contact support to process your refund.",
    },
    {
      question: "How do I upgrade my plan?",
      answer:
        "Go to Settings > Billing > Change Plan. Select your new plan and confirm. Changes take effect immediately.",
    },
    {
      question: "Can I pause my subscription?",
      answer:
        "Yes, you can pause for up to 3 months. Your data will be preserved and you can resume anytime.",
    },
  ],
  [
    {
      question: "Do you offer annual discounts?",
      answer:
        "Yes! Save 20% when you choose annual billing. The discount is applied automatically at checkout.",
    },
    {
      question: "How do I add team members?",
      answer:
        "Navigate to Team Settings and click 'Invite Members'. Enter their email addresses and select their roles.",
    },
    {
      question: "What's included in support?",
      answer:
        "All plans include email support. Pro plans add live chat, and Enterprise includes 24/7 phone support.",
    },
  ],
];

export default function Faq16() {
  return (
    <section className="py-16 w-full bg-gradient-to-b from-amber-50 to-orange-50 dark:from-zinc-950 dark:to-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 mb-4">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              Got Questions?
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              We&apos;ve got answers to your most common questions
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {faqColumns.map((column, colIndex) => (
              <Accordion key={colIndex} type="single" collapsible className="space-y-4">
                {column.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`col-${colIndex}-item-${faqIndex}`}
                    className="bg-white dark:bg-zinc-900 rounded-xl border border-amber-200/50 dark:border-zinc-800 px-5 shadow-sm"
                  >
                    <AccordionTrigger className="py-4 text-left hover:no-underline font-medium text-zinc-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
