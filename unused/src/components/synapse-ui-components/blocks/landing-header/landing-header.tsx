"use client";

import React, { useState, useEffect } from "react";
import { Blocks, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function LandingHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <div className="w-full flex flex-col">
      {/* Top Promo Bar */}
      <div className="w-full px-4 py-2 bg-zinc-50 dark:bg-gradient-to-b dark:from-[#09001a] dark:to-[#050012] border-b border-zinc-200/10 dark:border-zinc-800/20">
        <Link href="#" className="flex items-center justify-center gap-3 text-sm group">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 dark:from-blue-300 dark:via-sky-400 dark:to-indigo-300 font-medium tracking-tight">
            Explore new components & templates
          </span>

          <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-medium transition-all duration-300 group-hover:scale-105 shadow-sm">
            <span>Synapse UI Pro</span>
          </div>
        </Link>
      </div>

      {/* Main Header Container */}
      <header className="sticky top-0 z-50 w-full bg-transparent">
        <div className="flex justify-center px-3 py-2">
          <div className="w-full max-w-6xl flex items-center justify-between px-5 py-3 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-gradient-to-b dark:from-[#050012] dark:to-[#03000a] border border-zinc-200/15 dark:border-zinc-800/40 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300">
            {/* Left Section (Logo & Nav) */}
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <Blocks className="w-7 h-7 text-cyan-500 dark:text-cyan-600 transition-transform duration-500 group-hover:rotate-12" />
                <span className="font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight">
                  Synapse UI
                </span>
              </Link>

              {/* Divider */}
              <div className="hidden md:block h-5 w-px bg-zinc-300 dark:bg-zinc-700" />

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-5">
                <Link
                  href="/docs"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Docs
                </Link>

                <Link
                  href="/pricing"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Pricing
                </Link>

                <Link
                  href="#"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  Templates
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-amber-200 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                    NEW
                  </span>
                </Link>
              </nav>
            </div>

            {/* Right Section (Theme Toggle & Mobile menu toggle) */}
            <div className="flex items-center gap-4">
              {/* Theme Toggler */}
              {mounted && (
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-700 dark:text-zinc-300"
                  aria-label="Toggle Theme"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-600" />
                  )}
                </button>
              )}

              {/* Mobile Menu Toggle button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="rounded-2xl border border-zinc-200/15 dark:border-zinc-800/40 bg-white dark:bg-zinc-950 p-4 space-y-3 shadow-lg">
              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <span>Templates</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-amber-200 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                  NEW
                </span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
