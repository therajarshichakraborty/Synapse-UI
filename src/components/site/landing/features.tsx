"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  AccessibilityIcon,
  CodeIcon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  SmartphoneIcon,
  SparklesIcon,
  SunIcon,
  TabletIcon,
  TerminalIcon,
} from "lucide-react";
import { CardSpotlight } from "@/components/animated/card-spotlight";
import { Marquee } from "@/components/animated/marquee";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Reveal, RevealItem, SectionHeading } from "@/components/site/landing/reveal";

function Tile({
  className,
  icon: Icon,
  title,
  description,
  children,
}: {
  className?: string;
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <RevealItem className={cn("min-w-0", className)}>
      <CardSpotlight className="flex h-full flex-col gap-5 p-5">
        <div className="relative flex min-h-36 flex-1 items-center justify-center overflow-hidden rounded-xl border border-border bg-background/60">
          {children}
        </div>
        <div>
          <h3 className="flex items-center gap-2 font-semibold tracking-tight">
            <Icon className="size-4 text-primary" aria-hidden="true" /> {title}
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </CardSpotlight>
    </RevealItem>
  );
}

const hues = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
];

function ThemingDemo() {
  const [hue, setHue] = React.useState(hues[0].value);
  return (
    <div
      className="flex flex-col items-center gap-4 p-4"
      style={{ "--primary": hue, "--ring": hue } as React.CSSProperties}
    >
      <div className="flex gap-2" role="radiogroup" aria-label="Primary color">
        {hues.map((h) => (
          <button
            key={h.name}
            type="button"
            role="radio"
            aria-checked={hue === h.value}
            aria-label={h.name}
            onClick={() => setHue(h.value)}
            className="size-6 rounded-full ring-offset-2 ring-offset-background transition-transform outline-none hover:scale-110 focus-visible:ring-2 aria-checked:ring-2"
            style={{ background: h.value, "--tw-ring-color": h.value } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Switch defaultChecked aria-label="Example switch" />
      </div>
      <code className="font-mono text-[11px] text-muted-foreground">--primary: {hue}</code>
    </div>
  );
}

function A11yDemo() {
  const reduce = useReducedMotion();
  const [focus, setFocus] = React.useState(0);
  React.useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setFocus((f) => (f + 1) % 3), 1100);
    return () => window.clearInterval(id);
  }, [reduce]);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2" aria-hidden="true">
        {["Cancel", "Save", "Publish"].map((l, i) => (
          <span
            key={l}
            className={cn(
              "rounded-md border border-border px-3 py-1.5 text-xs transition-shadow duration-200",
              focus === i && "ring-2 ring-ring ring-offset-2 ring-offset-background",
            )}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Kbd>Tab</Kbd> <span>to move focus</span>
      </div>
    </div>
  );
}

function OwnershipDemo() {
  return (
    <div className="w-full px-5 font-mono text-[12px] leading-6 text-muted-foreground">
      <div>components/</div>
      <div className="pl-4">ui/</div>
      <div className="pl-8 text-foreground">
        button.tsx{" "}
        <span className="ml-2 rounded bg-primary/15 px-1.5 text-[10px] text-primary">yours</span>
      </div>
      <div className="pl-8">dialog.tsx</div>
      <div className="pl-4">animated/</div>
      <div className="pl-8">spotlight.tsx</div>
    </div>
  );
}

function MotionDemo() {
  return (
    <div className="w-full">
      <Marquee duration={14} gap="0.75rem" pauseOnHover={false}>
        {["Spotlight", "Beams", "Aurora", "Meteors", "Ticker", "Dock"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs whitespace-nowrap"
          >
            {t}
          </span>
        ))}
      </Marquee>
      <Marquee duration={18} gap="0.75rem" reverse pauseOnHover={false} className="mt-2">
        {["Timeline", "Tilt", "Typewriter", "Lamp", "Sparkles", "Marquee"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs whitespace-nowrap"
          >
            {t}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function DarkModeDemo() {
  return (
    <div className="grid h-full w-full grid-cols-2">
      {(["light", "dark"] as const).map((scheme) => (
        <div
          key={scheme}
          className={cn(
            scheme,
            "flex flex-col items-center justify-center gap-3 bg-background p-4 text-foreground",
          )}
        >
          {scheme === "light" ? (
            <SunIcon className="size-4 text-warning" />
          ) : (
            <MoonIcon className="size-4 text-primary" />
          )}
          <div className="w-full max-w-[8rem] rounded-lg border border-border bg-card p-2.5 shadow-sm">
            <div className="h-1.5 w-12 rounded bg-foreground/80" />
            <div className="mt-1.5 h-1.5 w-16 rounded bg-muted-foreground/40" />
            <div className="mt-3 h-5 w-14 rounded-md bg-primary" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TypeScriptDemo() {
  return (
    <div className="w-full px-5 font-mono text-[12px]">
      <div className="text-muted-foreground">
        {"<"}
        <span className="text-primary">Button</span> variant=&quot;
        <span className="relative text-foreground">
          |
          <span className="absolute top-6 left-0 z-10 w-36 rounded-md border border-border bg-popover p-1 shadow-xl">
            {["default", "gradient", "outline", "ghost"].map((v, i) => (
              <span
                key={v}
                className={cn(
                  "block rounded px-2 py-0.5",
                  i === 1 ? "bg-primary/15 text-foreground" : "text-muted-foreground",
                )}
              >
                {v}
              </span>
            ))}
          </span>
        </span>
        &quot;
      </div>
    </div>
  );
}

function CliDemo() {
  return (
    <div className="w-full px-5 font-mono text-[12px] leading-6">
      <div>
        <span className="text-primary">❯</span> npx synapse-ui add dialog
      </div>
      <div className="text-muted-foreground">✔ Resolved button, dialog</div>
      <div className="text-success">✔ Wrote 2 files</div>
    </div>
  );
}

function ResponsiveDemo() {
  const reduce = useReducedMotion();
  const [i, setI] = React.useState(0);
  const sizes = [
    { w: "86%", Icon: MonitorIcon },
    { w: "56%", Icon: TabletIcon },
    { w: "30%", Icon: SmartphoneIcon },
  ];
  React.useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % 3), 1600);
    return () => window.clearInterval(id);
  }, [reduce]);
  const { Icon } = sizes[i];
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 p-4">
      <motion.div
        animate={{ width: sizes[i].w }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
        className="h-20 rounded-lg border border-border bg-card p-2"
      >
        <div
          className="grid h-full gap-1.5"
          style={{ gridTemplateColumns: i === 2 ? "1fr" : i === 1 ? "1fr 1fr" : "1fr 1fr 1fr" }}
        >
          {Array.from({ length: i === 2 ? 2 : i === 1 ? 4 : 3 }).map((_, k) => (
            <div key={k} className="rounded bg-primary/15" />
          ))}
        </div>
      </motion.div>
      <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Synapse"
          title="Everything a premium product needs"
          description="Production-grade primitives and motion, designed as one system. Every card below is running live."
        />
        <Reveal className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Tile
            className="lg:col-span-2"
            icon={PaletteIcon}
            title="Theme with one variable"
            description="Every color is a token. Pick a hue and watch real components follow."
          >
            <ThemingDemo />
          </Tile>
          <Tile
            icon={AccessibilityIcon}
            title="Accessible by default"
            description="Radix primitives, visible focus, full keyboard support."
          >
            <A11yDemo />
          </Tile>
          <Tile
            icon={CodeIcon}
            title="You own the code"
            description="Files land in your repo. No black boxes."
          >
            <OwnershipDemo />
          </Tile>
          <Tile
            icon={SparklesIcon}
            title="Motion that respects users"
            description="Smooth, purposeful, and off for reduced motion."
          >
            <MotionDemo />
          </Tile>
          <Tile
            icon={MoonIcon}
            title="Dark and light, both first-class"
            description="Tokens redefined per theme, and scopable per subtree."
          >
            <DarkModeDemo />
          </Tile>
          <Tile
            icon={CodeIcon}
            title="Typed end to end"
            description="Strict TypeScript and cva variants autocomplete everywhere."
          >
            <TypeScriptDemo />
          </Tile>
          <Tile
            icon={TerminalIcon}
            title="CLI that resolves deps"
            description="Add a component and everything it needs."
          >
            <CliDemo />
          </Tile>
          <Tile
            className="md:col-span-2 lg:col-span-4"
            icon={MonitorIcon}
            title="Responsive from 360px to 4K"
            description="Layouts are built mobile-first and tested at every common breakpoint."
          >
            <ResponsiveDemo />
          </Tile>
        </Reveal>
      </div>
    </section>
  );
}
