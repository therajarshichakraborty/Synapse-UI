import * as React from "react";
import { cn } from "@/lib/utils";

export type GridBackgroundProps = React.ComponentProps<"div"> & {
  variant?: "grid" | "dots";
  /** Cell or dot spacing in pixels. */
  size?: number;
  /** Where the fade is centered. */
  fade?: "center" | "top" | "none";
};

/** Grid or dot pattern with a radial fade. Fills its positioned parent. */
export function GridBackground({
  variant = "grid",
  size,
  fade = "center",
  className,
  style,
  ...props
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        variant === "grid" ? "bg-grid" : "bg-dots",
        fade === "center" && "mask-radial-fade",
        fade === "top" && "mask-top-fade",
        className,
      )}
      style={
        {
          ...(size ? { [variant === "grid" ? "--grid-size" : "--dot-size"]: `${size}px` } : {}),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
