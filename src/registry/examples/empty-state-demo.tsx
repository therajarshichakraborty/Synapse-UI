import { FolderPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyStateDemo() {
  return (
    <Empty className="w-full max-w-md border border-dashed border-border-strong">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderPlusIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          You have not created any projects. Get started by creating your first one.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create project</Button>
          <Button variant="outline">Import</Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
