import { ParallaxScroll } from "@/components/animated/parallax-scroll";

const palette = [
  "#0e7490",
  "#1d4ed8",
  "#4338ca",
  "#0891b2",
  "#2563eb",
  "#4f46e5",
  "#0369a1",
  "#3b82f6",
  "#6366f1",
];
const items = Array.from({ length: 15 }).map((_, i) => {
  const a = palette[i % palette.length];
  const b = palette[(i + 3) % palette.length];
  return `linear-gradient(${(i * 47) % 360}deg, ${a}, ${b})`;
});

export default function ParallaxScrollDemo() {
  return <ParallaxScroll items={items} className="border border-border" />;
}
