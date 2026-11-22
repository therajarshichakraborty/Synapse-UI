import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export type ShimmerButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  /** Seconds per sweep. */
  duration?: number;
};

/** A primary button with a highlight that sweeps across it. */
export function ShimmerButton({
  className,
  asChild,
  duration = 2.4,
  style,
  ...props
}: ShimmerButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={cn(
        "relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-lg border border-white/10 px-5 text-sm font-medium text-white outline-none transition-[transform,box-shadow] duration-200 active:translate-y-px focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
        "bg-[linear-gradient(110deg,#1d4ed8_0%,#2563eb_35%,#7dd3fc_50%,#2563eb_65%,#1d4ed8_100%)] bg-[length:200%_100%] shadow-[inset_0_1px_0_0_rgb(255_255_255/0.2),0_8px_24px_-8px_var(--glow-color)] hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.25),0_12px_32px_-8px_var(--glow-color)]",
        "animate-[shimmer_var(--duration)_linear_infinite] motion-reduce:animate-none",
        className,
      )}
      style={{ "--duration": `${duration}s`, ...style } as React.CSSProperties}
      {...props}
    />
  );
}
