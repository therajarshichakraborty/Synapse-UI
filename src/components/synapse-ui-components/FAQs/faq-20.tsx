"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleHelp } from "lucide-react";

const faqs = [
  {
    question: "What happens when I reach my storage limit?",
    answer:
      "You'll receive a notification at 80% and 95% usage. At 100%, you can still access files but cannot upload new ones until you upgrade or free up space.",
  },
  {
    question: "Can I share files with external users?",
    answer:
      "Yes! Create shareable links with optional password protection, expiration dates, and download limits. Track who views your shared content.",
  },
  {
    question: "How do I recover deleted files?",
    answer:
      "Deleted files go to Trash and are kept for 30 days (90 days on Pro). Restore them anytime or permanently delete to free up storage.",
  },
  {
    question: "Is there a desktop sync app?",
    answer:
      "Yes, our desktop app syncs files automatically between your computer and the cloud. Available for Windows, Mac, and Linux.",
  },
  {
    question: "What compliance certifications do you have?",
    answer:
      "We're SOC 2 Type II, ISO 27001, GDPR, CCPA, and HIPAA compliant. Enterprise customers can request our latest audit reports.",
  },
  {
    question: "Do you offer priority support?",
    answer:
      "Pro plans include priority email and chat support. Enterprise plans add 24/7 phone support with guaranteed response times.",
  },
];

export default function Faq17() {
  return (
    <section className="py-16 w-full bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-6">
              <CircleHelp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-zinc-400">Everything you need to know about our service</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-zinc-800 rounded-xl bg-zinc-900/50 px-6 data-[state=open]:border-emerald-500/50 data-[state=open]:bg-emerald-950/20 transition-colors"
              >
                <AccordionTrigger className="py-5 text-left hover:no-underline text-white font-medium hover:text-emerald-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-zinc-400 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
