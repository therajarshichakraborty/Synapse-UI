import { Marquee } from "@/components/animated/marquee";

const items = Array.from({ length: 6 }).map((_, i) => `Event #${1024 + i} processed`);

export default function MarqueeVertical() {
  return (
    <Marquee vertical duration={18} className="h-64 w-72">
      {items.map((t) => (
        <div
          key={t}
          className="rounded-lg border border-border bg-surface-1 px-4 py-3 font-mono text-xs text-muted-foreground"
        >
          <span className="mr-2 text-success">●</span>
          {t}
        </div>
      ))}
    </Marquee>
  );
}
