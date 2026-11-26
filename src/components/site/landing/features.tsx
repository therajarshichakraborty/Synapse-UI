"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  AccessibilityIcon,
  BracesIcon,
  CodeIcon,
  FileCodeIcon,
  FolderIcon,
  MoonIcon,
  MousePointerClickIcon,
  PaletteIcon,
  SunIcon,
  TerminalIcon,
  WavesIcon,
} from "lucide-react";
import { Marquee } from "@/components/animated/marquee";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/site/landing/reveal";

/** One cell of the bordered grid: live, interactive demo on top, copy underneath. */
function Cell({
  className,
  icon: Icon,
  title,
  description,
  hint,
  children,
}: {
  className?: string;
  icon: React.ElementType;
  title: string;
  description: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col bg-background p-6 transition-colors duration-300 hover:bg-surface-1 sm:p-8",
        className,
      )}
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-1 transition-[background-color,border-color,box-shadow] duration-300 group-hover:border-border-strong group-hover:bg-background group-hover:shadow-[0_12px_32px_-20px_rgba(0,0,0,0.35)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dots opacity-70 [--dot-size:14px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        />
        <div className="relative flex size-full items-center justify-center">{children}</div>
        <span className="pointer-events-none absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-md border border-border bg-background/90 px-1.5 py-0.5 text-[10.5px] font-medium text-muted-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          <MousePointerClickIcon className="size-3" /> {hint}
        </span>
      </div>
      <div className="mt-6">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <Icon className="size-4 text-brand" aria-hidden="true" />
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

/* ── Theme: pick a hue and a radius, components follow ─────────────── */
const hues = [
  { name: "Blue", value: "#2563eb" },
  { name: "Ink", value: "#171717" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Emerald", value: "#059669" },
  { name: "Amber", value: "#d97706" },
];
const radii = [
  { label: "Sharp", value: "0.25rem" },
  { label: "Soft", value: "0.625rem" },
  { label: "Round", value: "999px" },
];

function ThemingDemo() {
  const [hue, setHue] = React.useState(hues[0].value);
  const [radius, setRadius] = React.useState(radii[1].value);
  const [on, setOn] = React.useState(true);
  return (
    <div
      className="flex flex-col items-center gap-4 p-4"
      style={
        {
          "--primary": hue,
          "--primary-foreground": "#fff",
          "--ring": hue,
          "--radius": radius,
        } as React.CSSProperties
      }
    >
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5" role="radiogroup" aria-label="Primary color">
          {hues.map((h) => (
            <button
              key={h.name}
              type="button"
              role="radio"
              aria-checked={hue === h.value}
              aria-label={h.name}
              onClick={() => setHue(h.value)}
              className="size-5 rounded-full ring-offset-2 ring-offset-background transition-transform outline-none hover:scale-110 focus-visible:ring-2 active:scale-95 aria-checked:ring-2"
              style={{ background: h.value, "--tw-ring-color": h.value } as React.CSSProperties}
            />
          ))}
        </div>
        <div
          className="flex rounded-md border border-border bg-background p-0.5"
          role="radiogroup"
          aria-label="Corner radius"
        >
          {radii.map((r) => (
            <button
              key={r.label}
              type="button"
              role="radio"
              aria-checked={radius === r.value}
              onClick={() => setRadius(r.value)}
              className="rounded px-2 py-0.5 text-[11px] text-muted-foreground transition-colors aria-checked:bg-accent aria-checked:text-foreground"
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm" className="rounded-[var(--radius)] transition-all">
          Primary
        </Button>
        <Button size="sm" variant="outline" className="rounded-[var(--radius)] transition-all">
          Outline
        </Button>
        <Switch checked={on} onCheckedChange={setOn} aria-label="Example switch" />
      </div>
      <code className="font-mono text-[11px] text-muted-foreground">
        --primary: {hue}; --radius: {radius}
      </code>
    </div>
  );
}

/* ── Accessibility: real, focusable buttons ────────────────────────── */
function A11yDemo() {
  const reduce = useReducedMotion();
  const [focus, setFocus] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [pressed, setPressed] = React.useState<string | null>(null);
  const labels = ["Cancel", "Save", "Publish"];
  React.useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setFocus((f) => (f + 1) % 3), 1100);
    return () => window.clearInterval(id);
  }, [reduce, paused]);
  return (
    <div
      className="flex flex-col items-center gap-4"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex gap-2">
        {labels.map((l, i) => (
          <button
            key={l}
            type="button"
            onFocus={() => setFocus(i)}
            onMouseEnter={() => setFocus(i)}
            onClick={() => setPressed(l)}
            className={cn(
              "rounded-md border border-border bg-background px-3 py-1.5 text-xs transition-[box-shadow,transform] duration-200 outline-none active:scale-95",
              focus === i && "ring-2 ring-brand ring-offset-2 ring-offset-background",
            )}
          >
            {l}
          </button>
        ))}
      </div>
      <div
        className="flex h-5 items-center gap-1.5 text-xs text-muted-foreground"
        aria-live="polite"
      >
        {pressed ? (
          <span>
            Activated <span className="font-medium text-foreground">{pressed}</span>
          </span>
        ) : (
          <>
            <Kbd>Tab</Kbd> or click to move focus
          </>
        )}
      </div>
    </div>
  );
}

/* ── Ownership: clickable file tree with a peek ────────────────────── */
const files = {
  "button.tsx": "export function Button({ variant }) {",
  "dialog.tsx": "export function Dialog({ open }) {",
  "marquee.tsx": "export function Marquee({ speed }) {",
} as const;
type FileName = keyof typeof files;

function OwnershipDemo() {
  const [active, setActive] = React.useState<FileName>("button.tsx");
  const row = (name: FileName, indent: string) => (
    <button
      type="button"
      onClick={() => setActive(name)}
      className={cn(
        "flex w-full items-center gap-1.5 rounded px-1.5 text-left transition-colors",
        indent,
        active === name ? "bg-brand/10 text-foreground" : "hover:bg-accent hover:text-foreground",
      )}
    >
      <FileCodeIcon className={cn("size-3", active === name && "text-brand")} />
      {name}
      {active === name && (
        <span className="ml-auto rounded border border-brand/30 px-1 text-[9.5px] text-brand">
          yours
        </span>
      )}
    </button>
  );
  return (
    <div className="w-full px-5 font-mono text-[11.5px] leading-6 text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <FolderIcon className="size-3" /> components/synapse-ui
      </div>
      {row("button.tsx", "pl-4")}
      {row("dialog.tsx", "pl-4")}
      {row("marquee.tsx", "pl-4")}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="mt-2 truncate rounded-md border border-border bg-background px-2 py-1 text-[11px]"
        >
          <span className="text-brand">{files[active].split(" ")[0]}</span>{" "}
          {files[active].split(" ").slice(1).join(" ")}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Motion: hover pauses, switch turns motion off ─────────────────── */
function MotionDemo() {
  const [enabled, setEnabled] = React.useState(true);
  const chip =
    "rounded-md border border-border bg-background px-2.5 py-1 text-xs whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5";
  const still = !enabled && "[&_*]:[animation-play-state:paused]";
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className={cn("w-full", still)}>
        <Marquee duration={16} gap="0.5rem">
          {["Spotlight", "Beams", "Aurora", "Meteors", "Ticker", "Dock"].map((t) => (
            <span key={t} className={chip}>
              {t}
            </span>
          ))}
        </Marquee>
        <Marquee duration={20} gap="0.5rem" reverse className="mt-2">
          {["Timeline", "Tilt", "Typewriter", "Lamp", "Marquee", "Flip words"].map((t) => (
            <span key={t} className={chip}>
              {t}
            </span>
          ))}
        </Marquee>
      </div>
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Motion" />
        Motion {enabled ? "on" : "off"}
      </label>
    </div>
  );
}

/* ── Light / dark: drag to compare ─────────────────────────────────── */
function DarkModeDemo() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [split, setSplit] = React.useState(50);
  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setSplit(Math.min(92, Math.max(8, ((clientX - r.left) / r.width) * 100)));
  };
  const panel = (scheme: "light" | "dark") => (
    <div
      className={cn(
        scheme,
        "absolute inset-0 flex items-center justify-center bg-background text-foreground",
      )}
    >
      <div className="w-36 rounded-lg border border-border bg-card p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-12 rounded bg-foreground/80" />
          {scheme === "light" ? (
            <SunIcon className="size-3 text-muted-foreground" />
          ) : (
            <MoonIcon className="size-3 text-muted-foreground" />
          )}
        </div>
        <div className="mt-1.5 h-1.5 w-16 rounded bg-muted-foreground/40" />
        <div className="mt-3 h-5 w-14 rounded-md bg-brand" />
      </div>
    </div>
  );
  return (
    <div
      ref={ref}
      className="relative size-full cursor-ew-resize touch-none select-none"
      onPointerMove={(e) => move(e.clientX)}
      onPointerDown={(e) => move(e.clientX)}
      role="slider"
      aria-label="Compare light and dark"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(split)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setSplit((s) => Math.max(8, s - 6));
        if (e.key === "ArrowRight") setSplit((s) => Math.min(92, s + 6));
      }}
    >
      {panel("light")}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
        {panel("dark")}
      </div>
      <div
        className="absolute inset-y-0 w-px bg-brand"
        style={{ left: `${split}%` }}
        aria-hidden="true"
      >
        <span className="absolute top-1/2 left-1/2 grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-background text-[10px] text-muted-foreground shadow-md">
          ⇆
        </span>
      </div>
    </div>
  );
}

/* ── Types: pick a variant, see it render ──────────────────────────── */
const variants = ["default", "outline", "secondary", "ghost"] as const;

function TypeScriptDemo() {
  const [v, setV] = React.useState<(typeof variants)[number]>("default");
  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-3 px-5 font-mono text-[11.5px]">
      <div>
        <p className="truncate text-muted-foreground">
          {"<"}
          <span className="text-brand">Button</span> variant=&quot;
          <span className="text-foreground">{v}</span>&quot;{" />"}
        </p>
        <div className="mt-2 w-32 rounded-md border border-border bg-popover p-1 shadow-lg">
          {variants.map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => setV(x)}
              onMouseEnter={() => setV(x)}
              className={cn(
                "block w-full rounded px-2 py-0.5 text-left transition-colors",
                v === x ? "bg-accent text-foreground" : "text-muted-foreground",
              )}
            >
              {x}
            </button>
          ))}
        </div>
      </div>
      <Button size="sm" variant={v} className="font-sans">
        Deploy
      </Button>
    </div>
  );
}

/* ── CLI: choose a component, watch it install ─────────────────────── */
const deps: Record<string, string> = {
  dialog: "button, dialog",
  sheet: "button, sheet",
  table: "table, checkbox",
};

function CliDemo() {
  const [name, setName] = React.useState("dialog");
  const [run, setRun] = React.useState(0);
  const cmd = `synapseui add ${name}`;
  return (
    <div className="flex w-full flex-col gap-3 px-3 sm:px-4">
      <div className="flex gap-1.5">
        {Object.keys(deps).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              setName(k);
              setRun((r) => r + 1);
            }}
            className={cn(
              "rounded-md border px-2 py-0.5 font-mono text-[11px] whitespace-nowrap transition-colors",
              name === k
                ? "border-brand/40 bg-brand/10 text-brand"
                : "border-border bg-background text-muted-foreground hover:text-foreground",
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <div
        key={`${name}-${run}`}
        className="rounded-lg border border-border bg-background p-2.5 font-mono text-[11px] leading-6 whitespace-nowrap"
      >
        <div className="overflow-hidden">
          <span className="text-brand">$ </span>
          {cmd.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.018 }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: cmd.length * 0.018 + 0.15 }}
          className="text-muted-foreground"
        >
          ✓ Resolved {deps[name]}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: cmd.length * 0.018 + 0.45 }}
          className="text-foreground"
        >
          ✓ Wrote {deps[name].split(", ").length} files
        </motion.div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Synapse"
          title={
            <>
              Everything a premium product needs.{" "}
              <span className="text-muted-foreground">Nothing it doesn&apos;t.</span>
            </>
          }
          description="Production-grade primitives and motion, designed as one system. Every card below is live. Go ahead, play with them."
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-border sm:mt-16">
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            <Cell
              className="md:col-span-2"
              icon={PaletteIcon}
              title="Theme with one variable"
              description="Every color and radius is a token. Change them and real components follow."
              hint="Pick a color"
            >
              <ThemingDemo />
            </Cell>
            <Cell
              icon={AccessibilityIcon}
              title="Accessible by default"
              description="Radix primitives, visible focus, full keyboard support."
              hint="Tab or click"
            >
              <A11yDemo />
            </Cell>
            <Cell
              icon={CodeIcon}
              title="You own the code"
              description="Files land in your repo. No black boxes."
              hint="Open a file"
            >
              <OwnershipDemo />
            </Cell>
            <Cell
              icon={WavesIcon}
              title="Motion that respects users"
              description="Hover to pause. Switch it off, like reduced motion does."
              hint="Toggle motion"
            >
              <MotionDemo />
            </Cell>
            <Cell
              icon={MoonIcon}
              title="Light and dark, both first-class"
              description="Tokens redefined per theme, scopable per subtree."
              hint="Drag to compare"
            >
              <DarkModeDemo />
            </Cell>
            <Cell
              icon={BracesIcon}
              title="Typed end to end"
              description="Strict TypeScript and cva variants autocomplete everywhere."
              hint="Pick a variant"
            >
              <TypeScriptDemo />
            </Cell>
            <Cell
              icon={TerminalIcon}
              title="CLI that resolves deps"
              description="Add a component and everything it needs."
              hint="Run a command"
            >
              <CliDemo />
            </Cell>
          </div>
        </div>
      </div>
    </section>
  );
}
