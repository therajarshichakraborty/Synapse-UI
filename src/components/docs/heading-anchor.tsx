"use client";

import * as React from "react";
import { CheckIcon, LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/** Hover-revealed "#" link on headings. Click copies a deep link to the section. */
export function HeadingAnchor({ id }: { id: string }) {
  const [copied, setCopied] = React.useState(false);

  return (
    <a
      href={`#${id}`}
      aria-label="Copy link to this section"
      onClick={async (e) => {
        e.preventDefault();
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        history.replaceState(null, "", `#${id}`);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          toast.success("Link copied", { description: `#${id}` });
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard blocked: the hash still updated */
        }
      }}
      className={cn(
        "ml-2 inline-flex size-6 translate-y-[-2px] items-center justify-center rounded-md align-middle text-muted-foreground no-underline opacity-0 transition-[opacity,background-color,color] group-hover:opacity-100 hover:bg-accent hover:text-foreground focus-visible:opacity-100",
        copied && "text-success opacity-100",
      )}
    >
      {copied ? <CheckIcon className="size-3.5" /> : <LinkIcon className="size-3.5" />}
    </a>
  );
}
