"use client";

import * as React from "react";
import { HomeIcon, MessageSquareIcon, UserIcon } from "lucide-react";
import { FloatingNavbar } from "@/components/animated/floating-navbar";
import { Button } from "@/components/ui/button";

export default function FloatingNavbarDemo() {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="relative h-[24rem] w-full overflow-y-auto rounded-xl border border-border bg-background scrollbar-thin [transform:translateZ(0)]"
    >
      <FloatingNavbar
        container={ref}
        className="absolute top-4"
        items={[
          { name: "Home", href: "#", icon: <HomeIcon /> },
          { name: "About", href: "#", icon: <UserIcon /> },
          { name: "Contact", href: "#", icon: <MessageSquareIcon /> },
        ]}
        action={
          <Button size="sm" className="rounded-full">
            Login
          </Button>
        }
      />
      <div className="grid gap-4 px-6 pt-24 pb-10">
        <p className="text-center text-sm text-muted-foreground">
          Scroll down to hide the navbar, scroll up to bring it back.
        </p>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl border border-border bg-surface-1" />
        ))}
      </div>
    </div>
  );
}
