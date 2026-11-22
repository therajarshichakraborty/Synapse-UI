import { cn } from "@/lib/utils";
import { Marquee } from "@/components/animated/marquee";

export type MovingCardItem = { quote: string; name: string; title: string; avatar?: string };

export type InfiniteMovingCardsProps = {
  items: MovingCardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
};

const speeds = { fast: 25, normal: 45, slow: 80 };

/** Testimonial cards that scroll endlessly. */
export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  return (
    <Marquee
      reverse={direction === "right"}
      duration={speeds[speed]}
      pauseOnHover={pauseOnHover}
      className={cn("py-2", className)}
    >
      {items.map((item) => (
        <figure
          key={item.name + item.quote}
          className="relative w-[320px] shrink-0 rounded-2xl surface-card p-5 sm:w-[380px]"
        >
          <blockquote className="text-sm leading-6 text-foreground/90">“{item.quote}”</blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
              {item.name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)}
            </span>
            <span className="grid">
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-xs text-muted-foreground">{item.title}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </Marquee>
  );
}
