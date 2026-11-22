import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const options = [
  { id: "email", title: "Email", desc: "Daily digest of activity." },
  { id: "push", title: "Push", desc: "Real-time alerts on your devices." },
];

export default function CheckboxCard() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      {options.map((o, i) => (
        <Label
          key={o.id}
          htmlFor={`notify-${o.id}`}
          className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-accent/50 has-[[aria-checked=true]]:border-primary/50 has-[[aria-checked=true]]:bg-primary/[0.06]"
        >
          <Checkbox id={`notify-${o.id}`} defaultChecked={i === 0} />
          <span className="grid gap-1 font-normal">
            <span className="font-medium">{o.title}</span>
            <span className="text-[13px] text-muted-foreground">{o.desc}</span>
          </span>
        </Label>
      ))}
    </div>
  );
}
