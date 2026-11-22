import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";

export default function ButtonGroupOrientation() {
  return (
    <div className="flex items-center gap-6">
      <ButtonGroup orientation="vertical" aria-label="Zoom">
        <Button variant="outline" size="icon" aria-label="Zoom in">
          <PlusIcon />
        </Button>
        <Button variant="outline" size="icon" aria-label="Zoom out">
          <MinusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <Button variant="outline">synapse-ui.dev</Button>
      </ButtonGroup>
    </div>
  );
}
