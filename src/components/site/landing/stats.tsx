import { NumberTicker } from "@/components/animated/number-ticker";
import { siteConfig } from "@/config/site";
import { nativeComponents } from "@/registry/registry";

// TODO(owner): replace downloads with a real number (see siteConfig.stats).
const stats = [
  { label: "Components and blocks", value: siteConfig.stats.components, suffix: "+" },
  { label: "React Native components", value: nativeComponents.length, suffix: "" },
  { label: "Monthly downloads", value: siteConfig.stats.downloads, suffix: "+" },
  { label: "Free and open source", value: 100, suffix: "%" },
];

export function Stats() {
  return (
    <section aria-label="Project stats" className="py-14 sm:py-16">
      <div className="container-page">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 bg-background px-5 py-8 sm:px-8 sm:py-10"
            >
              <dd className="order-1 text-[clamp(1.875rem,1.5rem+1.4vw,2.75rem)] leading-none font-semibold tracking-[-0.04em]">
                <NumberTicker value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
