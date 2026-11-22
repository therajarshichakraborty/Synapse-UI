"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2026 at 9:00 AM",
          action: { label: "Undo", onClick: () => toast("Undone") },
        })
      }
    >
      Show toast
    </Button>
  );
}
