import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>
        Get started
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button variant="outline">Documentation</Button>
    </div>
  );
}
