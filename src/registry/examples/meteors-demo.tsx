import { Meteors } from "@/components/animated/meteors";
import { Button } from "@/components/ui/button";

export default function MeteorsDemo() {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl surface-card p-8">
      <Meteors number={16} />
      <div className="relative">
        <div className="mb-4 flex size-10 items-center justify-center rounded-full border border-border">
          <span className="size-2 rounded-full bg-primary" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight">Meteors because they are cool</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          A field of shooting stars for cards and hero sections, randomized on mount.
        </p>
        <Button variant="outline" size="sm" className="mt-6">
          Explore
        </Button>
      </div>
    </div>
  );
}
