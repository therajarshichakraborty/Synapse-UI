"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { TerminalIcon } from "lucide-react";
import { CopyButton } from "@/components/docs/copy-button";
import { cn } from "@/lib/utils";

const MANAGERS = ["bun", "pnpm", "npm", "yarn"] as const;
type Manager = (typeof MANAGERS)[number];

const STORAGE_KEY = "synapse:package-manager";
const EVENT = "synapse:package-manager-change";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): Manager {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return MANAGERS.includes(v as Manager) ? (v as Manager) : "bun";
  } catch {
    return "bun";
  }
}

export function usePackageManager() {
  const pm = React.useSyncExternalStore(subscribe, getSnapshot, () => "bun" as Manager);
  const setPm = React.useCallback((next: Manager) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [pm, setPm] as const;
}

function toCommand(pm: Manager, opts: { install?: string; dlx?: string; dev?: boolean }) {
  if (opts.install) {
    const dev = opts.dev ? (pm === "npm" ? " -D" : " -D") : "";
    const verb = pm === "npm" ? "install" : "add";
    return `${pm} ${verb}${dev} ${opts.install}`;
  }
  const runner = { bun: "bunx --bun", pnpm: "pnpm dlx", npm: "npx", yarn: "yarn dlx" }[pm];
  return `${runner} ${opts.dlx ?? ""}`.trim();
}

export function PmCommand({
  install,
  dlx,
  dev,
  className,
}: {
  /** Packages to install, e.g. "motion clsx". */
  install?: string;
  /** Command to execute with the package runner, e.g. "synapse-ui-cli@latest add button". */
  dlx?: string;
  dev?: boolean;
  className?: string;
}) {
  const [pm, setPm] = usePackageManager();
  const command = toCommand(pm, { install, dlx, dev });
  const id = React.useId();
  const [bin, ...rest] = command.split(" ");

  return (
    <div
      className={cn(
        "group/pm not-prose my-6 overflow-hidden rounded-2xl border border-border bg-[var(--code-bg)] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-[0_6px_24px_-12px_rgba(0,0,0,0.12)]",
        className,
      )}
    >
      <div
        className="flex h-11 items-center gap-0.5 border-b border-border pr-2 pl-3"
        role="tablist"
        aria-label="Package manager"
      >
        <TerminalIcon className="mr-2 size-3.5 text-muted-foreground" aria-hidden="true" />
        {MANAGERS.map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={pm === m}
            onClick={() => setPm(m)}
            className={cn(
              "relative h-7 rounded-lg px-2.5 font-mono text-[12.5px] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-95",
              pm === m ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {pm === m && (
              <motion.span
                layoutId={`${id}-pm`}
                className="absolute inset-0 rounded-lg bg-accent ring-1 ring-border"
                transition={{ type: "spring", stiffness: 500, damping: 36 }}
              />
            )}
            <span className="relative">{m}</span>
          </button>
        ))}
        <CopyButton className="ml-auto" value={command} label="Copy command" showLabel />
      </div>
      <div
        className="flex items-start overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-6 whitespace-normal [overflow-wrap:anywhere] scrollbar-thin sm:items-center sm:px-5 sm:py-4 sm:text-[13px] sm:whitespace-nowrap sm:[overflow-wrap:normal]"
        role="tabpanel"
      >
        <span className="mr-2.5 text-muted-foreground/60 select-none" aria-hidden="true">
          $
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={command}
            initial={{ opacity: 0, y: 4, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(3px)" }}
            transition={{ duration: 0.18 }}
          >
            <span className="text-brand">{bin}</span>
            <span className="text-foreground/90"> {rest.join(" ")}</span>
          </motion.span>
        </AnimatePresence>
        <span
          aria-hidden="true"
          className="ml-1 hidden h-4 w-[7px] translate-y-px animate-pulse sm:inline-block rounded-[1px] bg-foreground/25 opacity-0 group-hover/pm:opacity-100"
        />
      </div>
    </div>
  );
}
