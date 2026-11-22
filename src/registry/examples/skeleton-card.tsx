import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div
      className="grid w-full max-w-xl gap-4 sm:grid-cols-2"
      aria-busy="true"
      aria-label="Loading posts"
    >
      {[0, 1].map((i) => (
        <div key={i} className="space-y-3 rounded-xl border border-border p-4">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
