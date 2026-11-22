"use client";

import * as React from "react";
import { motion } from "motion/react";
import { BellIcon, CheckIcon, GitBranchIcon, RocketIcon, TrendingUpIcon } from "lucide-react";
import { Area, AreaChart, XAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NumberTicker } from "@/components/animated/number-ticker";

const data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({
  d,
  v: [32, 41, 38, 56, 52, 71, 84][i],
}));
const config = { v: { label: "Deploys", color: "var(--chart-1)" } } satisfies ChartConfig;

function Panel({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 + delay, ease: [0.16, 1, 0.3, 1] }}
      className={
        "rounded-2xl surface-card p-4 text-left shadow-[inset_0_1px_0_0_var(--highlight),0_24px_48px_-24px_rgb(0_0_0/0.5)] " +
        (className ?? "")
      }
    >
      {children}
    </motion.div>
  );
}

/** A live composition of real Synapse components, shown under the hero copy. */
export function HeroComposition() {
  const [notify, setNotify] = React.useState(true);
  const [budget, setBudget] = React.useState([64]);
  const [range, setRange] = React.useState("7d");

  return (
    <div className="relative mt-16 w-full max-w-6xl pb-24 md:mt-20">
      <div
        aria-hidden="true"
        className="absolute inset-x-12 top-10 -z-10 h-64 rounded-full bg-primary/20 blur-[90px]"
      />
      <div className="rounded-[1.75rem] border border-border bg-surface-1/40 p-2 backdrop-blur-xl md:p-3">
        <div className="grid gap-2 md:grid-cols-12 md:gap-3">
          <Panel className="md:col-span-7" delay={0}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Deployments</p>
                <p className="mt-0.5 flex items-baseline gap-2 text-2xl font-semibold">
                  <NumberTicker value={1284} />
                  <Badge variant="success">
                    <TrendingUpIcon data-icon="inline-start" /> 24%
                  </Badge>
                </p>
              </div>
              <Tabs value={range} onValueChange={setRange}>
                <TabsList>
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <ChartContainer config={config} className="mt-4 h-[150px] w-full md:h-[180px]">
              <AreaChart data={data} margin={{ left: 4, right: 4, top: 8 }}>
                <defs>
                  <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-v)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--color-v)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" tickLine={false} axisLine={false} tickMargin={6} fontSize={11} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Area
                  dataKey="v"
                  type="natural"
                  stroke="var(--color-v)"
                  strokeWidth={2}
                  fill="url(#hero-fill)"
                />
              </AreaChart>
            </ChartContainer>
          </Panel>

          <Panel className="md:col-span-5" delay={0.08}>
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <RocketIcon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">synapse-web · production</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <GitBranchIcon className="size-3" /> main · 2m ago
                </p>
              </div>
              <Badge variant="info" className="ml-auto">
                Ready
              </Badge>
            </div>
            <div className="mt-5 grid gap-2">
              {["Build", "Tests", "Deploy"].map((s, i) => (
                <div key={s} className="flex items-center gap-3 text-sm">
                  <span className="flex size-5 items-center justify-center rounded-full bg-success/15 text-success">
                    <CheckIcon className="size-3" />
                  </span>
                  <span className="flex-1">{s}</span>
                  <span className="font-mono text-xs text-muted-foreground">{[18, 42, 9][i]}s</span>
                </div>
              ))}
            </div>
            <Progress value={100} className="mt-5" aria-label="Deployment progress" />
          </Panel>

          <Panel className="md:col-span-4" delay={0.16}>
            <p className="text-sm font-medium">Invite your team</p>
            <div className="mt-3 flex gap-2">
              <Label htmlFor="hero-invite" className="sr-only">
                Email
              </Label>
              <Input id="hero-invite" placeholder="ada@company.com" className="h-8" />
              <Button size="sm">Invite</Button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <AvatarGroup>
                {["AL", "GH", "LT"].map((i) => (
                  <Avatar key={i} size="sm">
                    <AvatarFallback className="bg-primary/15 text-[10px] text-primary">
                      {i}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <AvatarGroupCount className="size-6 text-[10px]">+5</AvatarGroupCount>
              </AvatarGroup>
              <span className="text-xs text-muted-foreground">8 members</span>
            </div>
          </Panel>

          <Panel className="md:col-span-4" delay={0.24}>
            <div className="flex items-center justify-between">
              <Label htmlFor="hero-budget">Spend limit</Label>
              <span className="font-mono text-sm tabular-nums">${budget[0] * 10}</span>
            </div>
            <Slider
              id="hero-budget"
              value={budget}
              onValueChange={setBudget}
              className="mt-4"
              aria-label="Spend limit"
            />
            <div className="mt-5 flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
              <Label htmlFor="hero-notify" className="flex items-center gap-2 font-normal">
                <BellIcon className="size-4 text-muted-foreground" /> Usage alerts
              </Label>
              <Switch id="hero-notify" checked={notify} onCheckedChange={setNotify} />
            </div>
          </Panel>

          <Panel className="md:col-span-4" delay={0.32}>
            <p className="text-sm font-medium">Uptime</p>
            <p className="mt-1 text-2xl font-semibold">
              <NumberTicker value={99.99} decimals={2} suffix="%" />
            </p>
            <div className="mt-4 flex h-8 items-end gap-[3px]" aria-hidden="true">
              {Array.from({ length: 30 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    "flex-1 rounded-sm " +
                    (i === 17 ? "h-1/2 bg-warning/70" : "h-full bg-primary/70")
                  }
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Last 30 days</p>
          </Panel>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />
    </div>
  );
}
