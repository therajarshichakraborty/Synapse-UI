"use client";

import * as React from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function CollapsibleDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-1">
        <h4 className="text-sm font-semibold">@synapse starred 3 repositories</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle repositories">
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-lg border border-border px-4 py-2 font-mono text-sm">
        radix-ui/primitives
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-lg border border-border px-4 py-2 font-mono text-sm">
          motiondivision/motion
        </div>
        <div className="rounded-lg border border-border px-4 py-2 font-mono text-sm">
          tailwindlabs/tailwindcss
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
