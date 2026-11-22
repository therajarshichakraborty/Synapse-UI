import { CheckIcon, ClockIcon, InfoIcon, SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BadgeStatus() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="success">
        <CheckIcon data-icon="inline-start" />
        Ready
      </Badge>
      <Badge variant="warning">
        <ClockIcon data-icon="inline-start" />
        Queued
      </Badge>
      <Badge variant="info">
        <InfoIcon data-icon="inline-start" />
        Preview
      </Badge>
      <Badge variant="gradient">
        <SparklesIcon data-icon="inline-start" />
        New
      </Badge>
      <Badge variant="outline" className="tabular-nums">
        99+
      </Badge>
    </div>
  );
}
