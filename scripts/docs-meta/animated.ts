import type { DocMeta, PropTuple } from "./types";

const cls: PropTuple = ["className", "string", undefined, "Additional classes merged with cn()."];
const imp = (names: string, file: string) =>
  `import { ${names} } from "@/components/animated/${file}";`;
const full = "p-0 sm:p-0";
const reduced = (what: string) => ({ notes: `With \`prefers-reduced-motion: reduce\`, ${what}` });

export const animatedDocs: DocMeta[] = [
  {
    name: "spotlight",
    previewClassName: full,
    usage: {
      imports: imp("Spotlight", "spotlight"),
      code: `<section className="relative overflow-hidden">
  <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />
  <h1>Your headline</h1>
</section>`,
    },
    api: [
      {
        name: "Spotlight",
        props: [["fill", "string", '"var(--color-glow-blue)"', "Beam color."], cls],
      },
    ],
    a11y: {
      notes:
        "The SVG is decorative (`aria-hidden`). With reduced motion, the beam appears in place with no sweep.",
    },
  },
  {
    name: "background-beams",
    previewClassName: full,
    usage: {
      imports: imp("BackgroundBeams", "background-beams"),
      code: `<div className="relative">\n  <BackgroundBeams />\n  {/* content */}\n</div>`,
    },
    api: [
      {
        name: "BackgroundBeams",
        props: [["count", "number", "10", "Number of beam paths (max 14)."], cls],
      },
    ],
    a11y: reduced("only the static path lines render. No beams travel."),
  },
  {
    name: "grid-background",
    usage: {
      imports: imp("GridBackground", "grid-background"),
      code: `<div className="relative">\n  <GridBackground variant="dots" fade="top" />\n</div>`,
    },
    api: [
      {
        name: "GridBackground",
        props: [
          ["variant", '"grid" | "dots"', '"grid"', "Pattern type."],
          ["size", "number", "56 / 18", "Cell or dot spacing in px."],
          ["fade", '"center" | "top" | "none"', '"center"', "Radial fade mask."],
          cls,
        ],
      },
    ],
    extra:
      "The same patterns are available as utilities: `bg-grid`, `bg-dots`, `mask-radial-fade` and `mask-top-fade`. The line and dot colors come from the `--grid-line` and `--dot-color` tokens.",
  },
  {
    name: "aurora-background",
    previewClassName: full,
    usage: {
      imports: imp("AuroraBackground", "aurora-background"),
      code: `<AuroraBackground className="h-screen">\n  <h1>Hello</h1>\n</AuroraBackground>`,
    },
    api: [
      {
        name: "AuroraBackground",
        props: [
          ["radial", "boolean", "true", "Fade the aurora toward the top-right corner."],
          ["children", "ReactNode", undefined, "Content on top."],
          cls,
        ],
      },
    ],
    a11y: reduced("the aurora is static."),
  },
  {
    name: "meteors",
    usage: {
      imports: imp("Meteors", "meteors"),
      code: `<div className="relative overflow-hidden">\n  <Meteors number={20} />\n</div>`,
    },
    api: [
      {
        name: "Meteors",
        props: [
          ["number", "number", "18", "Number of meteors."],
          ["className", "string", undefined, "Classes for each meteor."],
        ],
      },
    ],
    a11y: reduced("meteors are hidden."),
  },
  {
    name: "sparkles",
    previewClassName: full,
    usage: {
      imports: imp("Sparkles", "sparkles"),
      code: `<div className="relative h-40">\n  <Sparkles density={10} color="#93c5fd" />\n</div>`,
    },
    api: [
      {
        name: "Sparkles",
        props: [
          ["density", "number", "6", "Particles per 10,000 px²."],
          ["color", "string", '"#93c5fd"', "Particle color."],
          ["minSize / maxSize", "number", "0.4 / 1.4", "Particle radius range."],
          ["speed", "number", "0.25", "Drift speed."],
          cls,
        ],
      },
    ],
    a11y: reduced("a single still frame is drawn and the animation loop never starts."),
  },
  {
    name: "glowing-card",
    usage: {
      imports: imp("GlowingCard", "glowing-card"),
      code: `<GlowingCard>\n  <h3>Edge functions</h3>\n</GlowingCard>`,
    },
    api: [
      {
        name: "GlowingCard",
        props: [
          ["duration", "number", "6", "Seconds per rotation."],
          ["glow", "boolean", "true", "Soft glow behind the card."],
          cls,
        ],
      },
    ],
    extra: "The effect is the `border-beam` utility. Add it to any element with a border radius.",
  },
  {
    name: "moving-border-button",
    usage: {
      imports: imp("MovingBorderButton", "moving-border-button"),
      code: `<MovingBorderButton>Book a demo</MovingBorderButton>`,
    },
    api: [
      {
        name: "MovingBorderButton",
        props: [
          ["duration", "number", "4", "Seconds per lap."],
          ["asChild", "boolean", "false", "Render a link or other element."],
          ["containerClassName", "string", undefined, "Classes for the outer border wrapper."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        "A native button with a visible focus ring. With reduced motion, the light stays still.",
      keys: [["Space / Enter", "Activates the button."]],
    },
  },
  {
    name: "tilt-card",
    usage: { imports: imp("TiltCard", "tilt-card"), code: `<TiltCard max={10}>...</TiltCard>` },
    api: [
      {
        name: "TiltCard",
        props: [
          ["max", "number", "12", "Maximum tilt in degrees."],
          ["glare", "boolean", "true", "Show the glare highlight."],
          cls,
        ],
      },
    ],
    a11y: reduced("the card stays flat."),
  },
  {
    name: "card-spotlight",
    usage: {
      imports: imp("CardSpotlight", "card-spotlight"),
      code: `<CardSpotlight>\n  <h3>Title</h3>\n</CardSpotlight>`,
    },
    api: [
      {
        name: "CardSpotlight",
        props: [
          ["radius", "number", "320", "Light radius in px."],
          ["color", "string", '"rgb(59 130 246 / 0.15)"', "Glow color."],
          cls,
        ],
      },
    ],
  },
  {
    name: "bento-grid",
    usage: {
      imports: imp("BentoCard, BentoGrid", "bento-grid"),
      code: `<BentoGrid>
  <BentoCard className="md:col-span-2" title="AI" description="..." icon={<SparklesIcon />} header={<Visual />} />
  <BentoCard title="Secure" description="..." />
</BentoGrid>`,
    },
    api: [
      { name: "BentoGrid", props: [cls] },
      {
        name: "BentoCard",
        props: [
          ["title", "ReactNode", undefined, "Card title."],
          ["description", "ReactNode", undefined, "Supporting text."],
          ["icon", "ReactNode", undefined, "Icon above the title."],
          ["header", "ReactNode", undefined, "Visual area at the top."],
          cls,
        ],
      },
    ],
  },
  {
    name: "infinite-moving-cards",
    usage: {
      imports: imp("InfiniteMovingCards", "infinite-moving-cards"),
      code: `<InfiniteMovingCards items={testimonials} direction="right" speed="slow" />`,
    },
    api: [
      {
        name: "InfiniteMovingCards",
        props: [
          ["items", "{ quote, name, title, avatar? }[]", undefined, "Cards to render."],
          ["direction", '"left" | "right"', '"left"', "Scroll direction."],
          ["speed", '"fast" | "normal" | "slow"', '"normal"', "Loop speed."],
          ["pauseOnHover", "boolean", "true", "Pause while hovered."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        "Duplicate copies of the content are `aria-hidden`, so screen readers read each card once. With reduced motion, the cards do not move.",
    },
  },
  {
    name: "marquee",
    usage: {
      imports: imp("Marquee", "marquee"),
      code: `<Marquee pauseOnHover duration={30}>\n  {logos}\n</Marquee>`,
    },
    examples: [{ name: "marquee-vertical", title: "Vertical" }],
    api: [
      {
        name: "Marquee",
        props: [
          ["reverse", "boolean", "false", "Reverse direction."],
          ["vertical", "boolean", "false", "Scroll vertically."],
          ["pauseOnHover", "boolean", "true", "Pause while hovered."],
          ["duration", "number", "40", "Seconds per loop."],
          ["gap", "string", '"1rem"', "Gap between items."],
          ["repeat", "number", "2", "Copies of the content."],
          ["fade", "boolean", "true", "Fade the edges."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        "Only the first copy is exposed to assistive technology. Reduced motion stops the animation.",
    },
  },
  {
    name: "text-generate-effect",
    usage: {
      imports: imp("TextGenerateEffect", "text-generate-effect"),
      code: `<TextGenerateEffect words="Build interfaces that feel alive." />`,
    },
    api: [
      {
        name: "TextGenerateEffect",
        props: [
          ["words", "string", undefined, "Text to reveal."],
          ["duration", "number", "0.5", "Seconds per word."],
          ["blur", "boolean", "true", "Un-blur while revealing."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        "The full sentence is set as `aria-label`, so it is read in one go. With reduced motion, the text appears immediately.",
    },
  },
  {
    name: "typewriter",
    usage: {
      imports: imp("Typewriter", "typewriter"),
      code: `<Typewriter words={["dashboards", "landing pages"]} />`,
    },
    api: [
      {
        name: "Typewriter",
        props: [
          ["words", "string[]", undefined, "Words to type."],
          ["typeSpeed / deleteSpeed", "number", "70 / 40", "Milliseconds per character."],
          ["pause", "number", "1400", "Pause on a full word, in ms."],
          ["loop", "boolean", "true", "Loop forever."],
          ["caretClassName", "string", undefined, "Classes for the caret."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        "Screen readers get every word once, from a visually hidden list. With reduced motion, the first word is shown statically.",
    },
  },
  {
    name: "flip-words",
    usage: {
      imports: imp("FlipWords", "flip-words"),
      code: `Build <FlipWords words={["better", "faster", "modern"]} /> websites`,
    },
    api: [
      {
        name: "FlipWords",
        props: [
          ["words", "string[]", undefined, "Words to cycle."],
          ["interval", "number", "2600", "Milliseconds per word."],
          cls,
        ],
      },
    ],
    a11y: reduced("the first word stays in place."),
  },
  {
    name: "gradient-text",
    usage: {
      imports: imp("GradientText", "gradient-text"),
      code: `<GradientText>Ship something brilliant</GradientText>`,
    },
    api: [
      {
        name: "GradientText",
        props: [
          ["animate", "boolean", "true", "Animate the gradient."],
          ["duration", "number", "6", "Seconds per cycle."],
          ["colors", "string[]", "brand", "Gradient stops."],
          cls,
        ],
      },
    ],
    extra: "For a static gradient with no component, use the `text-gradient` utility.",
  },
  {
    name: "number-ticker",
    usage: {
      imports: imp("NumberTicker", "number-ticker"),
      code: `<NumberTicker value={12840} />`,
    },
    api: [
      {
        name: "NumberTicker",
        props: [
          ["value", "number", undefined, "Target value."],
          ["from", "number", "0", "Start value."],
          ["decimals", "number", "0", "Fraction digits."],
          ["delay", "number", "0", "Seconds after entering view."],
          ["prefix / suffix", "string", '""', "Text around the number."],
          ["locale", "string", '"en-US"', "Number format locale."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        "The final value is exposed as `aria-label`, so intermediate numbers are never announced. With reduced motion, it jumps to the value.",
    },
  },
  {
    name: "animated-tabs",
    usage: {
      imports: imp("AnimatedTabs", "animated-tabs"),
      code: `<AnimatedTabs
  tabs={[
    { value: "a", label: "Product", content: <Panel /> },
    { value: "b", label: "Services", content: <Panel /> },
  ]}
/>`,
    },
    examples: [{ name: "animated-tabs-underline", title: "Underline, controlled" }],
    api: [
      {
        name: "AnimatedTabs",
        props: [
          ["tabs", "{ value, label, content? }[]", undefined, "Tabs to render."],
          ["value / defaultValue", "string", undefined, "Active tab."],
          ["onValueChange", "(value: string) => void", undefined, "Called on change."],
          ["variant", '"pill" | "underline"', '"pill"', "Indicator style."],
          ["listClassName", "string", undefined, "Classes for the tab list."],
          cls,
        ],
      },
    ],
    a11y: {
      keys: [
        ["ArrowRight / ArrowLeft", "Moves to and activates the next or previous tab."],
        ["Home / End", "Moves to the first or last tab."],
        ["Tab", "Moves focus into the panel."],
      ],
    },
  },
  {
    name: "floating-dock",
    usage: {
      imports: imp("FloatingDock", "floating-dock"),
      code: `<FloatingDock items={[{ title: "Home", icon: <HomeIcon />, href: "/" }]} />`,
    },
    api: [
      {
        name: "FloatingDock",
        props: [
          ["items", "{ title, icon, href?, onClick? }[]", undefined, "Dock items."],
          ["size", "number", "40", "Base tile size in px."],
          ["magnification", "number", "64", "Magnified tile size in px."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        "Each item is a link or button labelled by its title, and the title shows on focus too. With reduced motion, items do not magnify.",
    },
  },
  {
    name: "floating-navbar",
    usage: {
      imports: imp("FloatingNavbar", "floating-navbar"),
      code: `<FloatingNavbar items={[{ name: "Home", href: "/" }]} action={<Button>Login</Button>} />`,
    },
    api: [
      {
        name: "FloatingNavbar",
        props: [
          ["items", "{ name, href, icon? }[]", undefined, "Links. Icons replace labels on mobile."],
          ["action", "ReactNode", undefined, "Trailing element, such as a button."],
          ["alwaysVisible", "boolean", "false", "Never hide on scroll."],
          [
            "container",
            "RefObject<HTMLElement>",
            undefined,
            "Scroll container (defaults to window).",
          ],
          cls,
        ],
      },
    ],
  },
  {
    name: "timeline",
    align: "start",
    usage: {
      imports: imp("Timeline", "timeline"),
      code: `<Timeline data={[{ title: "2026", content: <p>Launched v2</p> }]} />`,
    },
    api: [
      {
        name: "Timeline",
        props: [
          ["data", "{ title: string; content: ReactNode }[]", undefined, "Entries, newest first."],
          cls,
        ],
      },
    ],
    a11y: { notes: "Rendered as an ordered list. The progress beam is decorative." },
  },
  {
    name: "tracing-beam",
    align: "start",
    usage: {
      imports: imp("TracingBeam", "tracing-beam"),
      code: `<TracingBeam>\n  <article>...</article>\n</TracingBeam>`,
    },
    api: [
      {
        name: "TracingBeam",
        props: [["children", "ReactNode", undefined, "Long-form content."], cls],
      },
    ],
    a11y: reduced("only the static track is shown."),
  },
  {
    name: "lamp-effect",
    previewClassName: full,
    usage: {
      imports: imp("LampEffect", "lamp-effect"),
      code: `<LampEffect>\n  <h1>Build lamps the right way</h1>\n</LampEffect>`,
    },
    api: [
      {
        name: "LampEffect",
        props: [["children", "ReactNode", undefined, "Content lit by the lamp."], cls],
      },
    ],
  },
  {
    name: "shimmer-button",
    usage: {
      imports: imp("ShimmerButton", "shimmer-button"),
      code: `<ShimmerButton>Upgrade to Pro</ShimmerButton>`,
    },
    api: [
      {
        name: "ShimmerButton",
        props: [
          ["duration", "number", "2.4", "Seconds per sweep."],
          ["asChild", "boolean", "false", "Render a link or other element."],
          cls,
        ],
      },
    ],
    a11y: { keys: [["Space / Enter", "Activates the button."]] },
  },
  {
    name: "animated-tooltip",
    usage: {
      imports: imp("AnimatedTooltip", "animated-tooltip"),
      code: `<AnimatedTooltip items={[{ id: 1, name: "Ada", designation: "Engineer", image: "/ada.png" }]} />`,
    },
    api: [
      {
        name: "AnimatedTooltip",
        props: [
          ["items", "{ id, name, designation, image? }[]", undefined, "People to render."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        "Each avatar is a focusable button labelled with the person's name and role. Tooltips open on focus too.",
    },
  },
  {
    name: "expandable-card",
    usage: {
      imports: imp("ExpandableCards", "expandable-card"),
      code: `<ExpandableCards items={[{ id: "a", title: "Aurora", subtitle: "...", cover: "linear-gradient(...)", content: <p>...</p> }]} />`,
    },
    api: [
      {
        name: "ExpandableCards",
        props: [
          [
            "items",
            "{ id, title, subtitle, cover, content, cta? }[]",
            undefined,
            "Cards to render.",
          ],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        'The expanded card is a modal with `role="dialog"`. It locks body scroll and returns focus to the card that opened it.',
      keys: [
        ["Enter / Space", "Opens the focused card."],
        ["Esc", "Closes the expanded card."],
      ],
    },
  },
  {
    name: "parallax-scroll",
    usage: {
      imports: imp("ParallaxScroll", "parallax-scroll"),
      code: `<ParallaxScroll items={["url(/1.jpg) center/cover", "linear-gradient(...)"]} />`,
    },
    api: [
      {
        name: "ParallaxScroll",
        props: [
          ["items", "string[]", undefined, "CSS backgrounds for each tile."],
          ["height", "string", '"32rem"', "Scroll container height."],
          cls,
        ],
      },
    ],
  },
  {
    name: "terminal",
    usage: {
      imports: imp("Terminal", "terminal"),
      code: `<Terminal
  lines={[
    { type: "command", text: "npx synapseui add button" },
    { type: "output", text: "✔ Done", tone: "success" },
  ]}
/>`,
    },
    api: [
      {
        name: "Terminal",
        props: [
          ["lines", "TerminalLine[]", undefined, "Commands (typed) and output lines (streamed)."],
          ["title", "string", '"Terminal"', "Window title."],
          ["typeSpeed", "number", "38", "Milliseconds per character."],
          ["lineDelay", "number", "280", "Milliseconds between output lines."],
          ["loop", "boolean", "false", "Replay each time it scrolls into view."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        "The full transcript is available to screen readers at once. With reduced motion, every line appears immediately.",
    },
  },
  {
    name: "code-block",
    usage: {
      imports: imp("CodeBlock", "code-block"),
      code: `<CodeBlock files={[{ name: "page.tsx", code }]} highlight={[3]} />`,
    },
    api: [
      {
        name: "CodeBlock",
        props: [
          ["files", "{ name, code, language? }[]", undefined, "One tab per file."],
          ["highlight", "number[]", "[]", "1-based lines to highlight."],
          ["showLineNumbers", "boolean", "true", "Show line numbers."],
          cls,
        ],
      },
    ],
    extra:
      "This is a dependency-free client component for marketing pages. For docs, use the build-time Shiki pipeline instead.",
  },
  {
    name: "dotted-world-map",
    usage: {
      imports: imp("DottedWorldMap", "dotted-world-map"),
      code: `<DottedWorldMap connections={[{ from: { lat: 37.77, lng: -122.42 }, to: { lat: 51.5, lng: -0.12 } }]} />`,
    },
    api: [
      {
        name: "DottedWorldMap",
        props: [
          ["connections", "{ from: MapPoint; to: MapPoint }[]", "[]", "Arcs to draw."],
          ["dotColor", "string", '"var(--dot-color)"', "Land dot color."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        "Rendered as one labelled image. With reduced motion, arcs appear fully drawn and points do not pulse.",
    },
  },
];
