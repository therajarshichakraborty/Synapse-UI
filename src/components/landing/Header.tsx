import { Flame } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Link as ViewTransitionLink } from "next-view-transitions";
import { AnimatedThemeToggler } from "@/lib/theme-toggler"
function Header() {
  return (
    <>
      {/* header For Mobile */}
      <div className="sticky top-0 left-0 right-0 z-50">
        <div className="bg-white dark:bg-black/5 w-full">
          {/* Rest of the Header Component */}
          <div className="flex items-center justify-center w-full flex-col">
            <div
              className={`
                          flex items-center justify-between
                          bg-linear-to-b from-white/90 via-gray-50/90 to-white/90
                          dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-zinc-900/90
                          shadow-[0_2px_20px_-2px_rgba(0,0,0,0.1)]
                          backdrop-blur-md
                          border-x border-b 
                          border-[rgba(230,230,230,0.7)] dark:border-[rgba(70,70,70,0.7)]
                          w-full sm:min-w-200 sm:max-w-300
                          rounded-b-[28px]
                          px-4 py-2.5
                          relative
                          transition-all duration-300 ease-in-out`}
            >
              <div className="relative z-10 flex items-center justify-between w-full gap-2">
                {/* Logo section and the Navigation Links */}
                <div className="gap-6 flex items-center">
                  <Link href={"/"} className="flex items-center gap-2">
                    <Flame className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                    <span className="hidden sm:block font-semibold">
                      Synapse-UI
                    </span>
                  </Link>

                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  {/* Desktop Navigation Links */}
                  <div className="hidden sm:flex items-center gap-4">
                    <ViewTransitionLink
                      href={"/docs/components/background-path"}
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                      Components
                    </ViewTransitionLink>
                    <ViewTransitionLink
                      href={"/pricing"}
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                      Pricing
                    </ViewTransitionLink>

                    <Link
                      href={"<the link of the templates>"}
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors flex items-center gap-2"
                      target="_blank"
                    >
                      Templates
                      <span className="text-green-500 dark:text-green-400 border border-green-500 dark:border-green-400 rounded-lg px-1 py-0.5 text-xs">
                        New
                      </span>
                    </Link>
                  </div>
                </div>


                {/*Right side items*/}
                <div className="hidden sm:flex items-center gap-3">
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  {/* <HeaderPro /> */}
                  <AnimatedThemeToggler />
                </div>





              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
