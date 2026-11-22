"use client";

import {
  BarChart3Icon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const items = [
  { title: "Home", icon: HomeIcon, active: true },
  { title: "Inbox", icon: InboxIcon, badge: "12" },
  { title: "Projects", icon: FolderIcon },
  { title: "Analytics", icon: BarChart3Icon },
  { title: "Team", icon: UsersIcon },
];

export default function SidebarDemo() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <div className="flex size-8 items-center justify-center rounded-lg bg-brand-gradient text-sm font-semibold text-white">
                  A
                </div>
                <div className="grid text-left text-sm leading-tight">
                  <span className="font-semibold">Acme Inc</span>
                  <span className="text-xs text-muted-foreground">Pro plan</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.active} tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
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
          <span className="text-sm font-medium">Home</span>
        </header>
        <div className="grid gap-4 p-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-video rounded-xl border border-border bg-surface-1" />
          ))}
          <div className="min-h-64 rounded-xl border border-border bg-surface-1 sm:col-span-3" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
