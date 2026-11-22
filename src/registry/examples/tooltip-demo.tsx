import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function TooltipDemo() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="New file">
            <PlusIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          New file <Kbd>⌘N</Kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
