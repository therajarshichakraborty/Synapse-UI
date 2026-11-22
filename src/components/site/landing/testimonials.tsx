import { Marquee } from "@/components/animated/marquee";
import { SectionHeading } from "@/components/site/landing/reveal";

type Testimonial = { quote: string; name: string; role: string };

// PLACEHOLDER testimonials. Every name, role and quote below is fake and must be replaced.
const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced half of our design system in a single weekend. The token setup just works, in both themes.",
    name: "Placeholder Name",
    role: "Staff Engineer, Example Co",
  },
  {
    quote:
      "The animated components feel expensive without being heavy. Our landing page finally looks like the product.",
    name: "Sample Person",
    role: "Founder, Demo Labs",
  },
  {
    quote: "Owning the code means we never wait on a library release again.",
    name: "Test User",
    role: "Design Lead, Acme",
  },
  {
    quote:
      "Accessibility out of the box saved us a full audit cycle. Keyboard support is genuinely complete.",
    name: "Jane Placeholder",
    role: "Frontend Lead, Sample Inc",
  },
  {
    quote: "Dark mode and light mode both look intentional. That is rare.",
    name: "Alex Sample",
    role: "Engineer, Example Corp",
  },
  {
    quote: "The docs are the best I have used for a UI library. Every prop is documented.",
    name: "Jordan Demo",
    role: "Designer, Placeholder Studio",
  },
  {
    quote: "It looks like we hired an agency. We did not.",
    name: "Morgan Example",
    role: "CEO, Sample Startup",
  },
  {
    quote: "Install, tweak two tokens, ship. The defaults are that good.",
    name: "Riley Test",
    role: "Developer, Demo Inc",
  },
  {
    quote: "Motion that respects reduced-motion settings. Finally someone thought about it.",
    name: "Casey Placeholder",
    role: "Accessibility Lead, Example Org",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="rounded-2xl surface-premium p-6">
      <blockquote className="text-[15px] leading-relaxed text-foreground/90">{t.quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold">
          {initials(t.name)}
        </span>
        <span className="grid">
          <span className="text-sm font-medium">{t.name}</span>
          <span className="text-xs text-muted-foreground">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const columns = [testimonials.slice(0, 3), testimonials.slice(3, 6), testimonials.slice(6, 9)];
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by teams who care about craft"
          description="Placeholder quotes for now. Replace them with real ones."
        />
        <div className="relative mx-auto mt-16 grid h-[640px] max-w-6xl gap-4 overflow-hidden mask-edge-fade-y md:grid-cols-2 lg:grid-cols-3">
          {columns.map((col, i) => (
            <Marquee
              key={i}
              vertical
              fade={false}
              reverse={i === 1}
              duration={[38, 46, 42][i]}
              className={i === 1 ? "hidden md:flex" : i === 2 ? "hidden lg:flex" : undefined}
            >
              {col.map((t) => (
                <Card key={t.name} t={t} />
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  );
}
