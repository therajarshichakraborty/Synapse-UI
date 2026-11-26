"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRightIcon,
  CalendarIcon,
  FormInputIcon,
  WavesIcon,
  TerminalSquareIcon,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[460px] items-center justify-center p-4 sm:p-8 md:min-h-[500px] md:p-12">
      {children}
    </div>
  );
}

const tabs = [
  { value: "motion", label: "Motion", Icon: WavesIcon },
  { value: "forms", label: "Forms", Icon: FormInputIcon },
  { value: "data", label: "Data", Icon: CalendarIcon },
  { value: "terminal", label: "CLI", Icon: TerminalSquareIcon },
] as const;

/** input-otp controls its input internally, so it needs `value`, not `defaultValue`. */
function OtpDemo() {
  const [code, setCode] = React.useState("4201");
  return (
    <InputOTP maxLength={6} value={code} onChange={setCode} aria-label="Verification code">
      <InputOTPGroup>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}

const scenes: Record<string, React.ReactNode> = {
  forms: (
    <div className="grid grid-cols-1 w-full max-w-3xl items-center gap-12 md:grid-cols-2">
      <div className="grid gap-4">
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
      <div className="flex flex-col items-center justify-center gap-6">
        <p className="text-sm font-medium">Verify your email</p>
        <OtpDemo />
        <Button className="w-full">Continue</Button>
      </div>
    </div>
  ),
  data: (
    <div className="grid grid-cols-1 w-full max-w-3xl items-start gap-12 md:grid-cols-[auto_1fr]">
      <Calendar mode="single" selected={new Date()} className="mx-auto" />
      <div>
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
    <div className="grid grid-cols-1 w-full max-w-4xl items-center gap-6 md:grid-cols-2">
      <TiltCard className="border-0! bg-transparent! p-0! shadow-none!">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(2,32,71,0.55)]">
          <Image
            src="/images/beach-landscape.webp"
            alt="Aerial view of a turquoise sea meeting a white-sand beach"
            fill
            sizes="(min-width: 768px) 440px, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 pt-16 text-white">
            <p className="font-semibold tracking-tight">3D Tilt Card</p>
            <p className="text-sm text-white/75">Move your pointer across me.</p>
          </div>
        </div>
      </TiltCard>
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-3xl font-semibold tracking-tight">
          Build <FlipWords words={["faster", "bolder", "smoother"]} />
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ShimmerButton>Shimmer</ShimmerButton>
          <MovingBorderButton>Moving border</MovingBorderButton>
        </div>
        <GlowingCard className="w-full max-w-xs py-5 text-left">
          <Badge variant="secondary">Pro</Badge>
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
        { type: "command", text: "npx synapse-ui-cli add marquee spotlight" },
        { type: "output", text: "✔ Wrote components/animated/marquee.tsx", tone: "success" },
        { type: "output", text: "✔ Wrote components/animated/spotlight.tsx", tone: "success" },
      ]}
    />
  ),
};

export function Showcase() {
  const [tab, setTab] = React.useState<(typeof tabs)[number]["value"]>("motion");
  return (
    <section id="showcase" className="relative py-20 sm:py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Showcase"
          title={
            <>
              Real components, <span className="text-muted-foreground">rendered live.</span>
            </>
          }
          description="Not screenshots. Click, type, hover. This is the same code you install."
        />

        <div className="relative mt-12 sm:mt-16">
          <div>
            <div className="flex justify-center">
              <div
                role="tablist"
                aria-label="Showcase category"
                className="grid w-full max-w-md grid-cols-4 gap-1 rounded-xl bg-surface-2 p-1 sm:inline-flex sm:w-auto"
              >
                {tabs.map(({ value, label, Icon }) => {
                  const selected = tab === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setTab(value)}
                      className={cn(
                        "relative inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3.5",
                        selected
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {selected && (
                        <motion.span
                          layoutId="showcase-tab"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                          className="absolute inset-0 rounded-lg bg-background shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                        />
                      )}
                      <Icon className="relative hidden size-3.5 min-[400px]:block" />
                      <span className="relative">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage */}
            <div className="relative mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.28 }}
                  className="relative"
                >
                  <Stage>{scenes[tab]}</Stage>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
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
