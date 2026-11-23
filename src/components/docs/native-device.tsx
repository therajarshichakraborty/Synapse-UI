"use client";

import * as React from "react";
import { useTheme as useSiteTheme } from "next-themes";
import { View } from "react-native";
import { PortalHost } from "@/components/native/portal";
import { ThemeProvider, palette } from "@/components/native/theme";
import { Toaster } from "@/components/native/toast";
import { cn } from "@/lib/utils";

// The native components use the `pointerEvents` *prop* on purpose: it is the form
// that works on iOS, Android and react-native-web alike (the style form is ignored
// by react-native-web for "box-none"). Silence RNW's deprecation notice in the docs.
if (typeof window !== "undefined") {
  const w = window as Window & { __synapseWarnPatched?: boolean };
  if (!w.__synapseWarnPatched) {
    w.__synapseWarnPatched = true;
    const warn = console.warn.bind(console);
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("props.pointerEvents is deprecated"))
        return;
      warn(...args);
    };
  }
}

/**
 * iPhone-style frame for React Native examples (rendered with react-native-web).
 *
 * All chrome colors come from CSS (`dark:` variants, or a forced `.light` / `.dark`
 * class), so server and client markup always match. The RN tree itself renders
 * after mount, when the resolved scheme is known.
 */
export function NativeDevice({
  children,
  scheme = "inherit",
  height = 720,
  className,
  bare = false,
}: {
  children: React.ReactNode;
  scheme?: "inherit" | "light" | "dark";
  height?: number;
  className?: string;
  /** Fill the viewport instead of drawing the phone (used by /view). */
  bare?: boolean;
}) {
  const { resolvedTheme } = useSiteTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const resolved: "light" | "dark" =
    scheme === "inherit" ? (resolvedTheme === "dark" ? "dark" : "light") : scheme;
  const forced = scheme === "inherit" ? undefined : scheme;

  const screen = mounted ? (
    <ThemeProvider scheme={resolved}>
      <PortalHost>
        <View
          style={{
            flex: 1,
            backgroundColor: palette[resolved].background,
            paddingTop: bare ? 0 : 54,
          }}
        >
          {children}
        </View>
        <Toaster offset={bare ? 16 : 58} />
      </PortalHost>
    </ThemeProvider>
  ) : null;

  if (bare) {
    return (
      <div
        className={cn("flex min-h-svh flex-col bg-white dark:bg-[#09090b]", forced)}
        style={{ height: "100svh" }}
      >
        {screen}
      </div>
    );
  }

  return (
    <div
      className={cn("relative mx-auto w-[375px] max-w-full shrink-0", forced, className)}
      style={{ height }}
    >
      {/* Hardware buttons */}
      {[
        "top-[118px] -left-[2px] h-7",
        "top-[164px] -left-[2px] h-12",
        "top-[224px] -left-[2px] h-12",
        "top-[180px] -right-[2px] h-20",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={cn(
            "absolute w-[3px] rounded-full bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-700",
            pos,
          )}
        />
      ))}

      {/* Titanium bezel */}
      <div className="absolute inset-0 rounded-[3.4rem] bg-gradient-to-b from-zinc-200 via-zinc-100 to-zinc-300 p-[3px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.35),0_12px_24px_-12px_rgba(0,0,0,0.2)] dark:from-zinc-600 dark:via-zinc-800 dark:to-zinc-700">
        <div className="h-full w-full rounded-[3.25rem] bg-black p-[9px]">
          <div className="relative isolate flex h-full flex-col overflow-hidden rounded-[2.65rem] bg-white [transform:translateZ(0)] dark:bg-[#09090b]">
            {/* Status bar */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[54px] items-center justify-between px-8 pt-1.5 text-[15px] font-semibold text-zinc-950 dark:text-white"
            >
              <span className="w-14 tabular-nums">9:41</span>
              <span className="h-[30px] w-[104px] rounded-full bg-black" />
              <span className="flex w-14 items-center justify-end gap-1.5">
                <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
                  <rect x="0" y="7" width="3" height="4" rx="1" />
                  <rect x="4.5" y="5" width="3" height="6" rx="1" />
                  <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
                  <rect x="13.5" y="0" width="3" height="11" rx="1" />
                </svg>
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                  <rect
                    x="0.5"
                    y="0.5"
                    width="21"
                    height="11"
                    rx="3.5"
                    stroke="currentColor"
                    opacity="0.4"
                  />
                  <rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor" />
                  <rect
                    x="23"
                    y="4"
                    width="1.5"
                    height="4"
                    rx="0.75"
                    fill="currentColor"
                    opacity="0.4"
                  />
                </svg>
              </span>
            </div>

            {screen ?? (
              <div className="flex flex-1 items-center justify-center">
                <span className="size-5 animate-spin rounded-full border-2 border-zinc-300 border-t-transparent" />
              </div>
            )}

            {/* Home indicator */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2 left-1/2 z-30 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-zinc-950/80 dark:bg-white/70"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
