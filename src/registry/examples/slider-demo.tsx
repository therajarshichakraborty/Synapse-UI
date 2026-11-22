"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";

export default function SliderDemo() {
  const [value, setValue] = React.useState([50]);
  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex justify-between text-sm">
        <span className="font-medium" id="volume-label">
          Volume
        </span>
        <span className="text-muted-foreground tabular-nums">{value[0]}%</span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
        aria-labelledby="volume-label"
      />
    </div>
  );
}
