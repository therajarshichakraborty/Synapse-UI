"use client";

import { motion } from "motion/react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Sparkles, HelpCircle } from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface Pricing07Props {
  title?: string;
  priceMonthly?: number;
  priceAnnually?: number;
  description?: string;
  features?: PricingFeature[];
  popular?: boolean;
}

export default function Pricing_07({
  title = "Enterprise Pro",
  priceMonthly = 79,
  priceAnnually = 59,
  description = "For scaling teams and organizations requiring maximum power and dedicated support.",
  features = [
    { text: "Unlimited projects & spaces", included: true },
    { text: "Advanced workflow automation", included: true },
    { text: "Real-time collaborative canvas", included: true },
    { text: "Dedicated account executive", included: true },
    { text: "Custom API & webhooks configuration", included: true },
    { text: "99.9% Uptime SLA guarantee", included: true },
    { text: "On-premise deployment options", included: false },
  ],
  popular = true,
}: Pricing07Props) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("annually");

  const currentPrice = billingPeriod === "annually" ? priceAnnually : priceMonthly;
  const savings = (priceMonthly - priceAnnually) * 12;

  return (
    <div className="w-full max-w-sm relative">
      {/* Popular Glow Effect */}
      {popular && (
        <div className="absolute -inset-[1px] bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 dark:from-zinc-300 dark:via-zinc-600 dark:to-zinc-300 rounded-3xl blur-md opacity-75 dark:opacity-50 animate-pulse pointer-events-none" />
      )}

      {/* Main Container */}
      <div
        className={cn(
          "relative h-full w-full rounded-3xl p-6",
          "border border-zinc-200 dark:border-zinc-800",
          popular 
            ? "bg-white/95 dark:bg-zinc-950/95" 
            : "bg-white dark:bg-zinc-950",
          "shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
        )}
      >
        {/* Top Badges */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scale Plan</span>
          </div>

          {popular && (
            <span className="text-[10px] font-bold tracking-wider text-zinc-950 dark:text-zinc-50 uppercase bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800">
              Most Popular
            </span>
          )}
        </div>

        {/* Pricing Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Pricing Selector & Values */}
        <div className="mt-6 flex flex-col gap-4">
          {/* Custom Billing Switcher */}
          <div className="flex justify-center bg-zinc-100/80 dark:bg-zinc-900/60 p-1 rounded-xl w-fit">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
                billingPeriod === "monthly"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annually")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1",
                billingPeriod === "annually"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              )}
            >
              <span>Yearly</span>
              <span className="text-[9px] bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 px-1.5 py-0.5 rounded-sm">Save 25%</span>
            </button>
          </div>

          {/* Pricing Value Display */}
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              ${currentPrice}
            </span>
            <span className="text-zinc-400 dark:text-zinc-500 text-xs font-medium">
              / user / month
            </span>
          </div>

          {billingPeriod === "annually" && (
            <p className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400">
              Billed annually (${currentPrice * 12}/yr). Save ${savings} per year.
            </p>
          )}
        </div>

        {/* Action CTA Button */}
        <button
          className={cn(
            "w-full h-11 rounded-xl mt-6 flex items-center justify-center font-bold text-sm tracking-wide transition-all duration-200 active:scale-[0.98]",
            popular
              ? "bg-zinc-900 hover:bg-zinc-900/90 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 shadow-md shadow-zinc-950/10 hover:shadow-zinc-950/20"
              : "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90"
          )}
        >
          Upgrade to {title}
        </button>

        {/* Feature List */}
        <div className="mt-8 space-y-3.5">
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <span>Core capabilities</span>
            <HelpCircle className="w-3 h-3 cursor-pointer" />
          </p>
          
          <ul className="space-y-3">
            {features.map((feat, idx) => (
              <li
                key={idx}
                className={cn(
                  "flex items-start gap-2.5 text-xs",
                  feat.included 
                    ? "text-zinc-700 dark:text-zinc-300" 
                    : "text-zinc-400 dark:text-zinc-600 line-through"
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                    feat.included
                      ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                      : "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-650"
                  )}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="leading-relaxed">{feat.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
