import { InfiniteMovingCards } from "@/components/animated/infinite-moving-cards";

// Placeholder testimonials. Replace with real quotes.
const items = [
  {
    quote: "We replaced half our design system in a weekend. The tokens just work.",
    name: "Placeholder Name",
    title: "Staff Engineer, Example Co",
  },
  {
    quote: "The animated components feel expensive without being heavy.",
    name: "Sample Person",
    title: "Founder, Demo Labs",
  },
  {
    quote: "Copy, paste, ship. Our landing page went from bland to premium.",
    name: "Test User",
    title: "Design Lead, Acme",
  },
  {
    quote: "Accessibility out of the box saved us a full audit cycle.",
    name: "Jane Placeholder",
    title: "Frontend Lead, Sample Inc",
  },
];

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="w-full max-w-4xl">
      <InfiniteMovingCards items={items} speed="slow" />
    </div>
  );
}
