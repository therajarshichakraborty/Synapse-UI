import { NumberTicker } from "@/components/animated/number-ticker";

export default function NumberTickerDemo() {
  return (
    <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3">
      <div>
        <NumberTicker value={12840} className="text-4xl font-semibold" />
        <p className="mt-1 text-sm text-muted-foreground">Developers</p>
      </div>
      <div>
        <NumberTicker value={99.98} decimals={2} suffix="%" className="text-4xl font-semibold" />
        <p className="mt-1 text-sm text-muted-foreground">Uptime</p>
      </div>
      <div>
        <NumberTicker
          value={4.2}
          decimals={1}
          prefix="$"
          suffix="M"
          className="text-4xl font-semibold"
        />
        <p className="mt-1 text-sm text-muted-foreground">Revenue</p>
      </div>
    </div>
  );
}
