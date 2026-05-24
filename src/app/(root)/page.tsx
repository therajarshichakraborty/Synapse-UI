"use client";

import React, { useState } from "react";
import HeroSection from "@/components/landing/Hero";
import { ShowcaseSection } from "@/components/landing/showcase";
import { InteractivePreview } from "@/components/landing/interactive-preview";
import { BuildInterfacesCard } from "@/components/landing/interfaceCards";
import Card_23 from "@/components/synapse-ui-components/cards/card-23";
import Card_24 from "@/components/synapse-ui-components/cards/card-24";
import Input_07 from "@/components/synapse-ui-components/inputs/input-07";
import Pricing_07 from "@/components/synapse-ui-components/pricings/pricing-07";
import SaasLanding from "@/components/synapse-ui-components/blocks/saas-landing/saas-landing";
import AiChat from "@/components/synapse-ui-components/blocks/ai-chat/ai-chat";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"blocks" | "components">("blocks");
  const [activeSubTab, setActiveSubTab] = useState<string>("saas");


  return (
    <div className="bg-background text-foreground overflow-x-hidden min-h-screen relative pb-24 space-y-16">

      {/* Hero Section */}
      <HeroSection />

      {/* Showcase Section */}
      {/* <ShowcaseSection /> */}

      {/* Interactive Preview Section */}
      <InteractivePreview />

      {/* Premium Offerings Live Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            <span>New Release v1.1</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Explore Premium Blocks & Components
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Highly-interactive, meticulously crafted templates and elements ready to copy-paste into your application.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-6">
          <div className="flex p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <button
              onClick={() => {
                setActiveTab("blocks");
                setActiveSubTab("saas");
              }}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "blocks"
                  ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-md"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Application Blocks
            </button>
            <button
              onClick={() => {
                setActiveTab("components");
                setActiveSubTab("holographic");
              }}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "components"
                  ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-md"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Premium Components
            </button>
          </div>
        </div>

        {/* Sub-tab Selection */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {activeTab === "blocks" ? (
            <>
              <button
                onClick={() => setActiveSubTab("saas")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  activeSubTab === "saas"
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-850 dark:text-zinc-100 border-zinc-250 dark:border-zinc-700 shadow-xs"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                SaaS Landing Hero
              </button>
              <button
                onClick={() => setActiveSubTab("aichat")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  activeSubTab === "aichat"
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-850 dark:text-zinc-100 border-zinc-250 dark:border-zinc-700 shadow-xs"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                AI Chat Mockup
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveSubTab("holographic")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  activeSubTab === "holographic"
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-850 dark:text-zinc-100 border-zinc-250 dark:border-zinc-700 shadow-xs"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                Holographic Card
              </button>
              <button
                onClick={() => setActiveSubTab("profile")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  activeSubTab === "profile"
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-850 dark:text-zinc-100 border-zinc-250 dark:border-zinc-700 shadow-xs"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                Profile Dashboard
              </button>
              <button
                onClick={() => setActiveSubTab("otp")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  activeSubTab === "otp"
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-850 dark:text-zinc-100 border-zinc-250 dark:border-zinc-700 shadow-xs"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                OTP Verification
              </button>
              <button
                onClick={() => setActiveSubTab("pricing")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  activeSubTab === "pricing"
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-850 dark:text-zinc-100 border-zinc-250 dark:border-zinc-700 shadow-xs"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                Pricing Tier
              </button>
            </>
          )}
        </div>

        {/* Display Panel */}
        <div className="w-full flex justify-center items-center min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-center items-center"
            >
              {activeSubTab === "saas" && <SaasLanding />}
              {activeSubTab === "aichat" && <AiChat />}
              {activeSubTab === "holographic" && (
                <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 max-w-md w-full">
                  <Card_23 />
                </div>
              )}
              {activeSubTab === "profile" && (
                <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 max-w-md w-full flex justify-center">
                  <Card_24 />
                </div>
              )}
              {activeSubTab === "otp" && (
                <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 max-w-md w-full flex justify-center">
                  <Input_07 />
                </div>
              )}
              {activeSubTab === "pricing" && <Pricing_07 />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom Showcase / CTA Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 gap-8 pt-8">
        <BuildInterfacesCard className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50" />
      </div>
    </div>
  );
}
