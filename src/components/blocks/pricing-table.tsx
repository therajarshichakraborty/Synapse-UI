"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Hobby",
    monthly: 0,
    description: "For personal projects.",
    features: ["3 projects", "Community support", "Basic analytics"],
    cta: "Start free",
  },
  {
    name: "Pro",
    monthly: 24,
    description: "For growing teams.",
    features: ["Unlimited projects", "Priority support", "Advanced analytics", "Custom domains"],
    cta: "Start trial",
    featured: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    description: "For large organizations.",
    features: ["SSO and SCIM", "Audit logs", "99.99% SLA", "Dedicated manager"],
    cta: "Contact sales",
  },
];

export default function PricingTable() {
  const [yearly, setYearly] = React.useState(true);

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 font-semibold">Simple, transparent pricing</h2>
          <p className="mt-4 text-body-lg text-muted-foreground">
            Start free. Upgrade when you are ready.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-surface-1 px-4 py-2">
            <Label htmlFor="billing">Monthly</Label>
            <Switch
              id="billing"
              checked={yearly}
              onCheckedChange={setYearly}
              aria-label="Yearly billing"
            />
            <Label htmlFor="billing">
              Yearly <Badge variant="success">-20%</Badge>
            </Label>
          </div>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const price =
              plan.monthly === null
                ? "Custom"
                : `$${yearly ? Math.round(plan.monthly * 0.8) : plan.monthly}`;
            return (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-2xl p-8",
                  plan.featured
                    ? "border-beam shadow-[0_20px_60px_-20px_var(--glow-color)]"
                    : "surface-card",
                )}
              >
                {plan.featured && (
                  <Badge variant="gradient" className="absolute -top-2.5 left-8">
                    Most popular
                  </Badge>
                )}
                <h3 className="font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight tabular-nums">
                    {price}
                  </span>
                  {plan.monthly !== null && (
                    <span className="text-sm text-muted-foreground">/ month</span>
                  )}
                </div>
                <ul className="mt-8 grid flex-1 gap-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <CheckIcon className="size-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full" variant={plan.featured ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
