"use client";

import * as React from "react";
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
  /** Command to execute with the package runner, e.g. "synapse-ui@latest add button". */
  dlx?: string;
  dev?: boolean;
  className?: string;
}) {
  const [pm, setPm] = usePackageManager();
  const command = toCommand(pm, { install, dlx, dev });

  return (
    <div
      className={cn(
        "my-5 overflow-hidden rounded-xl border border-border bg-[var(--code-bg)] shadow-[inset_0_1px_0_0_var(--highlight)]",
        className,
      )}
    >
      <div
        className="flex h-10 items-center gap-1 border-b border-border pr-2 pl-3"
        role="tablist"
        aria-label="Package manager"
      >
        <TerminalIcon className="mr-1.5 size-3.5 text-muted-foreground" aria-hidden="true" />
        {MANAGERS.map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={pm === m}
            onClick={() => setPm(m)}
            className={cn(
              "relative h-10 px-2 font-mono text-xs transition-colors outline-none focus-visible:text-foreground",
              pm === m
                ? "text-foreground after:absolute after:inset-x-1 after:-bottom-px after:h-px after:bg-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {m}
          </button>
        ))}
        <CopyButton className="ml-auto" value={command} label="Copy command" />
      </div>
      <div
        className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-6 scrollbar-thin"
        role="tabpanel"
      >
        <span className="select-none text-muted-foreground">$ </span>
        <span className="text-foreground">{command}</span>
      </div>
    </div>
  );
}
