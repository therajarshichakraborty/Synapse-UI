"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRightIcon,
  FileCodeIcon,
  MonitorIcon,
  MoonIcon,
  RotateCcwIcon,
  SmartphoneIcon,
  SunIcon,
  SunMoonIcon,
  TabletIcon,
} from "lucide-react";
import { Index } from "@/registry/__index__";
import { CopyButton } from "@/components/docs/copy-button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

// react-native-web is only loaded on pages that show native examples.
const NativeDevice = React.lazy(() =>
  import("@/components/docs/native-device").then((m) => ({ default: m.NativeDevice })),
);

type Scheme = "inherit" | "light" | "dark";

const viewports = [
  { id: "desktop", width: "100%", Icon: MonitorIcon, label: "Desktop" },
  { id: "tablet", width: "768px", Icon: TabletIcon, label: "Tablet" },
  { id: "mobile", width: "375px", Icon: SmartphoneIcon, label: "Mobile" },
] as const;

function ToolbarButton({
  label,
  active,
  className,
  ...props
}: React.ComponentProps<"button"> & { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground outline-none transition-[color,background-color,transform] duration-150 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-90 [&_svg]:size-4",
        active && "bg-accent text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/**
 * magicui-style example: Preview / Code tabs over one bordered canvas.
 * The toolbar (open, theme, replay, viewport) sits in the canvas corner.
 */
export function ComponentPreviewTabs({
  name,
  code,
  html,
  className,
  align,
  iframe,
  height,
  hideCode,
}: {
  name: string;
  code: string;
  html: string;
  className?: string;
  align: "center" | "start" | "end";
  iframe: boolean;
  height?: number;
  hideCode: boolean;
}) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [scheme, setScheme] = React.useState<Scheme>("inherit");
  const [replay, setReplay] = React.useState(0);
  const [viewport, setViewport] = React.useState<(typeof viewports)[number]["id"]>("desktop");
  const id = React.useId();

  const Component = Index[name];
  const native = name.startsWith("native-");
  const width = viewports.find((v) => v.id === viewport)?.width ?? "100%";

  const cycleScheme = () =>
    setScheme((s) => (s === "inherit" ? "light" : s === "light" ? "dark" : "inherit"));

  const toolbar = (
    <div className="absolute top-3 right-3 z-20 flex items-center gap-1">
      {iframe && (
        <div className="mr-1 hidden items-center gap-0.5 rounded-xl border border-border bg-background/90 p-0.5 shadow-sm backdrop-blur md:flex">
          {viewports.map((v) => (
            <ToolbarButton
              key={v.id}
              label={v.label}
              active={viewport === v.id}
              onClick={() => setViewport(v.id)}
              className="size-7 [&_svg]:size-3.5"
            >
              <v.Icon />
            </ToolbarButton>
          ))}
        </div>
      )}
      <a
        href={`/view/${name}`}
        target="_blank"
        rel="noreferrer"
        className="group/open inline-flex h-8 items-center gap-1 rounded-lg bg-foreground px-3 text-[13px] font-medium text-background shadow-sm outline-none transition-transform focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
      >
        Open
        <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover/open:translate-x-0.5 group-hover/open:-translate-y-0.5" />
      </a>
      <ToolbarButton
        label={`Preview theme: ${scheme === "inherit" ? "follow site" : scheme}`}
        active={scheme !== "inherit"}
        onClick={cycleScheme}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={scheme}
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="grid place-items-center"
          >
            {scheme === "light" ? <SunIcon /> : scheme === "dark" ? <MoonIcon /> : <SunMoonIcon />}
          </motion.span>
        </AnimatePresence>
      </ToolbarButton>
      <ToolbarButton label="Replay" onClick={() => setReplay((r) => r + 1)}>
        <motion.span
          animate={{ rotate: -360 * replay }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="grid place-items-center"
        >
          <RotateCcwIcon />
        </motion.span>
      </ToolbarButton>
    </div>
  );

  const canvas = iframe ? (
    <div className="bg-surface-1 px-0 pt-14 pb-0 md:px-4 md:pb-4">
      <div
        className="mx-auto overflow-hidden border-border bg-background shadow-sm transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:rounded-xl md:border"
        style={{ width, maxWidth: "100%" }}
      >
        <iframe
          key={`${replay}-${scheme}`}
          src={`/view/${name}${scheme !== "inherit" ? `?theme=${scheme}` : ""}`}
          title={`${name} preview`}
          loading="lazy"
          className="block w-full bg-background"
          style={{ height: height ?? 640 }}
        />
      </div>
    </div>
  ) : native ? (
    <div className="relative flex w-full justify-center overflow-hidden px-3 pt-16 pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dots opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]"
      />
      {Component ? (
        <React.Suspense
          fallback={
            <div className="flex h-[720px] items-center justify-center">
              <Spinner className="size-5 text-muted-foreground" />
            </div>
          }
        >
          <NativeDevice key={replay} scheme={scheme} height={height ?? 720} className={className}>
            <Component />
          </NativeDevice>
        </React.Suspense>
      ) : (
        <Missing name={name} />
      )}
    </div>
  ) : (
    <div
      key={replay}
      className={cn(
        "flex min-h-[450px] w-full flex-col px-6 pt-16 pb-10 sm:px-10",
        align === "center" && "items-center justify-center",
        align === "start" && "items-start justify-start",
        align === "end" && "items-end justify-end",
        className,
      )}
    >
      {Component ? (
        <React.Suspense fallback={<Spinner className="size-5 text-muted-foreground" />}>
          <Component />
        </React.Suspense>
      ) : (
        <Missing name={name} />
      )}
    </div>
  );

  return (
    <div className="not-prose my-6">
      {!hideCode && (
        <div role="tablist" aria-label="Example" className="mb-3 flex items-center gap-5">
          {(
            [
              ["preview", "Preview"],
              ["code", "Code"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              id={`${id}-${value}-tab`}
              aria-selected={tab === value}
              aria-controls={`${id}-${value}`}
              onClick={() => setTab(value)}
              className={cn(
                "relative pb-2 text-[15px] font-medium outline-none transition-colors focus-visible:text-foreground",
                tab === value ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
              {tab === value && (
                <motion.span
                  layoutId={`${id}-tab`}
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      <div
        id={`${id}-preview`}
        role="tabpanel"
        aria-labelledby={`${id}-preview-tab`}
        hidden={tab !== "preview"}
        className={cn(
          "group/preview relative isolate overflow-hidden rounded-2xl border border-border bg-background text-foreground transition-[border-color,box-shadow] duration-300 hover:border-border-strong",
          !iframe && !native && scheme === "light" && "light",
          !iframe && !native && scheme === "dark" && "dark",
        )}
      >
        {toolbar}
        {canvas}
      </div>

      {!hideCode && (
        <div
          id={`${id}-code`}
          role="tabpanel"
          aria-labelledby={`${id}-code-tab`}
          hidden={tab !== "code"}
          className="overflow-hidden rounded-2xl border border-border bg-[var(--code-bg)]"
        >
          <div className="flex h-11 items-center gap-2 border-b border-border pr-2 pl-4 text-muted-foreground">
            <FileCodeIcon className="size-3.5" aria-hidden="true" />
            <span className="font-mono text-[12.5px] text-foreground/80">{name}.tsx</span>
            <CopyButton className="ml-auto" value={code} showLabel />
          </div>
          <div
            className="code-body line-numbers max-h-[640px] overflow-auto py-3.5 font-mono text-[13px] leading-[1.7] scrollbar-thin [&_.line]:pr-12 [&_pre]:bg-transparent!"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}
    </div>
  );
}

function Missing({ name }: { name: string }) {
  return (
    <p className="text-sm text-muted-foreground">
      Example <code className="font-mono">{name}</code> not found in registry.
    </p>
  );
}
