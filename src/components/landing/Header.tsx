import { Blocks } from "lucide-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/lib/theme-toggler";

function Header() {
  return (
    <>
      {/* Top Promo Bar */}
      <div className="w-full px-4 py-2 bg-white dark:bg-background cursor-pointer text-center">
        <Link
          href="#"
          target="_blank"
          className="flex items-center justify-center gap-3 text-xs group"
        >
          <span className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 font-medium tracking-tight transition-colors">
            Explore new components &amp; templates
          </span>
          <div className="relative inline-flex items-center gap-2 px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-[10px] font-semibold transition-all duration-300">
            <span>Synapse UI Pro</span>
          </div>
        </Link>
      </div>

      {/* Main Header */}
      <div className="sticky top-0 z-50 w-full bg-white dark:bg-background">
        <div className="flex justify-center px-4 py-3">
          <div
            className="w-full max-w-6xl
            flex items-center justify-between
            px-4 sm:px-6 py-2.5
            rounded-xl
            bg-white/50 dark:bg-zinc-950/50
            border border-zinc-200 dark:border-zinc-800
            shadow-xs
            transition-all duration-300"
          >
            {/* Left Section */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <Blocks className="w-5 h-5 text-zinc-900 dark:text-zinc-50 transition-transform duration-300 group-hover:scale-105" />
                <span className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm tracking-tight">
                  Synapse UI
                </span>
              </Link>

              {/* Divider */}
              <div className="hidden sm:block h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

              {/* Navigation */}
              <div className="flex items-center gap-4 sm:gap-5">
                <Link
                  href="/docs"
                  className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                >
                  Docs
                </Link>

                <Link
                  href="/pricing"
                  className="hidden sm:inline-block text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                >
                  Pricing
                </Link>

                <Link
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors items-center gap-1.5"
                >
                  Templates
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-700">
                    NEW
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
              <AnimatedThemeToggler className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
