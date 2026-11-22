"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCopy } from "@/components/docs/copy-button";

export function InstallSnippet({ command = "npx synapse-ui@latest init" }: { command?: string }) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(command)}
      aria-label={copied ? "Copied" : `Copy command: ${command}`}
      className="group inline-flex h-11 items-center gap-3 rounded-xl border border-border bg-surface-1/70 pr-2 pl-4 font-mono text-[13px] text-muted-foreground backdrop-blur transition-colors hover:border-border-strong hover:text-foreground"
    >
      <span className="text-primary select-none">$</span>
      <span className="text-foreground">{command}</span>
      <span className="ml-1 flex size-7 items-center justify-center rounded-md transition-colors group-hover:bg-accent">
        {copied ? (
          <CheckIcon className="size-3.5 text-success" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </span>
    </button>
  );
}
