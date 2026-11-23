"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRightIcon, MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { LogoMark } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { useCommandMenu } from "@/components/site/command-menu";
import { GitHubIcon } from "@/components/site/icons";
import { siteConfig } from "@/config/site";

const links = [
  { title: "Components", href: "/docs/components" },
  { title: "Animated", href: "/docs/animated" },
  { title: "Blocks", href: "/docs/blocks" },
  { title: "React Native", href: "/docs/react-native", badge: "New" },
];

/** Dotted vertical divider, as in the design. */
function DotDivider() {
  return (
    <span
      aria-hidden="true"
      className="mx-1 hidden h-9 w-px self-center bg-[radial-gradient(circle,var(--border-strong)_1px,transparent_1.2px)] bg-[length:1px_5px] md:block"
    />
  );
}

function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
}

export function LandingNav({ stars = siteConfig.stats.stars }: { stars?: number }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const { open: openSearch } = useCommandMenu();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        aria-label="Main"
        animate={{
          maxWidth: scrolled ? 920 : 1040,
          boxShadow: scrolled
            ? "0 16px 40px -20px rgba(0,0,0,0.25), 0 0 0 1px var(--border)"
            : "0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px var(--border)",
        }}
        initial={false}
        style={{ maxWidth: 1040 }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="mx-auto flex h-[60px] items-center rounded-2xl bg-background/85 pr-2 pl-4 backdrop-blur-xl backdrop-saturate-150"
      >
        <Link
          href="/"
          aria-label="Synapse UI home"
          className="group flex items-center gap-2 rounded-lg pr-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <LogoMark className="size-7 transition-transform duration-500 group-hover:rotate-[360deg]" />
          <span className="text-[17px] font-semibold tracking-[-0.02em]">Synapse</span>
        </Link>
        <DotDivider />

        <ul className="mx-auto hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
          {links.map((l, i) => (
            <li key={l.href} className="flex items-center">
              {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-brand" />}
              <Link
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                onFocus={() => setHovered(l.href)}
                className="relative flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-[14.5px] font-medium text-foreground/80 outline-none transition-colors hover:text-foreground"
              >
                {hovered === l.href && (
                  <motion.span
                    layoutId="landing-nav-hover"
                    className="absolute inset-0 rounded-lg bg-accent"
                    transition={{ type: "spring", stiffness: 520, damping: 40 }}
                  />
                )}
                <span className="relative">{l.title}</span>
                {l.badge && (
                  <span className="relative rounded-[5px] border border-dashed border-brand/60 px-1 text-[10px] leading-4 font-medium text-brand">
                    {l.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-0.5 md:ml-0">
          <DotDivider />
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search (⌘K)"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground outline-none transition-[color,background-color,transform] hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-90"
          >
            <SearchIcon className="size-4" />
          </button>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`GitHub, ${stars} stars`}
            className="hidden h-9 items-center gap-1.5 rounded-lg px-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
          >
            <GitHubIcon className="size-4" />
            <span className="text-xs tabular-nums">{formatStars(stars)}</span>
          </a>
          <ThemeToggle className="size-9 rounded-lg" />
          <Link
            href="/docs/installation"
            className="group relative ml-1 hidden h-10 items-center gap-1.5 overflow-hidden rounded-xl bg-brand px-4 text-[14.5px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(37,99,235,0.4),0_0_0_1px_#1d4ed8] transition-[transform,box-shadow] outline-none hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_20px_-6px_rgba(37,99,235,0.6),0_0_0_1px_#1d4ed8] focus-visible:ring-2 focus-visible:ring-brand/50 active:scale-[0.97] sm:inline-flex"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <span className="relative">Get started</span>
            <ArrowUpRightIcon className="relative size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex size-9 items-center justify-center rounded-lg hover:bg-accent md:hidden"
          >
            {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="mx-auto mt-2 max-w-[1040px] rounded-2xl border border-border bg-background p-2 shadow-xl md:hidden"
          >
            {[...links, { title: "Docs", href: "/docs" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex h-11 items-center rounded-xl px-3 text-[15px] font-medium hover:bg-accent"
              >
                {l.title}
              </Link>
            ))}
            <Link
              href="/docs/installation"
              onClick={() => setOpen(false)}
              className="mt-1 flex h-11 items-center justify-center rounded-xl bg-brand text-[15px] font-medium text-white"
            >
              Get started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
