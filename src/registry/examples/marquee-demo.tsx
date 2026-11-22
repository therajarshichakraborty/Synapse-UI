import { Marquee } from "@/components/animated/marquee";

const logos = ["Next.js", "React", "Tailwind", "TypeScript", "Motion", "Radix", "Vercel"];

export default function MarqueeDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4">
      <Marquee duration={30}>
        {logos.map((l) => (
          <span
            key={l}
            className="rounded-lg border border-border bg-surface-1 px-5 py-2.5 text-sm font-medium text-muted-foreground"
          >
            {l}
          </span>
        ))}
      </Marquee>
      <Marquee duration={30} reverse>
        {logos.map((l) => (
          <span
            key={l}
            className="rounded-lg border border-border bg-surface-1 px-5 py-2.5 text-sm font-medium text-muted-foreground"
          >
            {l}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
