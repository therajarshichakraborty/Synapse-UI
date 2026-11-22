import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export default function ToggleDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Toggle bold" defaultPressed>
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
        <ItalicIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle underline">
        <UnderlineIcon />
        Underline
      </Toggle>
    </div>
  );
}
