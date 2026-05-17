"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is included in the starter plan?",
    answer:
      "The starter plan includes access to all basic features, 5GB storage, email support, and up to 3 team members. Perfect for small teams getting started.",
  },
  {
    question: "How does the billing cycle work?",
    answer:
      "Billing occurs on a monthly or annual basis, depending on your chosen plan. Annual plans receive a 20% discount. You can switch between billing cycles at any time.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period with no additional charges.",
  },
  {
    question: "Do you offer enterprise solutions?",
    answer:
      "Absolutely! Our enterprise plan offers unlimited storage, dedicated support, custom integrations, and advanced security features. Contact our sales team for a custom quote.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is our top priority. We use industry-standard encryption, regular security audits, and comply with GDPR, SOC 2, and HIPAA regulations.",
  },
];

export default function Faq05() {
  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-sm font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
            Support
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Everything you need to know about our product and billing.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-zinc-200 dark:border-zinc-800"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-zinc-900 dark:text-white hover:no-underline hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
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
