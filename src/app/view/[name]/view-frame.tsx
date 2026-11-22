"use client";

import * as React from "react";
import { Index } from "@/registry/__index__";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function ViewFrame({ name }: { name: string }) {
  const Component = Index[name];
  const [scheme, setScheme] = React.useState<"light" | "dark" | null>(null);

  React.useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("theme");
    if (t === "light" || t === "dark") setScheme(t);
  }, []);

  return (
    <div id="main" className={cn("min-h-svh bg-background text-foreground", scheme)}>
      <React.Suspense
        fallback={
          <div className="flex min-h-svh items-center justify-center">
            <Spinner className="size-5 text-muted-foreground" />
          </div>
        }
      >
        {Component ? <Component /> : null}
      </React.Suspense>
    </div>
  );
}
