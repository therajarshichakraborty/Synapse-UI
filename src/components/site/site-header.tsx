"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { MenuIcon, PlusIcon } from "lucide-react";
import { LogoMark } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { SearchTrigger } from "@/components/site/command-menu";
import { GitHubIcon } from "@/components/site/icons";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const nav = [
  { title: "Home", href: "/", match: (p: string) => p === "/" },
  {
    title: "Docs",
    href: "/docs",
    match: (p: string) => p === "/docs" || /^\/docs\/(installation|theming|dark-mode|cli)/.test(p),
  },
  {
    title: "Components",
    href: "/docs/components",
    match: (p: string) => p.startsWith("/docs/components"),
  },
  {
    title: "Animated",
    href: "/docs/animated",
    match: (p: string) => p.startsWith("/docs/animated"),
  },
  { title: "Blocks", href: "/docs/blocks", match: (p: string) => p.startsWith("/docs/blocks") },
  {
    title: "React Native",
    href: "/docs/react-native",
    match: (p: string) => p.startsWith("/docs/react-native"),
  },
  {
    title: "Changelog",
    href: "/docs/changelog",
    match: (p: string) => p.startsWith("/docs/changelog"),
  },
];

function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
}

export function SiteHeader({
  mobileNav,
  stars = siteConfig.stats.stars,
}: {
  /** Kept for API compatibility; both variants now share one design. */
  variant?: "landing" | "docs";
  /** Rendered inside the mobile sheet (docs sidebar). */
  mobileNav?: React.ReactNode;
  stars?: number;
}) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="relative z-50 w-full bg-background">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-2 px-4 sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-ml-2 lg:hidden" aria-label="Open menu">
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-sm gap-0 p-0">
            <SheetHeader className="px-5 py-4">
              <SheetTitle asChild>
                <div>
                  <Logo />
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-3 pb-6 scrollbar-thin">
              <nav aria-label="Main" className="mb-6 grid gap-0.5">
                {nav.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-[15px] font-medium",
                      item.match(pathname)
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              {mobileNav}
            </div>
          </SheetContent>
        </Sheet>

        <Link
          href="/"
          aria-label="Synapse UI home"
          className="mr-3 flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <LogoMark />
          <span className="hidden text-[15px] font-semibold tracking-tight sm:inline lg:hidden xl:inline">
            Synapse UI
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden h-16 items-center lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {nav.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.title}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => setHovered(item.title)}
                className={cn(
                  "relative flex h-9 items-center rounded-lg px-3 text-[14.5px] font-medium transition-colors outline-none focus-visible:text-foreground",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {hovered === item.title && (
                  <motion.span
                    layoutId="site-header-hover"
                    className="absolute inset-0 rounded-lg bg-accent"
                    transition={{ type: "spring", stiffness: 520, damping: 40 }}
                  />
                )}
                <span className="relative">{item.title}</span>
                {active && (
                  <motion.span
                    layoutId="site-header-active"
                    className="absolute inset-x-3 -bottom-[11px] h-0.5 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <SearchTrigger className="mr-1 w-9 justify-center sm:w-48 sm:justify-start md:w-60 xl:w-72" />
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden gap-1.5 px-2.5 sm:inline-flex"
          >
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`GitHub, ${stars} stars`}
            >
              <GitHubIcon className="size-4" />
              <span className="text-xs text-muted-foreground tabular-nums">
                {formatStars(stars)}
              </span>
            </a>
          </Button>
          <ThemeToggle />
          <Button size="sm" asChild className="ml-1 hidden sm:inline-flex">
            <Link href="/docs/installation">
              <PlusIcon data-icon="inline-start" />
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
