"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";

export default function SliderRange() {
  const [range, setRange] = React.useState([20, 80]);
  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Price range</span>
        <span className="text-muted-foreground tabular-nums">
          ${range[0]} to ${range[1]}
        </span>
      </div>
      <Slider
        value={range}
        onValueChange={setRange}
        max={100}
        step={5}
        minStepsBetweenThumbs={1}
        aria-label="Price range"
      />
    </div>
  );
}
