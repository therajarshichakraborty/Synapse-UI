"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CreditCard, Shield, Zap, Users, HelpCircle, Settings } from "lucide-react";

const categories = [
  {
    icon: Zap,
    title: "Getting Started",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' and enter your email. You can also sign up with Google or GitHub for faster access.",
      },
      {
        question: "Is there a mobile app?",
        answer:
          "Yes, our iOS and Android apps are available for download. They sync seamlessly with the web version.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Billing",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa, Mastercard, American Express, PayPal, and bank transfers for annual subscriptions.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Yes, we offer a 30-day money-back guarantee on all plans. Contact support for assistance.",
      },
    ],
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    faqs: [
      {
        question: "Is my data encrypted?",
        answer:
          "Yes, all data is encrypted in transit with TLS 1.3 and at rest with AES-256 encryption.",
      },
      {
        question: "Where is my data stored?",
        answer:
          "Data is stored in SOC 2 compliant data centers. Enterprise customers can choose their preferred region.",
      },
    ],
  },
];

export default function Faq11() {
  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Organized by topic for easy navigation
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          {categories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                  <category.icon className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">{category.title}</h3>
              </div>
              <Accordion type="single" collapsible className="space-y-2">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`item-${catIndex}-${faqIndex}`}
                    className="border-0"
                  >
                    <AccordionTrigger className="py-3 text-sm text-left hover:no-underline text-zinc-700 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-zinc-500 dark:text-zinc-400 pb-3">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
