# Synapse UI Redesign Plan

## 1. Audit (current state)

| Area            | Finding                                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | Next.js 16.2 (App Router), React 19, TypeScript strict (`tsc` passes)                                                                                                                  |
| Package manager | Bun 1.4 (`bun.lock`); a stale `package-lock.json` is also present                                                                                                                      |
| Styling         | Tailwind CSS v4 (`@tailwindcss/postcss`), `tw-animate-css`, `shadcn/tailwind.css`, neutral/zinc oklch tokens                                                                           |
| Docs            | Fumadocs (`fumadocs-core` / `fumadocs-mdx` / `fumadocs-ui` 16), MDX in `src/content/docs`, custom chrome in `src/components/docs/layout/*`                                             |
| Primitives      | `src/components/ui/*`: 56 shadcn v4 (radix-nova style) primitives that already use semantic tokens                                                                                     |
| Variant library | `src/components/synapse-ui-components/*`: ~200 one-off designs (ai-inputs, alerts, badges, buttons, cards, FAQs, inputs, lists, messages, popovers, pricings, texts, tooltips, blocks) |
| Registry        | `scripts/build-registry.mjs` runs on every `next.config` load. It emits `public/r/*.json` (shadcn registry format) and generates `src/components/docs/registry.tsx`                    |
| Landing         | `src/app/(root)/page.tsx` plus `src/components/landing/*`: zinc and violet styling, large inline tab logic                                                                             |
| Lint            | `next lint` was removed in Next 16, so the `lint` script cannot run. `eslint src` reports 66 errors, mostly unused imports in variant files                                            |

## 2. Strategy

The `ui/` primitives already read from semantic tokens. Re-tokenizing the system to a blue, dark-first palette re-skins all 56 primitives and every variant that uses tokens. On top of that I tune the primitives where the brand needs it: button heights and glow, glass card, focus rings.

### Rewritten

- `src/app/globals.css`: the full token system (blue 50–950, cyan→blue→indigo gradient, 3 surface levels, semantic tokens, success/warning, radius scale, type scale, effects utilities: grid/dot/noise/glass/gradient-border, reduced-motion handling). Light theme is first-class.
- Fonts: Geist Sans and Geist Mono via `next/font/google`
- Theme: `next-themes` with `defaultTheme="dark"`
- Docs chrome: navbar, sidebar (grouped, collapsible, "New" badges, scroll preserved, mobile sheet), TOC with scroll-spy, breadcrumbs, prev/next, ⌘K command palette (cmdk + Fumadocs search API + static component index)
- Code blocks: Shiki with a custom `synapse-dark` / `synapse-light` theme, file-name header, line highlight (`{1,3-4}` meta), copy with success state, package-manager tabs (bun/pnpm/npm/yarn) persisted in `localStorage`
- Landing page: 14 sections, all new (`src/components/site/landing/*`)

### Added

- `src/components/animated/*`: Aceternity-style animated components (original implementations)
- `src/components/blocks/*`: copy-paste sections (heroes ×3, features, pricing, testimonials, FAQ, CTA, footer, auth, dashboard shell)
- New core pieces missing from `ui/`: `data-table`, `date-picker`, `form`, and `empty-state` (an alias of `empty`)
- `src/registry/`: `registry.ts` holds typed metadata for every documented item (name, title, description, category, files, deps, `isNew`, links). `examples/` holds live demo files. `__index__.tsx` is a generated lazy map of examples
- `scripts/build-docs-index.mjs`: generates `src/registry/__index__.tsx`
- `scripts/docs-meta/*.mjs` and `scripts/generate-docs.mjs`: authoring source for the component MDX pages. Every page has the same section order (Preview/Code → Installation → Usage → Examples → API Reference → Accessibility)
- `packages/cli`: a minimal `synapse-ui` CLI (`npx synapse-ui add <name>`) that reads `/r/<name>.json`. It must be published to npm before `npx` works; until then the docs show the `shadcn` URL fallback too
- MDX components: `<ComponentPreview>`, `<ComponentInstall>`, `<ComponentSource>`, `<PmCommand>`, `<KeyboardTable>`

### File structure (new or changed)

```
src/
  app/
    (root)/page.tsx                 landing (server component, composes sections)
    docs/...                        new chrome
  components/
    ui/                             core primitives (re-themed, APIs unchanged)
    animated/                       animated components
    blocks/                         composed sections
    site/                           site chrome: navbar, footer, landing sections, docs chrome, command menu
    docs/                           MDX helpers (preview, install, code block, props table)
  registry/
    registry.ts                     metadata
    examples/*.tsx                  demos
    __index__.tsx                   generated
  content/docs/
    index.mdx, installation.mdx, theming.mdx, dark-mode.mdx, cli.mdx, changelog.mdx
    components/*.mdx                core + animated component pages
    blocks/*.mdx
    collections/*.mdx               the previous variant galleries (moved)
```

## 3. Breaking changes and compatibility

- **No public component API changes.** Every export in `src/components/ui/*` and `src/components/synapse-ui-components/*` keeps its name, props and file path. Visual changes come through tokens only.
- **Docs URLs:** the variant galleries move from `/docs/components/<category>` to `/docs/collections/<category>` because the shadcn-style core pages now own `/docs/components/button` and similar. Permanent redirects in `next.config.mjs` cover the slugs that do not collide (`ai-input`, `faq`, `list`, `pricing`, `profile`, `text`, `block`, `message`). For slugs that now hold a core page (`alert`, `badge`, `button`, `card`, `input`, `popover`, `tooltip`), the core page links to its collection.
- `empty-state` is added as an alias that re-exports `empty`.
- Old `src/components/landing/*` and `src/components/layout/Footer.tsx` are no longer used by the site. They are removed in the polish phase. The `synapse-ui-components/blocks/landing-*` registry items are a separate copy and stay.
- `lint` script: `next lint` → `eslint .` (required by Next 16).

## 4. Phases

1. Tokens, theme, fonts, `cn`, base layout shell
2. Docs layout (navbar, sidebar, TOC, ⌘K, code block, Preview/Code)
3. Re-theme existing components and add their doc pages
4. New core components and docs
5. Animated components and docs
6. Blocks
7. Landing page
8. Polish: responsive, themes, reduced motion, a11y, lint/build, dead code

Per the owner's instruction, **no git commands are run**. Phases are not committed; the owner commits.

## 5. Status (end of this pass)

| Phase                                                                | Status                                                                                                                |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1. Tokens, theme, fonts, layout shell                                | Done                                                                                                                  |
| 2. Docs chrome (navbar, sidebar, TOC, ⌘K, code blocks, Preview/Code) | Done                                                                                                                  |
| 3. Re-theme existing components and their docs                       | Done. Primitives use tokens; legacy collections recolored to the brand and moved to `/docs/collections`               |
| 4. New core components and docs                                      | Done (53 pages)                                                                                                       |
| 5. Animated components and docs                                      | Done (31 pages)                                                                                                       |
| 6. Blocks                                                            | Done (12 pages, iframe previews)                                                                                      |
| 7. Landing page                                                      | Done (14 sections)                                                                                                    |
| 8. Polish                                                            | Build, lint and typecheck are clean. A visual QA pass in a browser is still pending (browser tooling was unavailable) |

Verification: `bun run build` succeeds with 256 static pages and no warnings. `bun run lint` reports 0 errors and 19 warnings (`<img>` and a hook-deps warning in legacy collection files). `tsc --noEmit` is clean. All 119 docs routes return 200 with no missing examples.

### Workflows

- Edit component docs in `scripts/docs-meta/*.ts`, then run `bun run docs:generate`.
- Add a live example by dropping a file in `src/registry/examples/`. The index regenerates on `next dev` and `next build`.
- `bun run registry:build` regenerates `public/r/*.json`, the example index and `public/tokens.css`.
