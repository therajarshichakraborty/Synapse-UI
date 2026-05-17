import { Blocks } from "lucide-react";
import Link from "next/link";
import { Link as ViewTransitionLink } from "next-view-transitions";
import { AnimatedThemeToggler } from "@/lib/theme-toggler";

function Header() {
  return (
    <>
      {/* Top Promo Bar */}
      <div className="w-full px-4 py-2 bg-white dark:bg-[#0e1111] cursor-pointer">
        <Link
          href="#"
          target="_blank"
          className="flex items-center justify-center gap-3 text-sm group"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 font-medium tracking-tight">
            Explore new components & templates
          </span>

          <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-medium transition-all duration-300 group-hover:scale-105 shadow-sm">
            <span>Synapse UI Pro</span>
          </div>
        </Link>
      </div>

      {/* Main Header */}
      <div className="sticky top-0 z-50 w-full bg-transparent ">
        <div className="flex justify-center px-3 py-2">
          <div
            className="
            w-full max-w-6xl
            flex items-center justify-between
            px-5 py-3
            rounded-2xl
            backdrop-blur-md
            bg-white/30 dark:bg-[#0e1111]/30
            border border-white/20 dark:border-white/10
            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
            transition-all duration-300"
          >
            {/* Left Section */}
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <Blocks className="w-7 h-7 text-fuchsia-500 dark:text-fuchsia-600 transition-transform duration-500 group-hover:scale-100" />
                <span className="hidden sm:block font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight">
                  Synapse UI
                </span>
              </Link>

              {/* Divider */}
              <div className="hidden sm:block h-5 w-px bg-zinc-300 dark:bg-zinc-700 " />

              {/* Navigation */}
              <div className="hidden sm:flex items-center gap-5 ">
                <ViewTransitionLink
                  href={"/docs/components/background-path"}
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-violet-400 transition-colors"
                >
                  Components
                </ViewTransitionLink>

                <ViewTransitionLink
                  href={"/pricing"}
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-violet-400 transition-colors"
                >
                  Pricing
                </ViewTransitionLink>

                <Link
                  href={"<the link of the templates>"}
                  target="_blank"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-violet-400 transition-colors flex items-center gap-2"
                >
                  Templates
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-amber-200 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                    NEW
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block h-5 w-px bg-zinc-300 dark:bg-zinc-700" />
              <AnimatedThemeToggler />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
