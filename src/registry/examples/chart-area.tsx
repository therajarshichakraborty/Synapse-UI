"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const data = [
  { day: "Mon", visitors: 1200, signups: 140 },
  { day: "Tue", visitors: 1800, signups: 210 },
  { day: "Wed", visitors: 1500, signups: 180 },
  { day: "Thu", visitors: 2300, signups: 320 },
  { day: "Fri", visitors: 2100, signups: 280 },
  { day: "Sat", visitors: 2800, signups: 390 },
  { day: "Sun", visitors: 3200, signups: 460 },
];

const config = {
  visitors: { label: "Visitors", color: "var(--chart-1)" },
  signups: { label: "Signups", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartArea() {
  return (
    <ChartContainer config={config} className="min-h-[240px] w-full max-w-xl">
      <AreaChart accessibilityLayer data={data} margin={{ left: 8, right: 8 }}>
        <defs>
          <linearGradient id="fill-visitors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-visitors)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--color-visitors)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fill-signups" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-signups)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--color-signups)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Area
          dataKey="visitors"
          type="natural"
          fill="url(#fill-visitors)"
          stroke="var(--color-visitors)"
          strokeWidth={2}
        />
        <Area
          dataKey="signups"
          type="natural"
          fill="url(#fill-signups)"
          stroke="var(--color-signups)"
          strokeWidth={2}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
