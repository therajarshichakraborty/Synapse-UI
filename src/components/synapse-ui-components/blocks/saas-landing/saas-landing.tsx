"use client";

import { motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Activity, Users, Zap, BarChart2, Shield } from "lucide-react";

export default function SaasLanding() {
  return (
    <div className="w-full max-w-4xl rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main SaaS Hero Block */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content Column */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Analytics Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Analyze your data in{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
              real-time
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Synapse provides a unified dashboard to monitor performance, optimize conversion
            funnels, and trigger smart automations automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button className="h-11 px-6 rounded-xl font-semibold text-sm bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-zinc-950/10">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="h-11 px-6 rounded-xl font-semibold text-sm border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
              Schedule Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/80">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Trusted by tech teams at
            </p>
            <div className="mt-3 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 opacity-50 dark:opacity-40 font-bold text-zinc-600 dark:text-zinc-300 tracking-wider text-sm">
              <span>VORTEX</span>
              <span>NEXUS</span>
              <span>APEX</span>
              <span>SYNTH</span>
            </div>
          </div>
        </div>

        {/* Right Preview Column (Mock Dashboard UI) */}
        <div className="w-full lg:w-[420px] relative">
          {/* Main Simulated App Card */}
          <div className="w-full bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-5 shadow-xl relative">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-900">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
                dashboard.synapse.sh
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 bg-zinc-50/80 dark:bg-zinc-900/40 rounded-xl border border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center justify-between text-zinc-400 dark:text-zinc-500 mb-1">
                  <span className="text-[10px] font-semibold uppercase">Daily Visitors</span>
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">12,842</div>
                <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                  +12.4% vs yesterday
                </span>
              </div>

              <div className="p-3 bg-zinc-50/80 dark:bg-zinc-900/40 rounded-xl border border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center justify-between text-zinc-400 dark:text-zinc-500 mb-1">
                  <span className="text-[10px] font-semibold uppercase">Conversion</span>
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">3.48%</div>
                <span className="text-[9px] font-semibold text-purple-600 dark:text-purple-400">
                  +0.8% this week
                </span>
              </div>
            </div>

            {/* Simulated Live Feed / Chart Area */}
            <div className="mt-4 p-3 bg-zinc-50/80 dark:bg-zinc-900/40 rounded-xl border border-zinc-100 dark:border-zinc-900">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Real-time Queries
                </span>
                <span className="text-[9px] bg-red-500/10 text-red-600 dark:text-red-400 font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
                  Live
                </span>
              </div>

              <div className="h-20 flex items-end gap-1.5 justify-between px-2 pt-2">
                {[40, 60, 35, 70, 50, 95, 80, 60, 45, 75, 90, 85].map((val, idx) => (
                  <motion.div
                    key={idx}
                    className="w-full rounded-xs bg-linear-to-t from-indigo-500 to-purple-500"
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.05,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating Element: Toast Notification */}
          <motion.div
            className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-lg flex items-center gap-3 w-56 pointer-events-none hidden sm:flex"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-900 dark:text-zinc-50 leading-none">
                Webhook Triggered
              </p>
              <p className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1 leading-none">
                Payment received ($89.00)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
