"use client";

import * as React from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowRightIcon, CheckIcon, CopyIcon } from "lucide-react";
import { LogoMark } from "@/components/site/logo";
import { MotionLogo, NextLogo, ReactLogo, TailwindLogo } from "@/components/site/landing/logos";
import { useCopy } from "@/components/docs/copy-button";
import Image from "next/image";

const WORDS = ["feel premium", "ship faster", "earn trust", "look expensive"];

const stack = [
  { name: "React", caption: "Web & Native", Logo: ReactLogo },
  { name: "Next.js", caption: "App Router", Logo: NextLogo },
  { name: "Tailwind CSS", caption: "v4 tokens", Logo: TailwindLogo },
  { name: "Motion", caption: "Micro-interactions", Logo: MotionLogo },
];

const ease = [0.16, 1, 0.3, 1] as const;

/** The highlighted phrase: a blue "selection" sweeps in, then the next word types over it. */
function Highlight() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % WORDS.length), 3200);
    return () => window.clearInterval(t);
  }, []);

  return (
    <motion.span
      layout
      transition={{ layout: { type: "spring", stiffness: 260, damping: 30 } }}
      className="relative mx-[0.08em] inline-flex align-baseline"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[i]}
          className="relative px-[0.12em] whitespace-nowrap text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 -z-10 origin-left rounded-[0.08em] bg-brand"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, ease }}
          />
          {WORDS[i].split("").map((ch, k) => (
            <motion.span
              key={k}
              initial={{ opacity: 0, y: "0.2em", filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.25 + k * 0.025, duration: 0.35, ease }}
              className="inline-block whitespace-pre"
            >
              {ch}
            </motion.span>
          ))}
          {/* Selection handles */}
          <span
            aria-hidden="true"
            className="absolute -top-1.5 -left-px h-[calc(100%+0.4rem)] w-0.5 bg-brand"
          >
            <span className="absolute -top-1 -left-[3px] size-2 rounded-full bg-brand" />
          </span>
          <span
            aria-hidden="true"
            className="absolute -right-px -bottom-1.5 h-[calc(100%+0.4rem)] w-0.5 bg-brand"
          >
            <span className="absolute -bottom-1 -left-[3px] size-2 rounded-full bg-brand" />
          </span>
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

function InstallPill() {
  const { copied, copy } = useCopy();
  const cmd = "npx synapseui@latest init";
  return (
    <button
      type="button"
      onClick={() => copy(cmd)}
      aria-label={copied ? "Copied" : `Copy command: ${cmd}`}
      className="group mt-7 inline-flex h-9 items-center gap-2.5 rounded-full border border-border bg-background/85 pr-1.5 pl-4 font-mono text-[12.5px] text-foreground/80 shadow-sm backdrop-blur-md transition-[color,border-color,transform] hover:border-foreground/40 hover:text-foreground active:scale-[0.98]"
    >
      <span className="select-none text-brand">$</span>
      <span>{cmd}</span>
      <span className="flex size-6 items-center justify-center rounded-full transition-colors group-hover:bg-accent">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? "ok" : "copy"}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
          >
            {copied ? (
              <CheckIcon className="size-3.5 text-success" />
            ) : (
              <CopyIcon className="size-3.5" />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}

export function Hero() {
  // Soft brand glow that trails the cursor.
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, color-mix(in oklab, var(--brand) 9%, transparent), transparent 60%)`;

  return (
    <section
      className="relative isolate overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      {/* Photographic backdrop: vivid behind the nav, fading into the page under the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[680px] sm:h-[800px]"
      >
        <Image
          src="/images/beach-landscape.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 1200px) 1200px, 100vw"
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--background)_10%,transparent)_40%,color-mix(in_oklab,var(--background)_10%,transparent)_84%,var(--background)_100%)]" />
      </div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: glow }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-60 [--dot-size:22px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent_75%)]"
      />

      <div className="flex flex-col items-center px-4 pt-44 pb-16 text-center sm:px-6 sm:pt-52 md:pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Link
            href="/docs/react-native"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background py-1 pr-3 pl-1 text-[13px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] hover:border-border-strong hover:shadow-[0_6px_18px_-10px_rgba(0,0,0,0.25)]"
          >
            <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">
              New
            </span>
            59 React Native components for Expo
            <ArrowRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease, delay: 0.05 }}
          className="mt-8 max-w-[18ch] text-[clamp(2.6rem,1.4rem+5vw,5rem)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance text-foreground sm:max-w-none"
        >
          Components that
          <br className="hidden sm:block" /> <Highlight /> on first click
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="mt-7 max-w-[38rem] text-[1.0625rem] leading-[1.7] text-pretty text-foreground/75 sm:text-lg"
        >
          Synapse UI is a copy-paste component library for React, Next.js and React Native. Clear
          hierarchy, intentional motion, and accessibility that holds up in production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Link
            href="/docs/components"
            className="group relative inline-flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-brand pr-1.5 pl-5 text-[15.5px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(37,99,235,0.4),0_0_0_1px_#1d4ed8] transition-[transform,box-shadow] duration-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_14px_30px_-10px_rgba(37,99,235,0.7),0_0_0_1px_#1d4ed8] active:scale-[0.97] sm:w-auto"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <span className="relative">Browse components</span>
            <span className="relative grid size-9 place-items-center rounded-lg bg-white/15 ring-1 ring-white/30 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
              <LogoMark className="size-6 [&_path]:stroke-brand [&_rect]:fill-white" />
            </span>
          </Link>
          <Link
            href="/docs/installation"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 text-[15.5px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow,transform] duration-300 hover:border-border-strong hover:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.3)] active:scale-[0.97] sm:w-auto"
          >
            Read the docs
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <InstallPill />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
          className="mt-16 w-full sm:mt-20"
        >
          <p className="text-[14px] leading-6 font-medium text-foreground">
            Built on the stack
            <br />
            you already ship with
          </p>
          <ul className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {stack.map(({ name, caption, Logo }, i) => (
              <motion.li
                key={name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.07, duration: 0.5, ease }}
                className="group flex items-center justify-center gap-3 sm:justify-start"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] group-hover:shadow-[0_8px_18px_-10px_rgba(0,0,0,0.35)]">
                  <Logo className="h-5 w-auto max-w-6" />
                </span>
                <span className="text-left">
                  <span className="block text-[15px] leading-5 font-medium">{name}</span>
                  <span className="block text-[13px] leading-5 text-muted-foreground">
                    {caption}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
