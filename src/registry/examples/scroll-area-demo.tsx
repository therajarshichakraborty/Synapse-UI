import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const tags = Array.from({ length: 40 }).map((_, i) => `v2.${40 - i}.0`);

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-xl border border-border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Releases</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="font-mono text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
