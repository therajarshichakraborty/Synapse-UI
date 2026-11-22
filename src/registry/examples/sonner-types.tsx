"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SonnerTypes() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={() => toast.success("Deployment ready")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("A new version is available")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Usage at 90%")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Build failed")}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: "Publishing...",
            success: "Published",
            error: "Failed",
          })
        }
      >
        Promise
      </Button>
    </div>
  );
}
