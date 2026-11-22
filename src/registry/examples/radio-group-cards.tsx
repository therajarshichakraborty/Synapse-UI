import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const plans = [
  { id: "starter", name: "Starter", price: "$0", desc: "For side projects" },
  { id: "pro", name: "Pro", price: "$19", desc: "For growing teams" },
  { id: "enterprise", name: "Enterprise", price: "Custom", desc: "For large organizations" },
];

export default function RadioGroupCards() {
  return (
    <RadioGroup defaultValue="pro" className="grid w-full max-w-md gap-3" aria-label="Plan">
      {plans.map((p) => (
        <Label
          key={p.id}
          htmlFor={`plan-${p.id}`}
          className="flex cursor-pointer items-center gap-4 rounded-xl border border-border p-4 font-normal transition-colors hover:bg-accent/50 has-[[data-state=checked]]:border-primary/50 has-[[data-state=checked]]:bg-primary/[0.06]"
        >
          <RadioGroupItem value={p.id} id={`plan-${p.id}`} />
          <span className="grid flex-1 gap-0.5">
            <span className="font-medium">{p.name}</span>
            <span className="text-[13px] text-muted-foreground">{p.desc}</span>
          </span>
          <span className="font-semibold tabular-nums">{p.price}</span>
        </Label>
      ))}
    </RadioGroup>
  );
}
