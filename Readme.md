<div align="center">

<a href="https://synapse-ui.vercel.app">
  <img src=".github/assets/logo.svg" alt="Synapse UI" width="64" height="64" />
</a>

<h1>Synapse UI</h1>

<p><strong>Beautiful, accessible React components and refined motion.<br />Copy them into your project. Own every line.</strong></p>

<p>
  <a href="https://synapse-ui.vercel.app/docs">Documentation</a> ·
  <a href="https://synapse-ui.vercel.app/docs/components">Components</a> ·
  <a href="https://synapse-ui.vercel.app/docs/animated">Animated</a> ·
  <a href="https://synapse-ui.vercel.app/docs/blocks">Blocks</a> ·
  <a href="https://synapse-ui.vercel.app/docs/changelog">Changelog</a>
</p>

<p>
  <a href="https://github.com/therajarshichakraborty/Synapse-UI/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/therajarshichakraborty/Synapse-UI?style=flat&logo=github&color=171717&labelColor=fafafa&logoColor=171717" /></a>
  <a href="./LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-171717?style=flat&labelColor=fafafa" /></a>
  <img alt="Components" src="https://img.shields.io/badge/components-96-171717?style=flat&labelColor=fafafa" />
  <img alt="TypeScript strict" src="https://img.shields.io/badge/TypeScript-strict-171717?style=flat&logo=typescript&labelColor=fafafa&logoColor=3178C6" />
</p>

<br />

<img src=".github/assets/hero.png" alt="Synapse UI landing page in light mode" width="100%" />

</div>

<br />

## Overview

Synapse UI is a component library for React and Next.js that you **don't install as a dependency**. Each component is a single, readable TypeScript file that the CLI copies into your repository. You change it, theme it and ship it, and no upstream release can ever break your app.

It combines the structure and developer experience of [shadcn/ui](https://ui.shadcn.com) with the cinematic, motion-rich sections popularised by [Aceternity UI](https://ui.aceternity.com), in one calm, monochrome design system that works just as well in light and dark.

- **53 core components.** A complete, shadcn-compatible set from Accordion to Tooltip, built on Radix primitives.
- **31 animated components.** Spotlight, Aurora, Marquee, Number Ticker, Floating Dock, Timeline and more. Every one respects `prefers-reduced-motion`.
- **12 blocks.** Heroes, features, pricing, testimonials, FAQ, auth pages and a full dashboard shell.
- **~200 collection variants.** Hand-crafted alerts, buttons, cards, inputs, AI chat inputs and more.

## Contents

- [Why Synapse UI](#why-synapse-ui)
- [Preview](#preview)
- [Quick start](#quick-start)
- [Usage](#usage)
- [Theming](#theming)
- [Tech stack](#tech-stack)
- [Component catalog](#component-catalog)
- [Local development](#local-development)
- [Project structure](#project-structure)
- [Adding a component](#adding-a-component)
- [Accessibility and performance](#accessibility-and-performance)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Why Synapse UI

<img src=".github/assets/features.png" alt="Feature overview: theming, accessibility, code ownership, motion, dark mode, TypeScript and CLI" width="100%" />

|                                      |                                                                                                                                         |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **You own the code**                 | Components land in `components/ui`, `components/animated` and `components/blocks`. No black boxes, no version lock-in.                  |
| **Tokens, not hardcoded colors**     | Every surface reads a semantic CSS variable (`--background`, `--primary`, `--muted-foreground` and so on). Rebrand by editing one file. |
| **Accessible by default**            | Radix UI primitives give correct ARIA, focus management and full keyboard support. Every docs page lists its keyboard interactions.     |
| **Motion with restraint**            | Ease-out curves, 150 to 400 ms in UI, longer only for hero reveals. Everything switches off for users who prefer reduced motion.        |
| **Light and dark, both first-class** | Two complete palettes, plus scoped `.light` / `.dark` subtrees for previews and marketing sections.                                     |
| **Typed end to end**                 | Strict TypeScript, `forwardRef`-compatible props and `cva` variants that autocomplete in your editor.                                   |
| **CLI that resolves dependencies**   | `npx synapse-ui add date-picker` also brings in `popover`, `calendar` and `button`, and installs the npm packages they need.            |

## Preview

All screenshots are taken from the production build in light mode.

<table>
  <tr>
    <td width="50%"><img src=".github/assets/docs.png" alt="Component documentation page with live preview and code" /></td>
    <td width="50%"><img src=".github/assets/dashboard.png" alt="Dashboard shell block with sidebar, stat cards and revenue chart" /></td>
  </tr>
  <tr>
    <td align="center"><sub><b>Docs.</b> Live preview, GitHub-themed code, install steps and props tables.</sub></td>
    <td align="center"><sub><b>Dashboard Shell block.</b> Sidebar, stat cards and a themed chart.</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src=".github/assets/showcase.png" alt="Live component showcase with animated components" /></td>
    <td width="50%"><img src=".github/assets/pricing.png" alt="Pricing section" /></td>
  </tr>
  <tr>
    <td align="center"><sub><b>Showcase.</b> Real components rendered live, not screenshots.</sub></td>
    <td align="center"><sub><b>Pricing.</b> Free and open source, forever.</sub></td>
  </tr>
</table>

<img src=".github/assets/faq.png" alt="FAQ section built with the Accordion component" width="100%" />

## Quick start

### 1. Initialize

Installs the base dependencies, adds the `cn()` helper and writes the design tokens into your global stylesheet.

```bash
npx synapse-ui@latest init
```

> [!NOTE]
> The `synapse-ui` CLI lives in [`packages/cli`](./packages/cli) and is not on npm yet. Until it is published, use the shadcn CLI command in the tip below, which works today.

### 2. Add components

```bash
npx synapse-ui@latest add button card dialog
npx synapse-ui@latest add spotlight marquee number-ticker
npx synapse-ui@latest add dashboard-shell
```

> [!TIP]
> Prefer the shadcn CLI? Every item is published in the shadcn registry format:
>
> ```bash
> npx shadcn@latest add https://synapse-ui.vercel.app/r/button.json
> ```
>
> Or register Synapse as a namespace in `components.json`:
>
> ```json
> { "registries": { "@synapse": "https://synapse-ui.vercel.app/r/{name}.json" } }
> ```

### Requirements

|              | Version                   |
| ------------ | ------------------------- |
| React        | 19 or later               |
| Tailwind CSS | v4                        |
| TypeScript   | 5 (recommended)           |
| Node.js      | 18 or later (for the CLI) |

## Usage

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/animated/number-ticker";

export default function Revenue() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Monthly revenue</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <NumberTicker value={48295} prefix="$" className="text-3xl font-semibold" />
        <Button size="sm" variant="secondary">
          Details
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Theming

Every color is a CSS variable, defined once for light and once for dark. Components only ever use semantic utilities such as `bg-primary`, `text-muted-foreground` and `border-border`.

```css
:root {
  --radius: 0.75rem;
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #171717;
  --primary-foreground: #fafafa;
  --muted-foreground: #737373;
  --border: #e8e8e8;
  --brand: #2563eb; /* the single accent, used sparingly */
}

.dark {
  --background: #0b0b0c;
  --foreground: #ededef;
  --primary: #ededef;
  --primary-foreground: #0b0b0c;
  --muted-foreground: #9b9ba1;
  --border: rgb(255 255 255 / 0.075);
  --brand: #3b82f6;
}
```

| Token group                                   | Purpose                               |
| --------------------------------------------- | ------------------------------------- |
| `background`, `foreground`                    | Page and default text                 |
| `surface-1` to `surface-3`, `card`, `popover` | Elevation levels                      |
| `primary`, `secondary`, `accent`, `muted`     | Actions, quiet surfaces, hover states |
| `destructive`, `success`, `warning`           | Status                                |
| `border`, `border-strong`, `input`, `ring`    | Hairlines, controls and focus         |
| `brand`                                       | The blue accent                       |
| `chart-1` to `chart-5`                        | Chart series                          |

Effect utilities ship with the tokens: `surface-premium`, `glass`, `border-beam`, `text-gradient`, `mask-edge-fade-x` and more. See the [theming guide](https://synapse-ui.vercel.app/docs/theming) and [dark mode guide](https://synapse-ui.vercel.app/docs/dark-mode).

## Tech stack

<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,bun,vercel&theme=light" alt="Next.js, React, TypeScript, Tailwind CSS, Bun, Vercel" />
</p>

| Layer           | Technology                                                                                                                                                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org) (App Router, React Server Components, static generation)                                                                                                                                                          |
| UI runtime      | [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org) (strict)                                                                                                                                                               |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com) with CSS-variable design tokens, [class-variance-authority](https://cva.style), [tailwind-merge](https://github.com/dcastil/tailwind-merge)                                                             |
| Primitives      | [Radix UI](https://www.radix-ui.com), [Base UI](https://base-ui.com) (Combobox), [cmdk](https://cmdk.paco.me), [Vaul](https://vaul.emilkowal.ski)                                                                                                  |
| Motion          | [Motion](https://motion.dev) (Framer Motion)                                                                                                                                                                                                       |
| Data and forms  | [TanStack Table](https://tanstack.com/table), [React Hook Form](https://react-hook-form.com), [Zod](https://zod.dev), [Recharts](https://recharts.org), [React DayPicker](https://daypicker.dev), [Embla Carousel](https://www.embla-carousel.com) |
| Docs            | [Fumadocs](https://fumadocs.dev) (MDX and search), [Shiki](https://shiki.style) with GitHub light and dark themes                                                                                                                                  |
| Icons and fonts | [Lucide](https://lucide.dev), [Geist and Geist Mono](https://vercel.com/font)                                                                                                                                                                      |
| Tooling         | [Bun](https://bun.sh), ESLint, Prettier                                                                                                                                                                                                            |

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img alt="Radix UI" src="https://img.shields.io/badge/Radix_UI-primitives-161618?style=flat-square&logo=radixui&logoColor=white" />
  <img alt="Motion" src="https://img.shields.io/badge/Motion-12-111111?style=flat-square&logo=framer&logoColor=white" />
  <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-compatible-000000?style=flat-square&logo=shadcnui&logoColor=white" />
  <img alt="Bun" src="https://img.shields.io/badge/Bun-1.x-000000?style=flat-square&logo=bun&logoColor=white" />
</p>

## Component catalog

<details open>
<summary><b>Core components</b> (53)</summary>
<br />

|                                                                            |                                                                            |                                                                              |                                                                                  |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [Accordion](https://synapse-ui.vercel.app/docs/components/accordion)       | [Alert](https://synapse-ui.vercel.app/docs/components/alert)               | [Alert Dialog](https://synapse-ui.vercel.app/docs/components/alert-dialog)   | [Aspect Ratio](https://synapse-ui.vercel.app/docs/components/aspect-ratio)       |
| [Avatar](https://synapse-ui.vercel.app/docs/components/avatar)             | [Badge](https://synapse-ui.vercel.app/docs/components/badge)               | [Breadcrumb](https://synapse-ui.vercel.app/docs/components/breadcrumb)       | [Button](https://synapse-ui.vercel.app/docs/components/button)                   |
| [Button Group](https://synapse-ui.vercel.app/docs/components/button-group) | [Calendar](https://synapse-ui.vercel.app/docs/components/calendar)         | [Card](https://synapse-ui.vercel.app/docs/components/card)                   | [Carousel](https://synapse-ui.vercel.app/docs/components/carousel)               |
| [Chart](https://synapse-ui.vercel.app/docs/components/chart)               | [Checkbox](https://synapse-ui.vercel.app/docs/components/checkbox)         | [Collapsible](https://synapse-ui.vercel.app/docs/components/collapsible)     | [Combobox](https://synapse-ui.vercel.app/docs/components/combobox)               |
| [Command](https://synapse-ui.vercel.app/docs/components/command)           | [Context Menu](https://synapse-ui.vercel.app/docs/components/context-menu) | [Data Table](https://synapse-ui.vercel.app/docs/components/data-table)       | [Date Picker](https://synapse-ui.vercel.app/docs/components/date-picker)         |
| [Dialog](https://synapse-ui.vercel.app/docs/components/dialog)             | [Drawer](https://synapse-ui.vercel.app/docs/components/drawer)             | [Dropdown Menu](https://synapse-ui.vercel.app/docs/components/dropdown-menu) | [Empty State](https://synapse-ui.vercel.app/docs/components/empty-state)         |
| [Form](https://synapse-ui.vercel.app/docs/components/form)                 | [Hover Card](https://synapse-ui.vercel.app/docs/components/hover-card)     | [Input](https://synapse-ui.vercel.app/docs/components/input)                 | [Input OTP](https://synapse-ui.vercel.app/docs/components/input-otp)             |
| [Kbd](https://synapse-ui.vercel.app/docs/components/kbd)                   | [Label](https://synapse-ui.vercel.app/docs/components/label)               | [Menubar](https://synapse-ui.vercel.app/docs/components/menubar)             | [Navigation Menu](https://synapse-ui.vercel.app/docs/components/navigation-menu) |
| [Pagination](https://synapse-ui.vercel.app/docs/components/pagination)     | [Popover](https://synapse-ui.vercel.app/docs/components/popover)           | [Progress](https://synapse-ui.vercel.app/docs/components/progress)           | [Radio Group](https://synapse-ui.vercel.app/docs/components/radio-group)         |
| [Resizable](https://synapse-ui.vercel.app/docs/components/resizable)       | [Scroll Area](https://synapse-ui.vercel.app/docs/components/scroll-area)   | [Select](https://synapse-ui.vercel.app/docs/components/select)               | [Separator](https://synapse-ui.vercel.app/docs/components/separator)             |
| [Sheet](https://synapse-ui.vercel.app/docs/components/sheet)               | [Sidebar](https://synapse-ui.vercel.app/docs/components/sidebar)           | [Skeleton](https://synapse-ui.vercel.app/docs/components/skeleton)           | [Slider](https://synapse-ui.vercel.app/docs/components/slider)                   |
| [Sonner](https://synapse-ui.vercel.app/docs/components/sonner)             | [Spinner](https://synapse-ui.vercel.app/docs/components/spinner)           | [Switch](https://synapse-ui.vercel.app/docs/components/switch)               | [Table](https://synapse-ui.vercel.app/docs/components/table)                     |
| [Tabs](https://synapse-ui.vercel.app/docs/components/tabs)                 | [Textarea](https://synapse-ui.vercel.app/docs/components/textarea)         | [Toggle](https://synapse-ui.vercel.app/docs/components/toggle)               | [Toggle Group](https://synapse-ui.vercel.app/docs/components/toggle-group)       |
| [Tooltip](https://synapse-ui.vercel.app/docs/components/tooltip)           |                                                                            |                                                                              |                                                                                  |

</details>

<details>
<summary><b>Animated components</b> (31)</summary>
<br />

|                                                                                |                                                                                          |                                                                                         |                                                                                            |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [Spotlight](https://synapse-ui.vercel.app/docs/animated/spotlight)             | [Background Beams](https://synapse-ui.vercel.app/docs/animated/background-beams)         | [Grid and Dot Backgrounds](https://synapse-ui.vercel.app/docs/animated/grid-background) | [Aurora Background](https://synapse-ui.vercel.app/docs/animated/aurora-background)         |
| [Meteors](https://synapse-ui.vercel.app/docs/animated/meteors)                 | [Sparkles](https://synapse-ui.vercel.app/docs/animated/sparkles)                         | [Glowing Border Card](https://synapse-ui.vercel.app/docs/animated/glowing-card)         | [Moving Border Button](https://synapse-ui.vercel.app/docs/animated/moving-border-button)   |
| [3D Tilt Card](https://synapse-ui.vercel.app/docs/animated/tilt-card)          | [Card Spotlight](https://synapse-ui.vercel.app/docs/animated/card-spotlight)             | [Bento Grid](https://synapse-ui.vercel.app/docs/animated/bento-grid)                    | [Infinite Moving Cards](https://synapse-ui.vercel.app/docs/animated/infinite-moving-cards) |
| [Marquee](https://synapse-ui.vercel.app/docs/animated/marquee)                 | [Text Generate Effect](https://synapse-ui.vercel.app/docs/animated/text-generate-effect) | [Typewriter](https://synapse-ui.vercel.app/docs/animated/typewriter)                    | [Flip Words](https://synapse-ui.vercel.app/docs/animated/flip-words)                       |
| [Gradient Text](https://synapse-ui.vercel.app/docs/animated/gradient-text)     | [Number Ticker](https://synapse-ui.vercel.app/docs/animated/number-ticker)               | [Animated Tabs](https://synapse-ui.vercel.app/docs/animated/animated-tabs)              | [Floating Dock](https://synapse-ui.vercel.app/docs/animated/floating-dock)                 |
| [Floating Navbar](https://synapse-ui.vercel.app/docs/animated/floating-navbar) | [Timeline](https://synapse-ui.vercel.app/docs/animated/timeline)                         | [Tracing Beam](https://synapse-ui.vercel.app/docs/animated/tracing-beam)                | [Lamp Effect](https://synapse-ui.vercel.app/docs/animated/lamp-effect)                     |
| [Shimmer Button](https://synapse-ui.vercel.app/docs/animated/shimmer-button)   | [Animated Tooltip](https://synapse-ui.vercel.app/docs/animated/animated-tooltip)         | [Expandable Card](https://synapse-ui.vercel.app/docs/animated/expandable-card)          | [Parallax Scroll](https://synapse-ui.vercel.app/docs/animated/parallax-scroll)             |
| [Terminal](https://synapse-ui.vercel.app/docs/animated/terminal)               | [Code Block](https://synapse-ui.vercel.app/docs/animated/code-block)                     | [Dotted World Map](https://synapse-ui.vercel.app/docs/animated/dotted-world-map)        |                                                                                            |

</details>

<details>
<summary><b>Blocks</b> (12)</summary>
<br />

|                                                                             |                                                                          |                                                                              |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [Hero: Spotlight](https://synapse-ui.vercel.app/docs/blocks/hero-spotlight) | [Hero: Split](https://synapse-ui.vercel.app/docs/blocks/hero-split)      | [Hero: Product](https://synapse-ui.vercel.app/docs/blocks/hero-product)      |
| [Feature Section](https://synapse-ui.vercel.app/docs/blocks/feature-grid)   | [Pricing Table](https://synapse-ui.vercel.app/docs/blocks/pricing-table) | [Testimonials](https://synapse-ui.vercel.app/docs/blocks/testimonial-wall)   |
| [FAQ](https://synapse-ui.vercel.app/docs/blocks/faq-section)                | [Call to Action](https://synapse-ui.vercel.app/docs/blocks/cta-panel)    | [Footer](https://synapse-ui.vercel.app/docs/blocks/site-footer)              |
| [Login Page](https://synapse-ui.vercel.app/docs/blocks/login-page)          | [Signup Page](https://synapse-ui.vercel.app/docs/blocks/signup-page)     | [Dashboard Shell](https://synapse-ui.vercel.app/docs/blocks/dashboard-shell) |

</details>

<details>
<summary><b>Collections</b></summary>
<br />

Ready-made variants of common patterns: [AI Inputs](https://synapse-ui.vercel.app/docs/collections/ai-input), [Alerts](https://synapse-ui.vercel.app/docs/collections/alert), [Badges](https://synapse-ui.vercel.app/docs/collections/badge), [Buttons](https://synapse-ui.vercel.app/docs/collections/button), [Cards](https://synapse-ui.vercel.app/docs/collections/card), [FAQs](https://synapse-ui.vercel.app/docs/collections/faq), [Inputs](https://synapse-ui.vercel.app/docs/collections/input), [Lists](https://synapse-ui.vercel.app/docs/collections/list), [Messages](https://synapse-ui.vercel.app/docs/collections/message), [Popovers](https://synapse-ui.vercel.app/docs/collections/popover), [Pricing](https://synapse-ui.vercel.app/docs/collections/pricing), [Texts](https://synapse-ui.vercel.app/docs/collections/text), [Tooltips](https://synapse-ui.vercel.app/docs/collections/tooltip) and [Hooks](https://synapse-ui.vercel.app/docs/collections/hooks).

</details>

Every component page follows the same structure: live **preview and code**, **installation** (CLI or manual), **usage**, **examples**, **API reference** and **accessibility** notes with keyboard interactions.

## Local development

```bash
git clone https://github.com/therajarshichakraborty/Synapse-UI.git
cd Synapse-UI
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000). Append `?theme=light` or `?theme=dark` to any URL to pin the theme.

| Script                   | What it does                                                          |
| ------------------------ | --------------------------------------------------------------------- |
| `bun dev`                | Start the dev server. Rebuilds the registry and example index first.  |
| `bun run build`          | Production build. Statically generates every docs page and example.   |
| `bun start`              | Serve the production build.                                           |
| `bun run lint`           | ESLint across the project.                                            |
| `bun run typecheck`      | `tsc --noEmit` in strict mode.                                        |
| `bun run format`         | Prettier.                                                             |
| `bun run docs:generate`  | Regenerate component MDX pages from `scripts/docs-meta`.              |
| `bun run registry:build` | Rebuild `public/r/*.json`, the example index and `public/tokens.css`. |

## Project structure

```text
.
├── packages/cli/              # The `synapse-ui` CLI (init, add, list)
├── public/r/                  # Generated registry (shadcn format), one JSON per item
├── scripts/
│   ├── build-registry.mjs     # Builds public/r and the collections index
│   ├── build-docs-index.mjs   # Builds the lazy example map and tokens.css
│   ├── generate-docs.ts       # Generates component docs pages
│   └── docs-meta/             # Usage, examples, props and a11y per component
└── src/
    ├── app/                   # Next.js routes: landing, /docs, /view/[name] previews
    ├── components/
    │   ├── ui/                # Core components
    │   ├── animated/          # Animated components
    │   ├── blocks/            # Page sections
    │   ├── synapse-ui-components/  # Collections (variants)
    │   ├── docs/              # Preview, install, code block, props table
    │   └── site/              # Site chrome and landing sections
    ├── content/docs/          # MDX documentation
    ├── registry/
    │   ├── registry.ts        # Metadata for every documented item
    │   └── examples/          # Live examples used by the docs
    └── lib/                   # Utilities, Shiki highlighter, docs navigation
```

## Adding a component

1. **Write the component** in `src/components/ui`, `src/components/animated` or `src/components/blocks`. Use semantic tokens only, `cva` for variants and `cn()` for class merging.
2. **Register it** in `src/registry/registry.ts` with a name, title, description and category.
3. **Add examples** to `src/registry/examples/<name>-demo.tsx` (and any `<name>-<variant>.tsx`).
4. **Describe it** in `scripts/docs-meta/*.ts`: usage, examples, props and keyboard interactions.
5. **Generate** the docs and registry:

   ```bash
   bun run docs:generate
   bun run registry:build
   ```

The new page appears in the sidebar, the ⌘K palette and the CLI automatically.

## Accessibility and performance

- Built on Radix primitives: correct roles, labelling, focus trapping and roving focus.
- Visible focus rings on every interactive element, using the `ring` token.
- `prefers-reduced-motion` disables CSS animations globally, and Motion runs with `reducedMotion="user"`.
- Docs pages and examples are statically generated. Code is highlighted at build time, so no highlighter ships to the browser for docs.
- Examples load lazily, so a docs page only downloads the demos it shows.

## Roadmap

- [x] Dark-first token system with a complete light theme
- [x] 53 core, 31 animated and 12 block components
- [x] CLI and shadcn-compatible registry
- [ ] Publish the `synapse-ui` CLI to npm
- [ ] Figma kit
- [ ] Full-page templates

## Contributing

Contributions are welcome. Read the [contribution notes](#adding-a-component) above, then:

1. Fork the repository and create a branch: `git checkout -b feat/my-component`
2. Make your change and run `bun run lint && bun run typecheck && bun run build`
3. Open a pull request with screenshots in light and dark mode

Found a bug or have an idea? [Open an issue](https://github.com/therajarshichakraborty/Synapse-UI/issues) or start a [discussion](https://github.com/therajarshichakraborty/Synapse-UI/discussions).

## License

Released under the [MIT License](./LICENSE). Free for personal and commercial use.

<br />

<div align="center">
  <sub>Built by <a href="https://github.com/therajarshichakraborty">Rajarshi Chakraborty</a>. If Synapse UI helps you, consider giving it a ⭐</sub>
</div>
