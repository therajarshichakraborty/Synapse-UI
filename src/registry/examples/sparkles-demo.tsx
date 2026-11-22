import { Sparkles } from "@/components/animated/sparkles";

export default function SparklesDemo() {
  return (
    <div className="relative flex h-[22rem] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-background">
      <h2 className="relative z-10 text-5xl font-semibold tracking-tight md:text-7xl">Synapse</h2>
      <div className="relative mt-2 h-40 w-full max-w-xl">
        <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-glow-cyan to-transparent" />
        <div className="absolute inset-x-40 top-0 h-[5px] bg-gradient-to-r from-transparent via-glow-blue to-transparent blur-sm" />
        <Sparkles
          density={14}
          className="[mask-image:radial-gradient(300px_160px_at_top,white,transparent)]"
        />
      </div>
    </div>
  );
}
