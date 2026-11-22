"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowRightIcon, MinusIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Bar, BarChart, Cell, XAxis } from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const history = [
  { m: "Dec", v: 42 },
  { m: "Jan", v: 88 },
  { m: "Feb", v: 66 },
  { m: "Mar", v: 94 },
  { m: "Apr", v: 58 },
  { m: "May", v: 76 },
];
const opacities = [0.25, 0.55, 0.4, 0.85, 0.35, 1];
const chartConfig = {
  v: { label: "Contributions", color: "var(--foreground)" },
} satisfies ChartConfig;

function Panel({
  children,
  i,
  className,
}: {
  children: React.ReactNode;
  i: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={
        "flex flex-col gap-6 rounded-3xl border border-border bg-card p-6 text-left shadow-[0_1px_2px_rgb(0_0_0/0.04)] " +
        (className ?? "")
      }
    >
      {children}
    </motion.div>
  );
}

function CardTitle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

const members = [
  { initials: "AL", name: "Ada Lovelace", email: "ada@acme.dev", role: "owner" },
  { initials: "GH", name: "Grace Hopper", email: "grace@acme.dev", role: "admin" },
  { initials: "LT", name: "Linus T.", email: "linus@acme.dev", role: "member" },
];

/** Four cards of real, interactive Synapse components shown under the hero. */
export function HeroComposition() {
  const [seats, setSeats] = React.useState(8);
  const [volume, setVolume] = React.useState([60]);

  return (
    <div className="relative mx-auto mt-20 w-full max-w-[1500px] px-4 pb-10 sm:px-6 md:mt-24">
      <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Primitives */}
        <Panel i={0}>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">
              Button <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="outline">
              Outline
            </Button>
          </div>
          <InputGroup>
            <InputGroupInput placeholder="Name" aria-label="Name" />
            <InputGroupAddon align="inline-end">
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <Textarea placeholder="Message" aria-label="Message" className="min-h-20" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1.5">
              <Badge>Badge</Badge>
              <Badge variant="secondary">Secondary</Badge>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroup defaultValue="a" className="flex gap-2" aria-label="Option">
                <RadioGroupItem value="a" aria-label="Option A" />
                <RadioGroupItem value="b" aria-label="Option B" />
              </RadioGroup>
              <Checkbox defaultChecked aria-label="Checked" />
              <Switch defaultChecked aria-label="Enabled" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ButtonGroup>
              <Button
                size="icon-sm"
                variant="outline"
                aria-label="Fewer seats"
                onClick={() => setSeats((s) => Math.max(1, s - 1))}
              >
                <MinusIcon />
              </Button>
              <Button size="sm" variant="outline" className="pointer-events-none w-14 tabular-nums">
                {seats}
              </Button>
              <Button
                size="icon-sm"
                variant="outline"
                aria-label="More seats"
                onClick={() => setSeats((s) => s + 1)}
              >
                <PlusIcon />
              </Button>
            </ButtonGroup>
            <Slider
              value={volume}
              onValueChange={setVolume}
              aria-label="Volume"
              className="flex-1"
            />
          </div>
        </Panel>

        {/* Chart */}
        <Panel i={1}>
          <CardTitle title="Contribution History" description="Last 6 months of activity" />
          <ChartContainer config={chartConfig} className="h-[260px] w-full">
            <BarChart data={history} margin={{ top: 4, left: 0, right: 0, bottom: 0 }}>
              <XAxis dataKey="m" tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideIndicator />} />
              <Bar dataKey="v" radius={10}>
                {history.map((d, i) => (
                  <Cell key={d.m} fill="var(--color-v)" fillOpacity={opacities[i]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-medium tabular-nums">424 contributions</span>
          </div>
        </Panel>

        {/* Form */}
        <Panel i={2}>
          <CardTitle
            title="Set a new milestone"
            description="Define your target and we'll help you pace your progress."
          />
          <div className="grid gap-2">
            <Label htmlFor="hero-goal">Goal name</Label>
            <Input id="hero-goal" placeholder="e.g. Launch v2.0" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="hero-amount">Target</Label>
              <Input id="hero-amount" defaultValue="$15,000" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hero-date">Date</Label>
              <DatePicker
                id="hero-date"
                placeholder="Pick date"
                displayFormat="MMM yyyy"
                className="h-9 w-full rounded-full border-transparent bg-muted/70 px-4 font-normal dark:bg-muted"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium tabular-nums">64%</span>
            </div>
            <Progress value={64} aria-label="Milestone progress" />
          </div>
          <Button className="w-full">Create milestone</Button>
        </Panel>

        {/* Team */}
        <Panel i={3}>
          <CardTitle title="Team members" description="Invite collaborators and set their roles." />
          <div className="flex gap-2">
            <Input placeholder="name@company.com" aria-label="Email" />
            <Button variant="secondary">Invite</Button>
          </div>
          <ul className="grid gap-4">
            {members.map((m) => (
              <li key={m.email} className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="text-xs">{m.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.email}</p>
                </div>
                <Select defaultValue={m.role}>
                  <SelectTrigger size="sm" className="w-[104px]" aria-label={`Role for ${m.name}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3 dark:bg-muted">
            <Label htmlFor="hero-notify" className="font-normal">
              Email me about activity
            </Label>
            <Switch id="hero-notify" defaultChecked />
          </div>
        </Panel>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
      />
    </div>
  );
}
