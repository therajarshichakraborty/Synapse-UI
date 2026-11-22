import { ArchiveIcon, ChevronDownIcon, ClockIcon, ReplyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <ButtonGroup>
        <Button variant="outline">
          <ReplyIcon /> Reply
        </Button>
        <Button variant="outline">
          <ArchiveIcon /> Archive
        </Button>
        <Button variant="outline">
          <ClockIcon /> Snooze
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Publish</Button>
        <Button size="icon" aria-label="More publish options">
          <ChevronDownIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
