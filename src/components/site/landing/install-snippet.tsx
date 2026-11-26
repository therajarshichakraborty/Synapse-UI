"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCopy } from "@/components/docs/copy-button";

export function InstallSnippet({
  command = "npx synapse-ui-cli@latest init",
}: {
  command?: string;
}) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(command)}
      aria-label={copied ? "Copied" : `Copy command: ${command}`}
      className="group inline-flex h-9 items-center gap-2.5 rounded-full pr-1.5 pl-4 font-mono text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
    >
      <span className="select-none">$</span>
      <span>{command}</span>
      <span className="flex size-6 items-center justify-center rounded-full transition-colors group-hover:bg-accent">
        {copied ? (
          <CheckIcon className="size-3.5 text-success" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </span>
    </button>
  );
}
