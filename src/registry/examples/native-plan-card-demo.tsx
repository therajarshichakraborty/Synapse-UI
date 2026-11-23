import * as React from "react";
import { ScrollView } from "react-native";
import { Button } from "@/components/native/button";
import { PlanCard, type Plan } from "@/components/native/plan-card";
import { Text } from "@/components/native/text";

const plans: Plan[] = [
  { id: "monthly", name: "Monthly", price: "$12", period: "/month", description: "Cancel anytime" },
  {
    id: "yearly",
    name: "Yearly",
    price: "$84",
    period: "/year",
    badge: "Save 40%",
    description: "$7 / month, billed annually",
    features: ["Unlimited projects", "AI credits included", "Priority support"],
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$249",
    period: "once",
    description: "Pay once, own it forever",
  },
];

export default function NativePlanCardDemo() {
  const [plan, setPlan] = React.useState("yearly");
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
      <Text variant="h2">Go Pro</Text>
      <Text variant="muted" style={{ marginBottom: 8 }}>
        Choose the plan that fits you.
      </Text>
      {plans.map((p) => (
        <PlanCard key={p.id} plan={p} selected={plan === p.id} onPress={() => setPlan(p.id)} />
      ))}
      <Button variant="brand" size="lg" block style={{ marginTop: 8 }}>
        Continue
      </Button>
      <Text variant="caption" align="center">
        Recurring billing. Cancel anytime in Settings.
      </Text>
    </ScrollView>
  );
}
