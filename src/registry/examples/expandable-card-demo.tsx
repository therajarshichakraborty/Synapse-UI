import { ExpandableCards } from "@/components/animated/expandable-card";
import { Button } from "@/components/ui/button";

const items = [
  {
    id: "aurora",
    title: "Aurora",
    subtitle: "Ambient hero backgrounds",
    cover: "linear-gradient(135deg,#22d3ee,#3b82f6)",
    content: (
      <p>
        Slow, drifting light for hero sections. Pairs well with large display type and a single CTA.
      </p>
    ),
  },
  {
    id: "beams",
    title: "Beams",
    subtitle: "Light traveling along paths",
    cover: "linear-gradient(135deg,#3b82f6,#6366f1)",
    content: (
      <p>Beams draw the eye toward a form or headline without competing with the content.</p>
    ),
  },
  {
    id: "spotlight",
    title: "Spotlight",
    subtitle: "Cinematic intro lighting",
    cover: "linear-gradient(135deg,#6366f1,#0e7490)",
    content: <p>A one-time sweep of light on load. It stays static afterwards.</p>,
  },
];

export default function ExpandableCardDemo() {
  return (
    <ExpandableCards
      items={items.map((i) => ({
        ...i,
        cta: (
          <Button size="sm" className="rounded-full">
            Install
          </Button>
        ),
      }))}
    />
  );
}
