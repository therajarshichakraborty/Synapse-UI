"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function ButtonLoading() {
  const [loading, setLoading] = React.useState(false);

  return (
    <Button
      disabled={loading}
      aria-busy={loading}
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 1600);
      }}
    >
      {loading && <Spinner data-icon="inline-start" />}
      {loading ? "Deploying..." : "Deploy"}
    </Button>
  );
}
