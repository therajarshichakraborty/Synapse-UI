import { GradientText } from "@/components/animated/gradient-text";

export default function GradientTextDemo() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
        <GradientText>Ship something brilliant</GradientText>
      </h2>
      <p className="mt-4 text-sm text-muted-foreground">
        Static gradient:{" "}
        <GradientText animate={false} className="font-medium">
          brand cyan to indigo
        </GradientText>
      </p>
    </div>
  );
}
