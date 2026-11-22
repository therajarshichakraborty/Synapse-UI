import {
  InfiniteMovingCards,
  type MovingCardItem,
} from "@/components/animated/infinite-moving-cards";

// PLACEHOLDER testimonials. Replace with real customer quotes before shipping.
const rowA: MovingCardItem[] = [
  {
    quote: "The fastest way we have found to ship a polished UI.",
    name: "Placeholder Name",
    title: "CTO, Example Co",
  },
  {
    quote: "Our design and engineering teams finally speak the same language.",
    name: "Sample Person",
    title: "Head of Design, Demo Labs",
  },
  {
    quote: "Dark mode and light mode both look intentional. That is rare.",
    name: "Test User",
    title: "Founder, Acme",
  },
  {
    quote: "We rebuilt our marketing site in three days.",
    name: "Jane Placeholder",
    title: "Growth Lead, Sample Inc",
  },
];
const rowB: MovingCardItem[] = [
  {
    quote: "Accessibility details we would have missed are already handled.",
    name: "Alex Sample",
    title: "Frontend Engineer, Example Corp",
  },
  {
    quote: "The animated components are tasteful, not gimmicky.",
    name: "Jordan Demo",
    title: "Product Designer, Placeholder Studio",
  },
  {
    quote: "Owning the code means we never wait on a library release.",
    name: "Riley Test",
    title: "Staff Engineer, Demo Inc",
  },
  {
    quote: "It looks like we hired a design agency.",
    name: "Morgan Example",
    title: "CEO, Sample Startup",
  },
];

export default function TestimonialWall() {
  return (
    <section className="overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-h2 font-semibold">Loved by builders</h2>
        <p className="mt-4 text-body-lg text-muted-foreground">
          Placeholder quotes. Replace with your own customers.
        </p>
      </div>
      <div className="mt-14 grid gap-4">
        <InfiniteMovingCards items={rowA} speed="slow" />
        <InfiniteMovingCards items={rowB} speed="slow" direction="right" />
      </div>
    </section>
  );
}
