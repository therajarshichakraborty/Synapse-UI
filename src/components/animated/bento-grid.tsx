import * as React from "react";
import { cn } from "@/lib/utils";
import { CardSpotlight } from "@/components/animated/card-spotlight";

export function BentoGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("grid auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3", className)}
      {...props}
    />
  );
}

export type BentoCardProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  /** Visual area rendered at the top of the card. */
  header?: React.ReactNode;
  className?: string;
};

export function BentoCard({ title, description, icon, header, className }: BentoCardProps) {
  return (
    <CardSpotlight className={cn("flex flex-col justify-between gap-4 p-5", className)}>
      {header && (
        <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-xl">{header}</div>
      )}
      <div className="transition-transform duration-300 group-hover/spot:translate-x-1">
        {icon && <div className="mb-2 text-primary [&_svg]:size-5">{icon}</div>}
        <h3 className="font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
        )}
      </div>
    </CardSpotlight>
  );
}
