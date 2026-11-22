"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function useCopy(timeout = 1800) {
  const [copied, setCopied] = React.useState(false);
  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), timeout);
      } catch {
        setCopied(false);
      }
    },
    [timeout],
  );
  return { copied, copy };
}

export function CopyButton({
  value,
  getValue,
  className,
  label = "Copy code",
}: {
  value?: string;
  getValue?: () => string;
  className?: string;
  label?: string;
}) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : label}
      onClick={() => copy(value ?? getValue?.() ?? "")}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
      {copied ? (
        <CheckIcon
          className="size-3.5 text-success animate-in zoom-in-50 duration-200"
          aria-hidden="true"
        />
      ) : (
        <CopyIcon className="size-3.5" aria-hidden="true" />
      )}
    </button>
  );
}
