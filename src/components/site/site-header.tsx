"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, StarIcon } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { SearchTrigger } from "@/components/site/command-menu";
import { GitHubIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
}

export function SiteHeader({
  variant = "landing",
  mobileNav,
}: {
  variant?: "landing" | "docs";
  /** Optional slot rendered inside the mobile sheet (docs sidebar). */
  mobileNav?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  const solid = variant === "docs" || scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-border bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
          : "border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-14 items-center gap-4 px-4 sm:px-6",
          variant === "landing" ? "max-w-7xl lg:px-8" : "max-w-[1600px]",
        )}
      >
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-ml-2 md:hidden" aria-label="Open menu">
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-sm gap-0 p-0">
            <SheetHeader className="border-b border-border px-5 py-4">
              <SheetTitle asChild>
                <div>
                  <Logo />
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
              <nav aria-label="Main" className="mb-4 grid gap-0.5">
                {mainNav.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              {mobileNav}
            </div>
          </SheetContent>
        </Sheet>

        <Logo className="mr-2" />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => {
            const active =
              item.href === "/docs"
                ? pathname === "/docs"
                : pathname?.startsWith(item.href) && item.title !== "Templates";
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <SearchTrigger className="w-9 justify-center sm:w-auto sm:justify-start lg:w-56" />
          <Button variant="ghost" size="sm" asChild className="hidden gap-1.5 px-2 sm:inline-flex">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Star Synapse UI on GitHub"
            >
              <GitHubIcon className="size-4" />
              <span className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground">
                <StarIcon className="size-3" aria-hidden="true" />
                {formatStars(siteConfig.stats.stars)}
              </span>
            </a>
          </Button>
          <ThemeToggle />
          {variant === "landing" && (
            <Button size="sm" asChild className="ml-1 hidden sm:inline-flex">
              <Link href="/docs/installation">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
