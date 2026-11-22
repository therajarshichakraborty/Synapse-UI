"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/site/logo";
import { DiscordIcon, GitHubIcon, XIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/docs/components" },
      { label: "Animated", href: "/docs/animated" },
      { label: "Blocks", href: "/docs/blocks" },
      { label: "Collections", href: "/docs/collections/button" },
      { label: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Theming", href: "/docs/theming" },
      { label: "Dark Mode", href: "/docs/dark-mode" },
      { label: "CLI", href: "/docs/cli" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: siteConfig.links.github },
      { label: "Discussions", href: `${siteConfig.links.github}/discussions` },
      { label: "Issues", href: `${siteConfig.links.github}/issues` },
      { label: "X / Twitter", href: siteConfig.links.twitter },
      { label: "Discord", href: siteConfig.links.discord },
    ],
  },
];

const socials = [
  { href: siteConfig.links.github, label: "GitHub", Icon: GitHubIcon },
  { href: siteConfig.links.twitter, label: "X", Icon: XIcon },
  { href: siteConfig.links.discord, label: "Discord", Icon: DiscordIcon },
];

function isExternal(href: string) {
  return href.startsWith("http");
}

export function SiteFooter() {
  const [email, setEmail] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    // TODO(owner): connect to a newsletter provider.
    toast.success("You're on the list.");
    setEmail("");
  }

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="container-page max-w-6xl pt-20 pb-12">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Beautiful, accessible components and refined motion for React. Free and open source.
            </p>
            <form
              onSubmit={onSubmit}
              aria-label="Newsletter"
              className="mt-6 flex h-11 items-center gap-1 rounded-full border border-border bg-surface-1 p-1 pl-4 transition-colors focus-within:border-border-strong"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get monthly updates"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button type="submit" size="icon-sm" aria-label="Subscribe">
                <ArrowRightIcon />
              </Button>
            </form>
            <div className="mt-6 flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon-sm"
                  asChild
                  className="text-muted-foreground hover:text-foreground"
                >
                  <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon className="size-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-medium">{col.title}</h3>
                <ul className="mt-5 grid gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {isExternal(l.href) ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-3 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Synapse UI. Released under the MIT License.</p>
          <p>Built with Next.js, Tailwind CSS and Motion.</p>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none relative -mb-[0.18em] select-none">
        <p
          className="text-center text-[clamp(5rem,21vw,19rem)] leading-[0.75] font-semibold tracking-[-0.07em] text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(180deg, color-mix(in oklab, var(--foreground) 14%, transparent) 0%, transparent 78%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          synapse
        </p>
      </div>
    </footer>
  );
}
