"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ListItem {
  id: string;
  question: string;
  answer: string;
}

interface List09Props {
  items?: ListItem[];
  className?: string;
}

const ITEMS: ListItem[] = [
  {
    id: "1",
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking the 'Forgot Password' link on the login page. We'll send you an email with instructions to create a new password.",
  },
  {
    id: "2",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions.",
  },
  {
    id: "3",
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
  },
];

export default function List09({ items = ITEMS, className }: List09Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-indigo-500 to-purple-600",
        "p-0.5",
        className,
      )}
    >
      <div className="bg-white dark:bg-zinc-900 rounded-[14px] divide-y divide-zinc-100 dark:divide-zinc-800">
        {items.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-100 pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-zinc-400 transition-transform duration-200 shrink-0",
                  openId === item.id && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-out",
                openId === item.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
