"use client";

import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function DialogShare() {
  const link = "https://synapse-ui.dev/invite/x7Kq2";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone with this link can view the project.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <label htmlFor="share-link" className="sr-only">
            Link
          </label>
          <Input id="share-link" defaultValue={link} readOnly />
          <Button
            size="icon"
            variant="outline"
            aria-label="Copy link"
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast.success("Link copied");
            }}
          >
            <CopyIcon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
