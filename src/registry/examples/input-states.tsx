import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputStates() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <Label htmlFor="input-file">Avatar</Label>
        <Input id="input-file" type="file" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="input-disabled">Disabled</Label>
        <Input id="input-disabled" disabled placeholder="Not editable" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="input-invalid">Invalid</Label>
        <Input id="input-invalid" aria-invalid defaultValue="not-an-email" />
        <p className="text-[13px] text-destructive">Enter a valid email address.</p>
      </div>
    </div>
  );
}
