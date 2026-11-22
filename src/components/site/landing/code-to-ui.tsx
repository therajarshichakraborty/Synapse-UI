"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { CodeBlock } from "@/components/animated/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/site/landing/reveal";

const samples = [
  {
    id: "button",
    label: "Button",
    code: `import { Button } from "@/components/ui/button";

export function Actions() {
  return (
    <div className="flex gap-3">
      <Button variant="gradient">Deploy</Button>
      <Button variant="outline">Preview</Button>
    </div>
  );
}`,
    ui: (
      <div className="flex gap-3">
        <Button variant="gradient">
          Deploy <ArrowRightIcon data-icon="inline-end" />
        </Button>
        <Button variant="outline">Preview</Button>
      </div>
    ),
  },
  {
    id: "card",
    label: "Card",
    code: `<Card className="w-80">
  <CardHeader>
    <CardTitle>Pro plan</CardTitle>
    <CardDescription>For growing teams</CardDescription>
  </CardHeader>
  <CardContent>$24 / month</CardContent>
  <CardFooter>
    <Button className="w-full">Upgrade</Button>
  </CardFooter>
</Card>`,
    ui: (
      <Card className="w-72">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Pro plan <Badge variant="gradient">Popular</Badge>
          </CardTitle>
          <CardDescription>For growing teams</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-3xl font-semibold">
            $24<span className="text-sm font-normal text-muted-foreground"> / month</span>
          </p>
          {["Unlimited projects", "Priority support"].map((f) => (
            <p key={f} className="flex items-center gap-2 text-muted-foreground">
              <CheckIcon className="size-4 text-primary" /> {f}
            </p>
          ))}
        </CardContent>
        <CardFooter>
          <Button className="w-full">Upgrade</Button>
        </CardFooter>
      </Card>
    ),
  },
  {
    id: "switch",
    label: "Switch",
    code: `<div className="flex items-center gap-3">
  <Switch id="beta" defaultChecked />
  <Label htmlFor="beta">Enable beta features</Label>
</div>`,
    ui: (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4">
        <Switch id="ctu-beta" defaultChecked />
        <Label htmlFor="ctu-beta">Enable beta features</Label>
      </div>
    ),
  },
];

export function CodeToUi() {
  const [active, setActive] = React.useState(0);
  const sample = samples[active];

  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Code to UI"
          title="Readable code in, polished UI out"
          description="Components read like plain JSX. What you write is exactly what renders."
        />
        <div className="mt-12 flex justify-center gap-2" role="tablist" aria-label="Examples">
          {samples.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                i === active
                  ? "border-primary/40 bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="mt-8 grid overflow-hidden rounded-3xl border border-border lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={sample.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="min-w-0"
            >
              <CodeBlock
                className="h-full rounded-none border-0 border-b border-border lg:border-r lg:border-b-0"
                files={[{ name: `${sample.id}.tsx`, code: sample.code }]}
              />
            </motion.div>
          </AnimatePresence>
          <div className="relative flex min-h-[320px] items-center justify-center bg-surface-1/50 p-8">
            <div aria-hidden="true" className="absolute inset-0 bg-dots mask-radial-fade" />
            <AnimatePresence mode="wait">
              <motion.div
                key={sample.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="relative"
              >
                {sample.ui}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
