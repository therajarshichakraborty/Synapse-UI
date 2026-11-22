import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LabelDemo() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="label-demo" />
      <Label htmlFor="label-demo">Remember me on this device</Label>
    </div>
  );
}
