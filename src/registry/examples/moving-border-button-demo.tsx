import { ArrowRightIcon } from "lucide-react";
import { MovingBorderButton } from "@/components/animated/moving-border-button";

export default function MovingBorderButtonDemo() {
  return (
    <MovingBorderButton>
      Book a demo <ArrowRightIcon />
    </MovingBorderButton>
  );
}
