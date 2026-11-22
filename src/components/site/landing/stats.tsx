import { NumberTicker } from "@/components/animated/number-ticker";
import { siteConfig } from "@/config/site";

// TODO(owner): replace with real numbers (see siteConfig.stats).
const stats = [
  { label: "Components and blocks", value: siteConfig.stats.components, suffix: "+" },
  { label: "GitHub stars", value: siteConfig.stats.stars, suffix: "" },
  { label: "Monthly downloads", value: siteConfig.stats.downloads, suffix: "+" },
  { label: "Contributors", value: siteConfig.stats.contributors, suffix: "" },
];

export function Stats({ stars }: { stars?: number }) {
  return (
    <section aria-label="Project stats" className="py-12">
      <div className="container-page">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2 bg-background px-6 py-10 text-center">
              <dd className="order-1 text-[clamp(2.25rem,1.8rem+1.6vw,3rem)] leading-none font-semibold tracking-[-0.04em]">
                <NumberTicker
                  value={s.label === "GitHub stars" && stars ? stars : s.value}
                  suffix={s.suffix}
                />
              </dd>
              <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
