"use client";

import * as React from "react";
import { Index } from "@/registry/__index__";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const NativeDevice = React.lazy(() =>
  import("@/components/docs/native-device").then((m) => ({ default: m.NativeDevice })),
);

export function ViewFrame({ name }: { name: string }) {
  const Component = Index[name];
  const [scheme, setScheme] = React.useState<"light" | "dark" | null>(null);

  React.useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("theme");
    if (t === "light" || t === "dark") setScheme(t);
  }, []);

  const native = name.startsWith("native-");

  return (
    <div id="main" className={cn("min-h-svh bg-background text-foreground", scheme)}>
      <React.Suspense
        fallback={
          <div className="flex min-h-svh items-center justify-center">
            <Spinner className="size-5 text-muted-foreground" />
          </div>
        }
      >
        {Component ? (
          native ? (
            <NativeDevice bare scheme={scheme ?? "inherit"}>
              <Component />
            </NativeDevice>
          ) : (
            <Component />
          )
        ) : null}
      </React.Suspense>
    </div>
  );
}
