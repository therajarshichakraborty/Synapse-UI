"use client";

import Link from "next/link";
import { Check, Sparkles, HelpCircle } from "lucide-react";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { AnimatedGradient } from "@/components/motion/AnimatedGradient";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    name: "Community",
    price: "$0",
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
  },
  {
    name: "Pro Supporter",
    price: "$49",
    period: "one-time",
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
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
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
  },
];

export default function PricingClient() {
  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden px-4 py-20 sm:py-28 md:py-32">
      {/* Background Animated Gradient */}
      <AnimatedGradient className="absolute inset-0" intensity={0.5} />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-24">
          <FadeIn direction="up" delay={0.05}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-4 uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              Simple Pricing
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl leading-[1.1]">
              Simple, transparent{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-rose-400">
                pricing.
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Synapse UI is free and open-source. Choose a plan to help support our work and unlock premium templates.
            </p>
          </FadeIn>
        </div>

        {/* Pricing Cards Grid */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pricingPlans.map((plan, i) => (
            <FadeInItem key={plan.name} className="flex h-full">
              <SpotlightCard
                className={cn(
                  "relative flex flex-col justify-between w-full h-full rounded-2xl p-6 sm:p-8 transition-all duration-300 border bg-white/70 dark:bg-[#0d0020]/45 backdrop-blur-md",
                  plan.popular
                    ? "border-violet-500/40 shadow-[0_0_40px_rgba(139,92,246,0.15)] ring-1 ring-violet-500/30"
                    : "border-zinc-200 dark:border-white/[0.06] hover:border-zinc-300 dark:hover:border-white/[0.12] shadow-sm hover:shadow-md"
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md">
                    Most Popular
                  </div>
                )}

                {/* Plan Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 min-h-[32px]">
                    {plan.description}
                  </p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                        / {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="mt-8 space-y-3.5 border-t border-zinc-100 dark:border-white/[0.05] pt-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        <Check className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action Button */}
                <div className="mt-8">
                  <Link
                    href={plan.ctaLink}
                    className={cn(
                      "flex items-center justify-center w-full h-10 rounded-xl text-xs font-semibold transition-all duration-300",
                      plan.popular
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-md hover:scale-[1.02]"
                        : plan.price === "$0"
                        ? "bg-zinc-900 dark:bg-white dark:text-zinc-950 text-white hover:opacity-90 hover:scale-[1.02]"
                        : "border border-zinc-200 dark:border-white/[0.08] hover:bg-zinc-50 dark:hover:bg-white/[0.04] text-zinc-700 dark:text-zinc-200"
                    )}
                  >
                    {plan.ctaText}
                  </Link>
                </div>
              </SpotlightCard>
            </FadeInItem>
          ))}
        </FadeInStagger>

        {/* FAQ Section */}
        <div className="mt-28 border-t border-zinc-200/50 dark:border-white/[0.06] pt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-50 mb-10 flex items-center justify-center gap-2">
            <HelpCircle className="h-5 w-5 text-violet-500" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Is Synapse UI really free?</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Yes! Synapse UI is fully open-source and MIT-licensed. You can use it in both personal and commercial projects without attribution.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">What do supporters get?</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Supporters help fund development of the library, and get access to private Discord channels, prioritised requests for custom components, and premium full-page landing templates.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Can I request a custom component?</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Yes! Supporters can submit custom components requests in Discord or by email, which will be prioritised and built for the community.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Does it support Tailwind CSS v4?</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Yes! All components are fully styled using standard Tailwind CSS v4.0 features, making them clean and compatible with the latest builds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
