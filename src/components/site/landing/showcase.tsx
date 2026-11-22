"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRightIcon, CalendarIcon, SparklesIcon } from "lucide-react";
import { AnimatedTabs } from "@/components/animated/animated-tabs";
import { GlowingCard } from "@/components/animated/glowing-card";
import { TiltCard } from "@/components/animated/tilt-card";
import { ShimmerButton } from "@/components/animated/shimmer-button";
import { MovingBorderButton } from "@/components/animated/moving-border-button";
import { FlipWords } from "@/components/animated/flip-words";
import { Terminal } from "@/components/animated/terminal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/site/landing/reveal";

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[420px] items-center justify-center p-4 sm:p-8">{children}</div>
  );
}

const scenes: Record<string, React.ReactNode> = {
  forms: (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="grid gap-4 rounded-2xl surface-premium p-6">
        <div className="grid gap-2">
          <Label htmlFor="sc-name">Project name</Label>
          <Input id="sc-name" defaultValue="synapse-web" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sc-desc">Description</Label>
          <Textarea id="sc-desc" placeholder="What are you building?" />
        </div>
        <RadioGroup defaultValue="pro" className="grid grid-cols-2 gap-2" aria-label="Plan">
          {["hobby", "pro"].map((p) => (
            <Label
              key={p}
              htmlFor={`sc-${p}`}
              className="flex items-center gap-2 rounded-lg border border-border p-3 font-normal capitalize has-[[data-state=checked]]:border-primary/50"
            >
              <RadioGroupItem id={`sc-${p}`} value={p} /> {p}
            </Label>
          ))}
        </RadioGroup>
        <div className="flex items-center gap-2">
          <Checkbox id="sc-terms" defaultChecked />
          <Label htmlFor="sc-terms" className="font-normal">
            Enable preview deployments
          </Label>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl surface-premium p-6">
        <p className="text-sm font-medium">Verify your email</p>
        <InputOTP maxLength={6} defaultValue="4201" aria-label="Verification code">
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <Button className="w-full">Continue</Button>
      </div>
    </div>
  ),
  data: (
    <div className="grid w-full max-w-3xl items-start gap-4 md:grid-cols-[auto_1fr]">
      <Calendar
        mode="single"
        selected={new Date()}
        className="mx-auto rounded-2xl border border-border bg-card"
      />
      <div className="rounded-2xl surface-premium p-2">
        <Accordion type="single" collapsible defaultValue="a">
          {[
            ["a", "Standup", "9:30 AM · Engineering"],
            ["b", "Design review", "1:00 PM · Product"],
            ["c", "Launch party", "6:00 PM · Everyone"],
          ].map(([v, t, s]) => (
            <AccordionItem key={v} value={v} className="px-3">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <CalendarIcon className="size-4 text-muted-foreground" /> {t}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{s}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  ),
  motion: (
    <div className="grid w-full max-w-4xl items-center gap-6 md:grid-cols-2">
      <TiltCard>
        <div className="aspect-[16/10] rounded-xl bg-[linear-gradient(160deg,#3f3f46,#18181b_55%,#09090b)]" />
        <p className="mt-4 font-semibold">3D Tilt Card</p>
        <p className="text-sm text-muted-foreground">Move your pointer across me.</p>
      </TiltCard>
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-3xl font-semibold tracking-tight">
          Build <FlipWords words={["faster", "bolder", "smoother"]} />
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ShimmerButton>
            <SparklesIcon /> Shimmer
          </ShimmerButton>
          <MovingBorderButton>Moving border</MovingBorderButton>
        </div>
        <GlowingCard className="w-full max-w-xs py-5 text-left">
          <Badge variant="gradient">Pro</Badge>
          <p className="mt-3 font-semibold">Glowing border card</p>
        </GlowingCard>
      </div>
    </div>
  ),
  terminal: (
    <Terminal
      className="w-full max-w-xl"
      loop
      lines={[
        { type: "command", text: "npx synapse-ui add marquee spotlight" },
        { type: "output", text: "✔ Wrote components/animated/marquee.tsx", tone: "success" },
        { type: "output", text: "✔ Wrote components/animated/spotlight.tsx", tone: "success" },
      ]}
    />
  ),
};

export function Showcase() {
  const [tab, setTab] = React.useState("motion");
  return (
    <section id="showcase" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Showcase"
          title="Real components, rendered live"
          description="Not screenshots. Click, type, hover. This is the same code you install."
        />
        <div className="mt-12 flex justify-center">
          <AnimatedTabs
            value={tab}
            onValueChange={setTab}
            tabs={[
              { value: "motion", label: "Motion" },
              { value: "forms", label: "Forms" },
              { value: "data", label: "Data" },
              { value: "terminal", label: "CLI" },
            ]}
          />
        </div>
        <div className="relative mt-8 overflow-hidden rounded-3xl border border-border bg-surface-1/60">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              <Stage>{scenes[tab]}</Stage>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/docs/components">
              View all components <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
