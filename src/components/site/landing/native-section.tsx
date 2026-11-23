"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRightIcon, CheckIcon, SmartphoneIcon } from "lucide-react";
import { Index } from "@/registry/__index__";

const NativeDevice = React.lazy(() =>
  import("@/components/docs/native-device").then((m) => ({ default: m.NativeDevice })),
);

const points = [
  "59 components: sheets, OTP, tab bar, charts, chat and more",
  "Core React Native APIs plus react-native-svg. Nothing to link.",
  "Spring physics, gestures and haptic-style feedback built in",
  "Light and dark themes with overridable tokens",
];

const chips = [
  ["Bottom Sheet", "bottom-sheet"],
  ["OTP Input", "otp-input"],
  ["Tab Bar", "tab-bar"],
  ["Keypad", "keypad"],
  ["Chat Input", "chat-input"],
  ["Swipeable Row", "swipeable-row"],
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

export function NativeSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  // Only boot react-native-web once the phone scrolls near the viewport.
  const near = useInView(ref, { once: true, margin: "400px 0px" });
  const Showcase = Index["native-showcase"];

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-10 md:py-32">
      <div className="grid items-center gap-16 lg:grid-cols-[1fr_auto] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease }}
          className="max-w-xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            <SmartphoneIcon className="size-3.5 text-brand" />
            React Native · Expo
          </span>
          <h2 className="mt-5 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-balance">
            The same craft, <span className="text-brand">in your pocket.</span>
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-7 text-pretty text-muted-foreground">
            Premium mobile components with the shadcn workflow you already love. Add one with the
            CLI, own the code, and ship to iOS, Android and the web.
          </p>
          <ul className="mt-8 grid gap-3">
            {points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease }}
                className="flex items-start gap-3 text-[15px]"
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <CheckIcon className="size-3" strokeWidth={3} />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map(([label, slug]) => (
              <Link
                key={slug}
                href={`/docs/react-native/${slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </div>
          <Link
            href="/docs/react-native"
            className="group mt-9 inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-[15px] font-medium text-background transition-transform active:scale-[0.97]"
          >
            Explore React Native
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand)_14%,transparent),transparent)]"
          />
          {near && Showcase ? (
            <React.Suspense fallback={<div className="h-[720px] w-[375px]" />}>
              <NativeDevice height={720}>
                <Showcase />
              </NativeDevice>
            </React.Suspense>
          ) : (
            <div className="h-[720px] w-[375px] max-w-full rounded-[3.4rem] bg-muted" />
          )}
        </motion.div>
      </div>
    </section>
  );
}
