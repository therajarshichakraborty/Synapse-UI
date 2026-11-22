import { Timeline } from "@/components/animated/timeline";

const item = (text: string) => (
  <div>
    <p className="mb-4 text-sm leading-6 text-muted-foreground">{text}</p>
    <div className="grid grid-cols-2 gap-3">
      <div className="aspect-video rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-600/30" />
      <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-600/30 to-indigo-600/30" />
    </div>
  </div>
);

export default function TimelineDemo() {
  return (
    <Timeline
      data={[
        {
          title: "2026",
          content: item(
            "Launched Synapse UI 2.0 with a dark-first design system and 30+ animated components.",
          ),
        },
        { title: "2025", content: item("Shipped the CLI and the shadcn-compatible registry.") },
        {
          title: "2024",
          content: item("Started as a small set of copy-paste components for side projects."),
        },
      ]}
    />
  );
}
