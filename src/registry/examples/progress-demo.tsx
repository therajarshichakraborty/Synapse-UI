"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

export default function ProgressDemo() {
  const [value, setValue] = React.useState(13);
  React.useEffect(() => {
    const id = window.setTimeout(() => setValue(66), 500);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div className="grid w-full max-w-sm gap-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Uploading assets</span>
        <span className="text-muted-foreground tabular-nums">{value}%</span>
      </div>
      <Progress value={value} aria-label="Upload progress" />
    </div>
  );
}
