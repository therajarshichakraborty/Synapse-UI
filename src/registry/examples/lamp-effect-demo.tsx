import { LampEffect } from "@/components/animated/lamp-effect";

export default function LampEffectDemo() {
  return (
    <LampEffect className="rounded-xl">
      <h2 className="mt-8 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text py-4 text-center text-4xl font-semibold tracking-tight text-transparent md:text-6xl">
        Build lamps <br /> the right way
      </h2>
    </LampEffect>
  );
}
