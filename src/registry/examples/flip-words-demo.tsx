import { FlipWords } from "@/components/animated/flip-words";

export default function FlipWordsDemo() {
  return (
    <h2 className="text-center text-3xl font-semibold tracking-tight md:text-5xl">
      Build <FlipWords words={["better", "faster", "beautiful", "modern"]} />{" "}
      <br className="sm:hidden" />
      websites with Synapse
    </h2>
  );
}
