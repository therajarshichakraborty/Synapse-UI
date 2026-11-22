import { Skeleton } from "@/components/ui/skeleton";

export default function DocsLoading() {
  return (
    <div
      className="mx-auto w-full max-w-[52rem] px-4 pt-10 sm:px-8"
      aria-busy="true"
      aria-label="Loading"
    >
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-6 h-10 w-2/3" />
      <Skeleton className="mt-4 h-5 w-full max-w-lg" />
      <Skeleton className="mt-10 h-[340px] w-full rounded-xl" />
      <Skeleton className="mt-8 h-5 w-1/2" />
      <Skeleton className="mt-3 h-24 w-full rounded-xl" />
    </div>
  );
}
