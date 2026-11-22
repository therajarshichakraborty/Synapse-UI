import { SearchXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyStateSearch() {
  return (
    <Empty className="w-full max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-primary/10 text-primary">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>No results for “aurora”</EmptyTitle>
        <EmptyDescription>Try a different keyword, or clear your filters.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Clear filters
        </Button>
      </EmptyContent>
    </Empty>
  );
}
