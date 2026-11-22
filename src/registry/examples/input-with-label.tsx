import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="project">Project name</Label>
      <Input id="project" placeholder="acme-dashboard" aria-describedby="project-hint" />
      <p id="project-hint" className="text-[13px] text-muted-foreground">
        Lowercase letters, numbers and dashes only.
      </p>
    </div>
  );
}
