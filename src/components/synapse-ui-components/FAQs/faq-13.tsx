"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the free trial work?",
    answer:
      "Start with a 14-day free trial of our Pro plan with all features unlocked. No credit card required. At the end of your trial, choose a plan that fits your needs.",
  },
  {
    question: "Can I upgrade or downgrade anytime?",
    answer:
      "Yes, you can change your plan at any time. Upgrades take effect immediately with prorated billing. Downgrades apply at your next billing cycle.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "You can export all your data before canceling. After cancellation, data is retained for 30 days in case you change your mind, then permanently deleted.",
  },
  {
    question: "Do you offer discounts for nonprofits?",
    answer:
      "Yes! We offer 50% off for verified nonprofit organizations and educational institutions. Contact us with proof of nonprofit status to apply.",
  },
  {
    question: "Is there an API available?",
    answer:
      "Yes, we provide a comprehensive REST API with full documentation. Pro and Enterprise plans include API access with generous rate limits.",
  },
  {
    question: "How often do you release updates?",
    answer:
      "We ship new features and improvements every two weeks. Major releases happen quarterly with advance notice and migration guides when needed.",
  },
];

export default function Faq13() {
  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400 mb-4">
                <MessageCircle className="h-4 w-4" />
                FAQ
              </span>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white lg:text-4xl">
                Questions? Look here.
              </h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Can&apos;t find what you&apos;re looking for? Reach out to our customer support
                team.
              </p>
              <button className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors">
                Contact Support
              </button>
            </div>
            <div className="lg:col-span-3">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 data-[state=open]:bg-orange-50 dark:data-[state=open]:bg-orange-950/20 data-[state=open]:border-orange-200 dark:data-[state=open]:border-orange-900/50 transition-colors"
                  >
                    <AccordionTrigger className="py-4 text-left hover:no-underline text-zinc-900 dark:text-white font-medium hover:text-orange-600 dark:hover:text-orange-400">
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
      </div>
    </section>
  );
}
