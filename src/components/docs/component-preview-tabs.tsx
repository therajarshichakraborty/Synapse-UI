"use client";

import * as React from "react";
import {
  ExternalLinkIcon,
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
        "inline-flex size-7 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 [&_svg]:size-3.5",
        active && "bg-accent text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/**
 * shadcn-style example: live preview on top, source below in the same frame.
 * The code panel is collapsed by default and expands in place.
 */
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
  const [scheme, setScheme] = React.useState<Scheme>("inherit");
  const [replay, setReplay] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [viewport, setViewport] = React.useState<(typeof viewports)[number]["id"]>("desktop");
  const codeId = React.useId();

  const Component = Index[name];
  const width = viewports.find((v) => v.id === viewport)?.width ?? "100%";
  const lines = code.split("\n").length;
  const collapsible = lines > 12;

  const cycleScheme = () =>
    setScheme((s) => (s === "inherit" ? "light" : s === "light" ? "dark" : "inherit"));

  const toolbar = (
    <div
      className={cn(
        "absolute top-3 right-3 z-20 flex items-center gap-0.5 rounded-full border border-border bg-background/80 p-0.5 shadow-sm backdrop-blur transition-opacity duration-200",
        "opacity-0 group-hover/preview:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100",
      )}
    >
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
      <ToolbarButton
        label={`Preview theme: ${scheme === "inherit" ? "follow site" : scheme}`}
        active={scheme !== "inherit"}
        onClick={cycleScheme}
      >
        {scheme === "light" ? <SunIcon /> : scheme === "dark" ? <MoonIcon /> : <SunMoonIcon />}
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
        className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <ExternalLinkIcon className="size-3.5" />
      </a>
    </div>
  );

  return (
    <div className="group/preview not-prose relative my-6 overflow-hidden rounded-xl border border-border">
      {/* Preview */}
      <div
        className={cn(
          "relative isolate",
          !iframe && scheme === "light" && "light",
          !iframe && scheme === "dark" && "dark",
          "bg-background text-foreground",
        )}
      >
        {toolbar}
        {iframe ? (
          <div className="bg-surface-1 p-0 md:p-4">
            <div
              className="mx-auto overflow-hidden border-border bg-background transition-[width] duration-300 md:rounded-lg md:border"
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
            key={replay}
            className={cn(
              "flex min-h-[400px] w-full flex-col p-6 sm:p-10",
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
        )}
      </div>

      {/* Code */}
      {!hideCode && (
        <div className="relative border-t border-border bg-[var(--code-bg)]">
          <CopyButton
            value={code}
            className="absolute top-2.5 right-2.5 z-10 rounded-full bg-[var(--code-bg)]"
          />
          <div
            id={codeId}
            className={cn(
              "line-numbers overflow-auto py-4 font-mono text-[13px] leading-[1.7] scrollbar-thin [&_.line]:pr-12 [&_pre]:bg-transparent!",
              collapsible && !expanded ? "max-h-[232px] overflow-hidden" : "max-h-[640px]",
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {collapsible && (
            <div
              className={cn(
                "flex justify-center",
                expanded
                  ? "border-t border-border py-2"
                  : "absolute inset-x-0 bottom-0 h-24 items-end bg-gradient-to-t from-[var(--code-bg)] via-[var(--code-bg)]/85 to-transparent pb-4",
              )}
            >
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={codeId}
                onClick={() => setExpanded((e) => !e)}
                className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-secondary-foreground shadow-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                {expanded ? "Collapse" : "View Code"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
