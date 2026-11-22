import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const settings = [
  {
    id: "marketing",
    title: "Marketing emails",
    desc: "Receive emails about new products and features.",
    on: false,
  },
  {
    id: "security",
    title: "Security emails",
    desc: "Receive emails about your account activity.",
    on: true,
  },
];

export default function SwitchSettings() {
  return (
    <div className="grid w-full max-w-md gap-3">
      {settings.map((s) => (
        <div
          key={s.id}
          className="flex items-center justify-between gap-6 rounded-xl border border-border p-4"
        >
          <div className="grid gap-1">
            <Label htmlFor={`setting-${s.id}`}>{s.title}</Label>
            <p className="text-[13px] text-muted-foreground">{s.desc}</p>
          </div>
          <Switch id={`setting-${s.id}`} defaultChecked={s.on} />
        </div>
      ))}
    </div>
  );
}
