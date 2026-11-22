import { Typewriter } from "@/components/animated/typewriter";

export default function TypewriterDemo() {
  return (
    <h2 className="text-center text-3xl font-semibold tracking-tight md:text-5xl">
      Build{" "}
      <Typewriter
        className="text-gradient"
        words={["dashboards", "landing pages", "design systems", "anything"]}
      />
    </h2>
  );
}
