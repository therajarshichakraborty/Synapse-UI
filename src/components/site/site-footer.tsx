"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { toast } from "sonner";
import { LogoMark } from "@/components/site/logo";
import { DiscordIcon, GitHubIcon, XIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/docs/components" },
      { label: "Animated", href: "/docs/animated" },
      { label: "Blocks", href: "/docs/blocks" },
      { label: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Theming", href: "/docs/theming" },
      { label: "CLI", href: "/docs/cli" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: siteConfig.links.github },
      { label: "Discord", href: siteConfig.links.discord },
      { label: "X / Twitter", href: siteConfig.links.twitter },
      { label: "Contributing", href: `${siteConfig.links.github}/blob/main/CONTRIBUTING.md` },
    ],
  },
];

export function SiteFooter() {
  const [email, setEmail] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    // TODO(owner): connect to a newsletter provider.
    toast.success("You're on the list. We'll be in touch.");
    setEmail("");
  }

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="container-page pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <LogoMark />
              <span className="font-semibold tracking-tight">Synapse UI</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Beautiful, accessible components and cinematic sections for React. Free and open
              source.
            </p>
            <form onSubmit={onSubmit} className="mt-6 flex gap-2" aria-label="Newsletter">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <Input
                id="footer-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9"
              />
              <Button type="submit" size="default" className="h-9 shrink-0">
                Subscribe
                <ArrowRightIcon />
              </Button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground">Monthly updates. No spam.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-medium text-foreground">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Synapse UI. Released under the MIT License.
          </p>
          <div className="flex items-center gap-1">
            {[
              { href: siteConfig.links.github, label: "GitHub", Icon: GitHubIcon },
              { href: siteConfig.links.twitter, label: "X", Icon: XIcon },
              { href: siteConfig.links.discord, label: "Discord", Icon: DiscordIcon },
            ].map(({ href, label, Icon }) => (
              <Button key={label} variant="ghost" size="icon" asChild>
                <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon className="size-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none text-center text-[clamp(4rem,17vw,15rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent"
        style={{
          backgroundImage: "linear-gradient(180deg, var(--border-strong), transparent 85%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        synapse
      </div>
    </footer>
  );
}
