"use client";

import {
  BarChart3Icon,
  BellIcon,
  CreditCardIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const nav = [
  { title: "Overview", icon: HomeIcon, active: true },
  { title: "Analytics", icon: BarChart3Icon },
  { title: "Customers", icon: UsersIcon },
  { title: "Billing", icon: CreditCardIcon },
];

const stats = [
  { label: "Revenue", value: "$45,231", delta: "+20.1%" },
  { label: "Subscriptions", value: "2,350", delta: "+180" },
  { label: "Active now", value: "573", delta: "+12%" },
  { label: "Churn", value: "1.2%", delta: "-0.4%" },
];

const data = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m, i) => ({
  month: m,
  revenue: 2000 + i * 600 + (i % 3) * 900,
}));
const config = { revenue: { label: "Revenue", color: "var(--chart-1)" } } satisfies ChartConfig;

export default function DashboardShell() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <span className="flex size-8 items-center justify-center rounded-lg bg-brand-gradient text-sm font-semibold text-white">
                  A
                </span>
                <span className="grid text-left text-sm leading-tight">
                  <span className="font-semibold">Acme Inc</span>
                  <span className="text-xs text-muted-foreground">Enterprise</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((n) => (
                  <SidebarMenuItem key={n.title}>
                    <SidebarMenuButton isActive={n.active} tooltip={n.title}>
                      <n.icon />
                      <span>{n.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <SettingsIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium">Overview</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." aria-label="Search" className="h-8 w-56 pl-8" />
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="Notifications">
              <BellIcon />
            </Button>
            <Avatar size="sm">
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="grid gap-4 p-4 md:p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label} size="sm">
                <CardHeader>
                  <CardDescription>{s.label}</CardDescription>
                  <CardTitle className="text-2xl tabular-nums">{s.value}</CardTitle>
                  <CardAction>
                    <Badge variant={s.delta.startsWith("-") ? "secondary" : "success"}>
                      <TrendingUpIcon data-icon="inline-start" />
                      {s.delta}
                    </Badge>
                  </CardAction>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>January to August</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={config} className="h-[260px] w-full">
                <AreaChart accessibilityLayer data={data}>
                  <defs>
                    <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Area
                    dataKey="revenue"
                    type="natural"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    fill="url(#dash-fill)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
