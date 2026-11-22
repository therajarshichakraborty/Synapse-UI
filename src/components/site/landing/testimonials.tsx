import {
  InfiniteMovingCards,
  type MovingCardItem,
} from "@/components/animated/infinite-moving-cards";
import { SectionHeading } from "@/components/site/landing/reveal";

// PLACEHOLDER testimonials. Every name, title and quote below is fake and must be replaced.
const rowA: MovingCardItem[] = [
  {
    quote: "Placeholder: we replaced half our design system in a weekend.",
    name: "Placeholder Name",
    title: "Staff Engineer, Example Co",
  },
  {
    quote: "Placeholder: the animated components feel premium without being heavy.",
    name: "Sample Person",
    title: "Founder, Demo Labs",
  },
  {
    quote: "Placeholder: our landing page went from bland to funded-startup polish.",
    name: "Test User",
    title: "Design Lead, Acme",
  },
  {
    quote: "Placeholder: accessibility out of the box saved us an audit cycle.",
    name: "Jane Placeholder",
    title: "Frontend Lead, Sample Inc",
  },
];
const rowB: MovingCardItem[] = [
  {
    quote: "Placeholder: owning the code means we never wait on a release.",
    name: "Alex Sample",
    title: "Engineer, Example Corp",
  },
  {
    quote: "Placeholder: dark and light both look intentional. That is rare.",
    name: "Jordan Demo",
    title: "Designer, Placeholder Studio",
  },
  {
    quote: "Placeholder: the docs are the best I have used for a UI library.",
    name: "Riley Test",
    title: "Developer, Demo Inc",
  },
  {
    quote: "Placeholder: it looks like we hired an agency.",
    name: "Morgan Example",
    title: "CEO, Sample Startup",
  },
];

export function Testimonials() {
  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by teams who ship"
          description="Placeholder testimonials. Replace these with real quotes."
        />
      </div>
      <div className="mt-14 grid gap-4">
        <InfiniteMovingCards items={rowA} speed="slow" />
        <InfiniteMovingCards items={rowB} speed="slow" direction="right" />
      </div>
    </section>
  );
}
