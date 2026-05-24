"use client";

import Link from "next/link";
import { Check, HelpCircle, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";
import { useState } from "react";

const pricingPlans = [
  {
    name: "Community",
    description: "Perfect for indie hackers, students, and side projects.",
    features: [
      "150+ copy-paste components",
      "Tailwind CSS v4 + shadcn/ui",
      "MIT Licensed (Personal & Commercial)",
      "Dark mode support",
      "Community Discord support",
    ],
    ctaText: "Get Started Free",
    ctaLink: "/docs",
    popular: false,
    priceMonthly: "$0",
    priceAnnually: "$0",
  },
  {
    name: "Pro Supporter",
    description: "For creators who want to request custom components and support the project.",
    features: [
      "Everything in Community",
      "Priority request queue for new components",
      "Exclusive Pro Discord channels",
      "Premium landing page templates",
      "Lifetime updates",
      "Support open source development",
    ],
    ctaText: "Become a Supporter",
    ctaLink: "#",
    popular: true, // BEST VALUE
    priceMonthly: "$49",
    priceAnnually: "$39",
  },
  {
    name: "Enterprise",
    description: "For teams needing dedicated components, support, and Figma assets.",
    features: [
      "Everything in Pro",
      "Dedicated Figma source file access",
      "Custom component requests (unlimited)",
      "1-on-1 integration support",
      "Enterprise licensing options",
      "Private Slack channel",
    ],
    ctaText: "Contact Us",
    ctaLink: "mailto:support@synapse-ui.com",
    popular: false,
    priceMonthly: "Custom",
    priceAnnually: "Custom",
  },
];

export default function PricingClient() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("annually");
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({
    Community: false,
    "Pro Supporter": true, // expanded by default
    Enterprise: false,
  });

  const toggleExpand = (name: string) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden px-4 py-20 sm:py-28 md:py-32 bg-white dark:bg-background">
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-10">
          <FadeIn direction="up" delay={0.05}>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Pricing
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl leading-[1.1]">
              Choose your plan
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <p className="mt-4 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              Transparent pricing that scales with your team. Start free, upgrade when you need
              more.
            </p>
          </FadeIn>
        </div>

        {/* Switcher Toggle */}
        <FadeIn direction="up" delay={0.2}>
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
                  billingCycle === "monthly"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200",
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annually")}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
                  billingCycle === "annually"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200",
                )}
              >
                Annually
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Pricing Rows */}
        <FadeInStagger className="space-y-8">
          {pricingPlans.map((plan) => {
            const isExpanded = !!expandedPlans[plan.name];
            const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnually;

            return (
              <FadeInItem key={plan.name} className="flex flex-col w-full">
                <div className="w-full pb-8 border-b border-zinc-200 dark:border-zinc-900">
                  <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1.2fr] gap-6 items-center">
                    {/* Left Details */}
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                          {plan.name}
                        </h3>
                        {plan.popular && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-500 text-white dark:bg-red-950/40 dark:text-red-400 border border-transparent dark:border-red-900/30">
                            Best Value
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{plan.description}</p>
                      <button
                        onClick={() => toggleExpand(plan.name)}
                        className="flex items-center gap-1 mt-3 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            <span>Hide features</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            <span>{plan.features.length} features included</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Middle Price */}
                    <div className="flex md:justify-end items-baseline gap-1">
                      <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {price === "$0" ? "Free" : price}
                      </span>
                      {plan.name === "Pro Supporter" && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                          /mo
                        </span>
                      )}
                    </div>

                    {/* Right Button */}
                    <div className="flex justify-end">
                      <Link
                        href={plan.ctaLink}
                        className={cn(
                          "flex items-center justify-center w-full md:w-auto md:min-w-[180px] h-10 px-5 rounded-lg text-xs font-semibold transition-all duration-200",
                          plan.popular
                            ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-sm"
                            : "border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-50",
                        )}
                      >
                        {plan.ctaText}
                      </Link>
                    </div>
                  </div>

                  {/* Expanded Features Section */}
                  {isExpanded && (
                    <div className="mt-6 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl p-6 transition-all duration-300 text-left">
                      <h5 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
                        {plan.name === "Community"
                          ? "Starter features:"
                          : plan.name === "Pro Supporter"
                            ? "Everything in Community, plus:"
                            : "Everything in Pro, plus:"}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {plan.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed"
                          >
                            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FadeInItem>
            );
          })}
        </FadeInStagger>

        {/* Footer Notes */}
        <p className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
          All paid plans include priority support. No credit card required. Cancel anytime.
        </p>

        {/* FAQ Section */}
        <div className="mt-28 border-t border-zinc-250/80 dark:border-zinc-900 pt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-50 mb-10 flex items-center justify-center gap-2">
            <HelpCircle className="h-5 w-5 text-zinc-500" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                Is Synapse UI really free?
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Yes! Synapse UI is fully open-source and MIT-licensed. You can use it in both
                personal and commercial projects without attribution.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                What do supporters get?
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Supporters help fund development of the library, and get access to private Discord
                channels, prioritised requests for custom components, and premium full-page landing
                templates.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                Can I request a custom component?
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Yes! Supporters can submit custom components requests in Discord or by email, which
                will be prioritised and built for the community.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                Does it support Tailwind CSS v4?
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Yes! All components are fully styled using standard Tailwind CSS v4.0 features,
                making them clean and compatible with the latest builds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
