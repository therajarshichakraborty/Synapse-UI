import { ArrowRightIcon, CheckIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/animated/grid-background";

const points = ["Real-time collaboration", "Granular permissions", "Unlimited history"];

export default function HeroSplit() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <GridBackground variant="dots" fade="center" className="-z-10" />
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <Badge variant="info">v2.0 is live</Badge>
          <h1 className="mt-6 text-h1 font-semibold">
            Analytics your whole team will actually use
          </h1>
          <p className="mt-6 max-w-lg text-body-lg text-muted-foreground">
            Turn raw events into decisions. Beautiful dashboards, instant answers, zero SQL
            required.
          </p>
          <ul className="mt-8 grid gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CheckIcon className="size-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg">
              Get started <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="ghost">
              Live demo
            </Button>
          </div>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-10 -z-10 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="grid gap-4">
            <div className="rounded-2xl surface-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Weekly active users</span>
                <Badge variant="success">
                  <TrendingUpIcon data-icon="inline-start" /> 18.2%
                </Badge>
              </div>
              <div className="mt-2 text-3xl font-semibold tabular-nums">24,512</div>
              <div className="mt-6 flex h-28 items-end gap-2" aria-hidden="true">
                {[40, 55, 45, 70, 62, 85, 78, 95, 88, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary/30 to-primary"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Conversion", "4.8%"],
                ["Avg. session", "6m 12s"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl surface-card p-5">
                  <div className="text-xs text-muted-foreground">{k}</div>
                  <div className="mt-1 text-xl font-semibold tabular-nums">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
