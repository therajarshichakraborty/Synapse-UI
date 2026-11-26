"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpIcon } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/site/logo";
import { DiscordIcon, GitHubIcon, XIcon } from "@/components/site/icons";
import { siteConfig } from "@/config/site";
import {
  animatedComponents,
  blockComponents,
  coreComponents,
  entryUrl,
  nativeComponents,
  type RegistryEntry,
} from "@/registry/registry";
import { cn } from "@/lib/utils";

type FooterLink = { label: string; href: string; isNew?: boolean; strong?: boolean };

const fromRegistry = (list: RegistryEntry[], n: number): FooterLink[] =>
  list.slice(0, n).map((e) => ({ label: e.title, href: entryUrl(e), isNew: e.isNew }));

const featuredNative = [
  "native-bottom-sheet",
  "native-otp-input",
  "native-tab-bar",
  "native-chat-input",
  "native-keypad",
  "native-fab",
  "native-plan-card",
  "native-select",
  "native-swipeable-row",
  "native-toast",
  "native-carousel",
  "native-progress-ring",
  "native-segmented-control",
  "native-header",
  "native-dialog",
  "native-switch",
];

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Components",
    links: [
      ...fromRegistry(coreComponents, 17),
      { label: `All ${coreComponents.length} components`, href: "/docs/components", strong: true },
    ],
  },
  {
    title: "Animated",
    links: [
      ...fromRegistry(animatedComponents, 17),
      { label: `All ${animatedComponents.length} animated`, href: "/docs/animated", strong: true },
    ],
  },
  {
    title: "React Native",
    links: [
      ...featuredNative
        .map((n) => nativeComponents.find((e) => e.name === n))
        .filter((e): e is RegistryEntry => !!e)
        .map((e) => ({ label: e.title, href: entryUrl(e), isNew: e.isNew })),
      {
        label: `All ${nativeComponents.length} components`,
        href: "/docs/react-native",
        strong: true,
      },
    ],
  },
  {
    title: "Blocks",
    links: [
      ...fromRegistry(blockComponents, 12),
      { label: "All blocks", href: "/docs/blocks", strong: true },
    ],
  },
];

const resources: FooterLink[] = [
  { label: "Introduction", href: "/docs" },
  { label: "Installation", href: "/docs/installation" },
  { label: "Theming", href: "/docs/theming" },
  { label: "Dark Mode", href: "/docs/dark-mode" },
  { label: "CLI", href: "/docs/cli" },
  { label: "React Native setup", href: "/docs/react-native", isNew: true },
  { label: "Changelog", href: "/docs/changelog" },
  { label: "Registry (JSON)", href: "/r/index.json" },
];

const community: FooterLink[] = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "Discussions", href: `${siteConfig.links.github}/discussions` },
  { label: "Report an issue", href: `${siteConfig.links.github}/issues/new` },
  { label: "X / Twitter", href: siteConfig.links.twitter },
  { label: "Discord", href: siteConfig.links.discord },
];

const legal: FooterLink[] = [
  { label: "MIT License", href: `${siteConfig.links.github}/blob/main/LICENSE` },
  { label: "Contributing", href: `${siteConfig.links.github}#contributing` },
];

const socials = [
  { href: siteConfig.links.github, label: "GitHub", Icon: GitHubIcon },
  { href: siteConfig.links.twitter, label: "X", Icon: XIcon },
  { href: siteConfig.links.discord, label: "Discord", Icon: DiscordIcon },
];

function FooterAnchor({ link }: { link: FooterLink }) {
  const external = link.href.startsWith("http");
  const cls = cn(
    "group/link inline-flex items-center gap-2 text-[15px] leading-6 transition-colors",
    link.strong ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
  );
  const inner = (
    <>
      <span className="relative">
        {link.label}
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/link:scale-x-100" />
      </span>
      {link.isNew && (
        <span className="rounded-[5px] bg-brand/10 px-1.5 text-[11px] leading-[18px] font-medium text-brand">
          New
        </span>
      )}
      {link.strong && (
        <ArrowRightIcon className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
      )}
    </>
  );
  return external ? (
    <a href={link.href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={link.href} className={cls}>
      {inner}
    </Link>
  );
}

function Column({
  title,
  links,
  className,
}: {
  title: string;
  links: FooterLink[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
      <ul className="mt-5 grid gap-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <FooterAnchor link={l} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Giant blurred, faded wordmark. Letters come into focus around the cursor. */
function Wordmark() {
  const ref = React.useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || !ref.current) return;
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
    ref.current.style.setProperty("--r", "220px");
  };
  const onLeave = () => ref.current?.style.setProperty("--r", "0px");

  const text = (extra: string, gradient: string) => (
    <p
      className={cn(
        "text-center text-[clamp(4.5rem,19.5vw,19rem)] leading-[0.8] font-bold tracking-[-0.07em] whitespace-nowrap text-transparent select-none",
        extra,
      )}
      style={{ backgroundImage: gradient, WebkitBackgroundClip: "text", backgroundClip: "text" }}
    >
      SYNAPSE
    </p>
  );
  const faded =
    "linear-gradient(180deg, color-mix(in oklab, var(--foreground) 22%, transparent) 0%, color-mix(in oklab, var(--foreground) 6%, transparent) 55%, transparent 88%)";
  // Red → violet → pink, used for the hover state.
  const vibrant =
    "linear-gradient(90deg, #ef4444 0%, #f43f5e 18%, #8b5cf6 50%, #d946ef 75%, #ec4899 100%)";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group/wm relative -mb-[0.14em] overflow-hidden [--r:0px] [--x:50%] [--y:50%]"
    >
      {text("blur-[6px]", faded)}
      {/* Soft gradient wash over the whole word while hovered */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/wm:opacity-45 [mask-image:linear-gradient(180deg,black_20%,transparent_85%)]">
        {text("blur-[5px]", vibrant)}
      </div>
      <div
        className="pointer-events-none absolute inset-0 transition-[mask-size] duration-300"
        style={{
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y), black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y), black 30%, transparent 100%)",
        }}
      >
        {text("", vibrant)}
      </div>
    </div>
  );
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
    toast.success("You're on the list.", { description: "Expect one email a month, max." });
    setEmail("");
  }

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-16 sm:px-8 lg:px-10">
        {/* Top row: brand, newsletter, socials */}
        <div className="flex flex-col gap-8 border-b border-border pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Logo />
            <p className="mt-4 text-[15px] leading-6 text-muted-foreground">
              Beautiful, accessible components and refined motion for React, Next.js and React
              Native. Free and open source.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <form
              onSubmit={onSubmit}
              aria-label="Newsletter"
              className="flex h-11 w-full items-center gap-1 rounded-xl border border-border bg-background p-1 pl-4 transition-[border-color,box-shadow] focus-within:border-border-strong focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand)_12%,transparent)] sm:w-80"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="inline-flex h-full items-center rounded-lg bg-foreground px-3.5 text-[13px] font-medium text-background transition-transform active:scale-95"
              >
                Subscribe
              </button>
            </form>
            <div className="flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex size-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:grid-cols-3 lg:grid-cols-6">
          {columns.map((c) => (
            <Column key={c.title} title={c.title} links={c.links} />
          ))}
          <Column title="Resources" links={resources} />
          <div className="grid content-start gap-12">
            <Column title="Community" links={community} />
            <Column title="Legal" links={legal} />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-border py-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Synapse UI. Released under the MIT License.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
                <span className="relative size-2 rounded-full bg-success" />
              </span>
              All systems normal
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-medium text-foreground transition-colors hover:bg-accent"
            >
              Back to top
              <ArrowUpIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      <Wordmark />
    </footer>
  );
}
