import Image from "next/image";
import { Marquee } from "@/components/animated/marquee";
import { SectionHeading } from "@/components/site/landing/reveal";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Photo URL. Currently free-licence Unsplash stock portraits standing in for real customers. */
  avatar?: string;
};

// PLACEHOLDER testimonials. Every name, role and quote below is fake and must be
// replaced with real quotes (and, optionally, `avatar` photos) from real users.
const featured: Testimonial = {
  quote:
    "We replaced half of our design system in a single weekend. The token setup just works, in both themes, and the components read like code we would have written ourselves.",
  name: "Placeholder Name",
  role: "Staff Engineer, Example Co",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The animated components feel expensive without being heavy. Our landing page finally looks like the product.",
    name: "Sample Person",
    role: "Founder, Demo Labs",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote: "Owning the code means we never wait on a library release again.",
    name: "Test User",
    role: "Design Lead, Acme",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote:
      "Accessibility out of the box saved us a full audit cycle. Keyboard support is genuinely complete.",
    name: "Jane Placeholder",
    role: "Frontend Lead, Sample Inc",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote: "Dark mode and light mode both look intentional. That is rare.",
    name: "Alex Sample",
    role: "Engineer, Example Corp",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote: "The docs are the best I have used for a UI library. Every prop is documented.",
    name: "Jordan Demo",
    role: "Designer, Placeholder Studio",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote: "It looks like we hired an agency. We did not.",
    name: "Morgan Example",
    role: "CEO, Sample Startup",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote: "Install, tweak two tokens, ship. The defaults are that good.",
    name: "Riley Test",
    role: "Developer, Demo Inc",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote: "Motion that respects reduced-motion settings. Finally someone thought about it.",
    name: "Casey Placeholder",
    role: "Accessibility Lead, Example Org",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote: "We shipped our mobile app and web dashboard from one design language.",
    name: "Taylor Sample",
    role: "CTO, Placeholder Health",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=faces",
  },
];

// Open-source illustrated avatars (DiceBear "Notionists", CC0), seeded by name.
const tints = ["dbeafe", "e0e7ff", "fef3c7", "dcfce7", "fce7f3", "e0f2fe", "f5f5f4"];
function illustratedAvatar(name: string) {
  const tint = tints[[...name].reduce((n, c) => n + c.charCodeAt(0), 0) % tints.length];
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(name)}&backgroundColor=${tint}`;
}

function Avatar({ t, size = 40 }: { t: Testimonial; size?: number }) {
  if (t.avatar) {
    return (
      <Image
        src={t.avatar}
        alt={t.name}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover ring-1 ring-border"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote SVG avatar
    <img
      src={illustratedAvatar(t.name)}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className="shrink-0 rounded-full ring-1 ring-border"
      style={{ width: size, height: size }}
    />
  );
}

function Person({ t, size }: { t: Testimonial; size?: number }) {
  return (
    <figcaption className="flex items-center gap-3">
      <Avatar t={t} size={size} />
      <span className="grid">
        <span className="text-sm font-medium">{t.name}</span>
        <span className="text-[13px] text-muted-foreground">{t.role}</span>
      </span>
    </figcaption>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="rounded-2xl border border-border bg-background p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <blockquote className="text-[15px] leading-7 text-foreground/85">{t.quote}</blockquote>
      <div className="mt-6">
        <Person t={t} />
      </div>
    </figure>
  );
}

export function Testimonials() {
  const columns = [testimonials.slice(0, 3), testimonials.slice(3, 6), testimonials.slice(6, 9)];
  return (
    <section className="py-20 sm:py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by teams <span className="text-muted-foreground">who care about craft.</span>
            </>
          }
          description="Placeholder quotes for now. Replace them with real ones."
        />

        {/* Featured quote */}
        <figure className="mx-auto mt-14 max-w-4xl text-center sm:mt-16">
          <span aria-hidden="true" className="font-serif text-6xl leading-none text-brand/30">
            &ldquo;
          </span>
          <blockquote className="mt-2 text-[clamp(1.25rem,1rem+1.1vw,1.875rem)] leading-[1.4] font-medium tracking-[-0.02em] text-balance">
            {featured.quote}
          </blockquote>
          <div className="mt-8 flex justify-center">
            <Person t={featured} size={44} />
          </div>
        </figure>

        <div className="relative mx-auto mt-16 grid h-[560px] max-w-6xl gap-4 overflow-hidden mask-edge-fade-y md:grid-cols-2 lg:grid-cols-3">
          {columns.map((col, i) => (
            <Marquee
              key={i}
              vertical
              fade={false}
              reverse={i === 1}
              duration={[40, 48, 44][i]}
              className={cn(i === 1 && "hidden md:flex", i === 2 && "hidden lg:flex")}
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
