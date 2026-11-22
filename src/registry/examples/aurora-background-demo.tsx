import { AuroraBackground } from "@/components/animated/aurora-background";
import { Button } from "@/components/ui/button";

export default function AuroraBackgroundDemo() {
  return (
    <AuroraBackground className="flex h-[26rem] w-full items-center justify-center rounded-xl">
      <div className="relative z-10 px-6 text-center">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Background lights are cool.
        </h2>
        <p className="mt-4 text-muted-foreground">And this is the aurora.</p>
        <Button className="mt-6" variant="glass">
          Debug now
        </Button>
      </div>
    </AuroraBackground>
  );
}
