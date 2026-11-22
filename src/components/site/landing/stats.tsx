import { NumberTicker } from "@/components/animated/number-ticker";
import { siteConfig } from "@/config/site";

// TODO(owner): replace with real numbers (see siteConfig.stats).
const stats = [
  { label: "Components and blocks", value: siteConfig.stats.components, suffix: "+" },
  { label: "GitHub stars", value: siteConfig.stats.stars, suffix: "" },
  { label: "Monthly downloads", value: siteConfig.stats.downloads, suffix: "+" },
  { label: "Contributors", value: siteConfig.stats.contributors, suffix: "" },
];

export function Stats() {
  return (
    <section aria-label="Project stats" className="py-16">
      <div className="container-page">
        <dl className="grid grid-cols-2 divide-border overflow-hidden rounded-3xl border border-border bg-surface-1/50 lg:grid-cols-4 lg:divide-x">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={
                "px-6 py-10 text-center " +
                (i < 2 ? "border-b border-border lg:border-b-0" : "") +
                (i % 2 === 0 ? " border-r border-border lg:border-r-0" : "")
              }
            >
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="mt-2 text-4xl font-semibold tracking-tight text-gradient-subtle md:text-5xl">
                <NumberTicker value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
