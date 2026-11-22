import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export type MovingBorderButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  /** Seconds per lap. */
  duration?: number;
  containerClassName?: string;
};

/** A pill button with a light that orbits its border. */
export function MovingBorderButton({
  className,
  containerClassName,
  duration = 4,
  asChild,
  children,
  ...props
}: MovingBorderButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <span
      className={cn("relative inline-flex overflow-hidden rounded-full p-px", containerClassName)}
      style={{ "--duration": `${duration}s` } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[-1000%] animate-[spin_var(--duration)_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--brand)_8%,var(--foreground)_14%,transparent_24%)] motion-reduce:animate-none"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-border"
        style={{ zIndex: -1 }}
      />
      <Comp
        className={cn(
          "relative inline-flex h-10 items-center justify-center gap-2 rounded-full bg-background/95 px-5 text-sm font-medium text-foreground backdrop-blur-xl outline-none transition-colors hover:bg-background/80 focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    </span>
  );
}
