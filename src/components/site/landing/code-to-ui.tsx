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
    code: `import { Button } from "@/components/synapse-ui/button";

export function Actions() {
  return (
    <div className="flex gap-3">
      <Button>Deploy</Button>
      <Button variant="outline">Preview</Button>
    </div>
  );
}`,
    ui: (
      <div className="flex gap-3">
        <Button>
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
      <Card className="w-full max-w-72 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Pro plan <Badge variant="secondary">Popular</Badge>
          </CardTitle>
          <CardDescription>For growing teams</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-3xl font-semibold">
            $24<span className="text-sm font-normal text-muted-foreground"> / month</span>
          </p>
          {["Unlimited projects", "Priority support"].map((f) => (
            <p key={f} className="flex items-center gap-2 text-muted-foreground">
              <CheckIcon className="size-4 text-brand" /> {f}
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
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-sm">
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
    <section className="relative py-20 sm:py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Code to UI"
          title={
            <>
              <span className="whitespace-nowrap">Readable code in,</span>{" "}
              <span className="whitespace-nowrap text-muted-foreground">polished UI out.</span>
            </>
          }
          description="Components read like plain JSX. What you write is exactly what renders."
        />

        <div className="mt-10 flex justify-center sm:mt-12">
          <div
            role="tablist"
            aria-label="Examples"
            className="inline-flex gap-1 rounded-full border border-border bg-surface-1 p-1"
          >
            {samples.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-5",
                    selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="code-to-ui-tab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      className="absolute inset-0 rounded-full bg-background shadow-[0_1px_3px_rgba(0,0,0,0.12)] ring-1 ring-border"
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
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
                className="border-0 bg-transparent shadow-none [&>div:first-child]:border-b-0"
                files={[{ name: `${sample.id}.tsx`, code: sample.code }]}
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex min-h-[240px] items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={sample.id}
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex w-full justify-center"
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
