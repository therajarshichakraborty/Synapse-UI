import type { DocMeta } from "./types";

const block = (name: string, component: string, height: number, notes?: string): DocMeta => ({
  name,
  iframe: true,
  height,
  usage: {
    imports: `import ${component} from "@/components/blocks/${name}";`,
    code: `export default function Page() {\n  return <${component} />;\n}`,
  },
  extra: [
    "## Customizing",
    "",
    "Blocks are plain components with their copy and data inline. After installing, edit the file directly: replace the text, swap icons, and wire buttons to your routes.",
    notes ? `\n${notes}` : "",
  ].join("\n"),
});

export const blockDocs: DocMeta[] = [
  block("hero-spotlight", "HeroSpotlight", 640),
  block("hero-split", "HeroSplit", 720),
  block(
    "hero-product",
    "HeroProduct",
    900,
    "Replace the placeholder window contents with a real screenshot or `<video>`.",
  ),
  block("feature-grid", "FeatureGrid", 760),
  block(
    "pricing-table",
    "PricingTable",
    820,
    "The yearly toggle applies a 20% discount. Change the multiplier in the component to match your pricing.",
  ),
  block(
    "testimonial-wall",
    "TestimonialWall",
    620,
    "**The testimonials are placeholders.** Replace them with real customer quotes before shipping.",
  ),
  block("faq-section", "FaqSection", 620),
  block("cta-panel", "CtaPanel", 560),
  block("site-footer", "SiteFooter", 560),
  block("login-page", "LoginPage", 720),
  block(
    "signup-page",
    "SignupPage",
    760,
    "Validation uses Zod through the [Form](/docs/components/form) component.",
  ),
  block(
    "dashboard-shell",
    "DashboardShell",
    720,
    "Built on [Sidebar](/docs/components/sidebar) and [Chart](/docs/components/chart). Press `⌘B` to collapse the sidebar.",
  ),
];
