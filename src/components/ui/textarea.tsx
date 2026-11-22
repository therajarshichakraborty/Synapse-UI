import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 w-full rounded-2xl px-4 py-3 text-base border border-transparent bg-muted/70 transition-[color,background-color,border-color,box-shadow] outline-none placeholder:text-muted-foreground hover:bg-muted focus-visible:border-ring/40 focus-visible:bg-background focus-visible:ring-[3px] focus-visible:ring-ring/15 dark:bg-muted dark:hover:bg-accent dark:focus-visible:bg-muted disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
