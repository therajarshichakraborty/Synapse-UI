import { TracingBeam } from "@/components/animated/tracing-beam";

const sections = [
  {
    badge: "Design",
    title: "Tokens before components",
    body: "Every color, radius and shadow starts as a CSS variable. Components only ever read tokens, so a rebrand is a one-file change.",
  },
  {
    badge: "Motion",
    title: "Restraint is a feature",
    body: "UI transitions stay between 150 and 400 milliseconds with ease-out curves. Hero reveals can take longer. Everything turns off with reduced motion.",
  },
  {
    badge: "Access",
    title: "Keyboard first",
    body: "Every interactive component is built on accessible primitives with visible focus rings and documented keyboard interactions.",
  },
];

export default function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="relative mx-auto max-w-xl pt-4 antialiased">
        {sections.map((s) => (
          <article key={s.title} className="mb-12">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
              {s.badge}
            </span>
            <h3 className="mb-3 text-xl font-semibold tracking-tight">{s.title}</h3>
            <div className="mb-4 aspect-[2/1] rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-indigo-600/20" />
            <p className="text-sm leading-7 text-muted-foreground">{s.body}</p>
          </article>
        ))}
      </div>
    </TracingBeam>
  );
}
