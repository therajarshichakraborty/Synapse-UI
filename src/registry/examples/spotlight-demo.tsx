import { Spotlight } from "@/components/animated/spotlight";
import { GridBackground } from "@/components/animated/grid-background";

export default function SpotlightDemo() {
  return (
    <div className="relative flex h-[26rem] w-full items-center justify-center overflow-hidden rounded-xl bg-background">
      <GridBackground fade="center" />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-40" />
      <div className="relative z-10 max-w-lg px-6 text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gradient-subtle md:text-5xl">
          Spotlight is the new trend.
        </h2>
        <p className="mt-4 text-muted-foreground">
          A cinematic beam that draws the eye to your headline.
        </p>
      </div>
    </div>
  );
}
