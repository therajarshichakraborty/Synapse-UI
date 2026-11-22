"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  ExternalLinkIcon,
  MonitorIcon,
  MoonIcon,
  RotateCcwIcon,
  SmartphoneIcon,
  SunIcon,
  TabletIcon,
} from "lucide-react";
import { Index } from "@/registry/__index__";
import { CodeFrame } from "@/components/docs/code-block";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type Tab = "preview" | "code";
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
        "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3.5",
        active && "bg-accent text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function ComponentPreviewTabs({
  name,
  code,
  html,
  className,
  align,
  iframe,
  height = 640,
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
  const [tab, setTab] = React.useState<Tab>("preview");
  const [scheme, setScheme] = React.useState<Scheme>("inherit");
  const [replay, setReplay] = React.useState(0);
  const [viewport, setViewport] = React.useState<(typeof viewports)[number]["id"]>("desktop");
  const id = React.useId();

  const Component = Index[name];
  const width = viewports.find((v) => v.id === viewport)?.width ?? "100%";

  const cycleScheme = () =>
    setScheme((s) => (s === "inherit" ? "light" : s === "light" ? "dark" : "inherit"));

  return (
    <div className="group/preview not-prose relative my-6">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div
          role="tablist"
          aria-label="Preview or code"
          className="relative flex items-center gap-1"
        >
          {(["preview", "code"] as const)
            .filter((t) => !(hideCode && t === "code"))
            .map((t) => (
              <button
                key={t}
                id={`${id}-${t}-tab`}
                type="button"
                role="tab"
                aria-selected={tab === t}
                aria-controls={`${id}-${t}`}
                onClick={() => setTab(t)}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm font-medium capitalize outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                  tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab === t && (
                  <motion.span
                    layoutId={`${id}-indicator`}
                    className="absolute inset-0 rounded-md border border-border bg-surface-2"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative">{t}</span>
              </button>
            ))}
        </div>
        {tab === "preview" && (
          <div className="flex items-center gap-0.5">
            {iframe &&
              viewports.map((v) => (
                <ToolbarButton
                  key={v.id}
                  label={v.label}
                  active={viewport === v.id}
                  onClick={() => setViewport(v.id)}
                  className="hidden md:inline-flex"
                >
                  <v.Icon />
                </ToolbarButton>
              ))}
            {iframe && <span className="mx-1 hidden h-4 w-px bg-border md:block" />}
            <ToolbarButton
              label={`Preview theme: ${scheme === "inherit" ? "site" : scheme}`}
              active={scheme !== "inherit"}
              onClick={cycleScheme}
            >
              {scheme === "light" ? (
                <SunIcon />
              ) : scheme === "dark" ? (
                <MoonIcon />
              ) : (
                <SunIcon className="opacity-60" />
              )}
            </ToolbarButton>
            <ToolbarButton label="Replay" onClick={() => setReplay((r) => r + 1)}>
              <RotateCcwIcon />
            </ToolbarButton>
            <a
              href={`/view/${name}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Open in new tab"
              title="Open in new tab"
              className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ExternalLinkIcon className="size-3.5" />
            </a>
          </div>
        )}
      </div>

      <div
        id={`${id}-preview`}
        role="tabpanel"
        aria-labelledby={`${id}-preview-tab`}
        hidden={tab !== "preview"}
      >
        {iframe ? (
          <div className="overflow-hidden rounded-xl border border-border bg-surface-1 bg-dots p-0 md:p-3">
            <div
              className="mx-auto overflow-hidden rounded-lg border border-border bg-background shadow-2xl transition-[width] duration-300 md:rounded-lg"
              style={{ width, maxWidth: "100%" }}
            >
              <iframe
                key={`${replay}-${scheme}`}
                src={`/view/${name}${scheme !== "inherit" ? `?theme=${scheme}` : ""}`}
                title={`${name} preview`}
                loading="lazy"
                className="block w-full bg-background"
                style={{ height }}
              />
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "relative isolate overflow-hidden rounded-xl border border-border",
              scheme === "light" && "light",
              scheme === "dark" && "dark",
              scheme !== "inherit" && "bg-background text-foreground",
            )}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-surface-1/50 bg-dots mask-radial-fade"
            />
            <div
              key={replay}
              className={cn(
                "flex min-h-[360px] w-full flex-col p-6 sm:p-10",
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
                <p className="text-sm text-muted-foreground">
                  Example <code className="font-mono">{name}</code> not found in registry.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {!hideCode && (
        <div
          id={`${id}-code`}
          role="tabpanel"
          aria-labelledby={`${id}-code-tab`}
          hidden={tab !== "code"}
        >
          <CodeFrame
            title={`${name}.tsx`}
            lang="tsx"
            copyValue={code}
            className="my-0"
            maxHeight={560}
          >
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </CodeFrame>
        </div>
      )}
    </div>
  );
}
