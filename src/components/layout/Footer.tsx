"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Bot, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { label: "AI Inputs", href: "/docs/components/ai-input" },
        { label: "Buttons", href: "/docs/components/button" },
        { label: "Cards", href: "/docs/components/card" },
        { label: "Pricings", href: "/docs/components/pricing" },
        { label: "Blocks", href: "/docs/components/block" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "CLI Installer", href: "/docs/cli" },
        { label: "Hooks Registry", href: "/docs/hooks/use-auto-resize-textarea" },
        { label: "GitHub Code", href: "https://github.com" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Discord Server", href: "#" },
        { label: "Twitter / X", href: "#" },
        { label: "Figma Library", href: "#" },
        { label: "Creator Portfolio", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Licensing", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Brand Kit", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 pt-16 pb-8 relative overflow-hidden">
      {/* Ambient background glows for footer */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-10 lg:gap-8 pb-12 border-b border-zinc-200 dark:border-zinc-900">
          {/* Brand Info & Newsletter */}
          <div className="space-y-6 lg:pr-6">
            <div className="flex items-center gap-2 text-zinc-950 dark:text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-rose-500 to-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="tracking-tight">Synapse UI</span>
            </div>
            
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              An open-source library of highly aesthetic React & Next.js interfaces. Built using Tailwind CSS 4.0 and shadcn/ui specifications.
            </p>

            {/* Newsletter form */}
            <div className="space-y-2 max-w-xs">
              <h5 className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                Subscribe to updates
              </h5>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-9 pl-3 pr-10 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-hidden focus:border-zinc-400 dark:focus:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  required
                />
                <button
                  type="submit"
                  className={cn(
                    "absolute right-1 w-7 h-7 rounded-md flex items-center justify-center transition-all",
                    subscribed 
                      ? "bg-emerald-600 text-white" 
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  )}
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </form>
              {subscribed && (
                <p className="text-[10px] font-semibold text-emerald-500">
                  Successfully subscribed!
                </p>
              )}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom Metadata & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-500 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Synapse UI. Open-source under MIT License.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="https://github.com"
              target="_blank"
              className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-900 bg-zinc-100/50 dark:bg-zinc-900/50 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-900 bg-zinc-100/50 dark:bg-zinc-900/50 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="Twitter / X"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-900 bg-zinc-100/50 dark:bg-zinc-900/50 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="Discord"
            >
              <MessageSquare className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
