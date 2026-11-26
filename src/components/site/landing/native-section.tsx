"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { Index } from "@/registry/__index__";

const NativeDevice = React.lazy(() =>
  import("@/components/docs/native-device").then((m) => ({ default: m.NativeDevice })),
);

const points = [
  ["59 components", "Sheets, OTP, tab bar, charts, chat and more."],
  ["Nothing to link", "Core React Native APIs plus react-native-svg."],
  ["Springs and gestures", "Physics and haptic-style feedback built in."],
  ["Themeable", "Light and dark, with overridable tokens."],
] as const;

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
    <section className="py-20 sm:py-24 md:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-[1fr_auto] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease }}
          className="max-w-xl"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-[2px] bg-brand" />
            React Native · Expo
          </p>
          <h2 className="mt-4 text-[clamp(1.875rem,1.4rem+2vw,3rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance">
            The same craft, <span className="text-muted-foreground">in your pocket.</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-pretty text-muted-foreground sm:text-[1.0625rem]">
            Premium mobile components with the shadcn workflow you already love. Add one with the
            CLI, own the code, and ship to iOS, Android and the web.
          </p>

          <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-2">
            {points.map(([title, text]) => (
              <div key={title} className="flex gap-3">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
                <div>
                  <dt className="text-[15px] font-medium">{title}</dt>
                  <dd className="mt-1 text-sm leading-6 text-muted-foreground">{text}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map(([label, slug]) => (
              <Link
                key={slug}
                href={`/docs/react-native/${slug}`}
                className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-[12px] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </div>

          <Link
            href="/docs/react-native"
            className="group mt-10 inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-[15px] font-medium text-background transition-[transform,opacity] hover:opacity-90 active:scale-[0.98]"
          >
            Explore React Native
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto w-full max-w-[375px] lg:w-[375px]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 -z-10 bg-dots opacity-80 [--dot-size:16px] [mask-image:radial-gradient(closest-side,black,transparent)]"
          />
          {near && Showcase ? (
            <React.Suspense
              fallback={<div className="h-[720px] w-full rounded-[3.4rem] bg-muted" />}
            >
              <NativeDevice height={720}>
                <Showcase />
              </NativeDevice>
            </React.Suspense>
          ) : (
            <div className="h-[720px] w-full rounded-[3.4rem] bg-muted" />
          )}
        </motion.div>
      </div>
    </section>
  );
}
