import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" defaultChecked />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="updates" />
        <div className="grid gap-1">
          <Label htmlFor="updates">Product updates</Label>
          <p className="text-[13px] text-muted-foreground">
            Get an email when we ship something new.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="opacity-60">
          Disabled
        </Label>
      </div>
    </div>
  );
}
