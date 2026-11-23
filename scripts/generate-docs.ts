/**
 * Generates component documentation pages from typed metadata.
 *
 *   bun scripts/generate-docs.ts
 *
 * Source of truth:
 *   - src/registry/registry.ts      (title, description, category)
 *   - scripts/docs-meta/*.ts         (usage, examples, API, accessibility)
 *
 * Output: src/content/docs/{components,animated,blocks}/<name>.mdx and meta.json.
 * Pages are plain MDX, so hand edits are possible; re-running overwrites them.
 */
import fs from "node:fs";
import path from "node:path";
import {
  entrySlug,
  registry,
  type RegistryCategory,
  type RegistryEntry,
} from "../src/registry/registry";
import type { DocMeta } from "./docs-meta/types";
import { coreDocs } from "./docs-meta/core";
import { animatedDocs } from "./docs-meta/animated";
import { blockDocs } from "./docs-meta/blocks";
import { nativeDocs } from "./docs-meta/native";

// Optional filter: `bun scripts/generate-docs.ts --only=native`
const only = process.argv.find((a) => a.startsWith("--only="))?.slice("--only=".length);

const folders: Record<
  RegistryCategory,
  { dir: string; title: string; overview: string; customIndex?: boolean }
> = {
  native: {
    dir: "react-native",
    title: "React Native",
    overview: "Premium components for React Native and Expo.",
    // index.mdx is hand-written (setup guide + gallery).
    customIndex: true,
  },
  core: {
    dir: "components",
    title: "Components",
    overview: "Accessible, themeable building blocks with a shadcn-compatible API.",
  },
  animated: {
    dir: "animated",
    title: "Animated",
    overview: "Cinematic, motion-rich components. Every one has a reduced-motion fallback.",
  },
  block: {
    dir: "blocks",
    title: "Blocks",
    overview: "Complete, responsive sections composed from Synapse components. Copy, paste, ship.",
  },
};

const allMeta = new Map<string, DocMeta>(
  [...coreDocs, ...animatedDocs, ...blockDocs, ...nativeDocs].map((m) => [m.name, m]),
);

const yaml = (s: string) => JSON.stringify(s);

function previewTag(
  name: string,
  meta: DocMeta,
  opts: { className?: string; height?: number } = {},
) {
  const attrs = [`name="${name}"`];
  const className = opts.className ?? meta.previewClassName;
  if (className) attrs.push(`className="${className}"`);
  if (meta.align && meta.align !== "center") attrs.push(`align="${meta.align}"`);
  if (meta.iframe) attrs.push("iframe");
  const height = opts.height ?? meta.height;
  if (height) attrs.push(`height={${height}}`);
  return `<ComponentPreview ${attrs.join(" ")} />`;
}

function page(entry: RegistryEntry, meta: DocMeta) {
  const out: string[] = [];
  out.push(
    "---",
    `title: ${yaml(entry.title)}`,
    `description: ${yaml(entry.description)}`,
    "---",
    "",
  );
  if (meta.intro) out.push(meta.intro.trim(), "");
  out.push(previewTag(meta.preview ?? `${entry.name}-demo`, meta), "");

  out.push("## Installation", "", `<ComponentInstall name="${entry.name}" />`, "");

  if (meta.usage) {
    out.push(
      "## Usage",
      "",
      "```tsx",
      meta.usage.imports.trim(),
      "```",
      "",
      "```tsx",
      meta.usage.code.trim(),
      "```",
      "",
    );
  }

  if (meta.examples?.length) {
    out.push("## Examples", "");
    for (const ex of meta.examples) {
      out.push(`### ${ex.title}`, "");
      if (ex.description) out.push(ex.description, "");
      out.push(previewTag(ex.name, meta, { className: ex.className, height: ex.height }), "");
    }
  }

  if (meta.api?.length) {
    out.push("## API Reference", "");
    for (const part of meta.api) {
      out.push(`### ${part.name}`, "");
      if (part.description) out.push(part.description, "");
      const rows = part.props.map(([prop, type, defaultValue, description]) => ({
        prop,
        type,
        ...(defaultValue ? { defaultValue } : {}),
        description: description ?? "",
      }));
      out.push(`<PropsTable props={${JSON.stringify(rows)}} />`, "");
    }
  }

  if (meta.a11y) {
    out.push("## Accessibility", "");
    if (meta.a11y.notes) out.push(meta.a11y.notes.trim(), "");
    if (meta.a11y.keys?.length) {
      out.push(
        "### Keyboard interactions",
        "",
        `<KeyboardTable keys={${JSON.stringify(meta.a11y.keys)}} />`,
        "",
      );
    }
  }

  if (meta.extra) out.push(meta.extra.trim(), "");
  return out.join("\n");
}

const docsRoot = path.join("src", "content", "docs");
let written = 0;
const missing: string[] = [];

for (const [category, folder] of Object.entries(folders) as [
  RegistryCategory,
  (typeof folders)[RegistryCategory],
][]) {
  if (only && only !== category) continue;
  const dir = path.join(docsRoot, folder.dir);
  fs.mkdirSync(dir, { recursive: true });
  const entries = registry.filter((e) => e.category === category);

  fs.writeFileSync(
    path.join(dir, "meta.json"),
    JSON.stringify(
      { title: folder.title, pages: ["index", ...entries.map((e) => entrySlug(e))] },
      null,
      2,
    ) + "\n",
  );
  if (!folder.customIndex) {
    fs.writeFileSync(
      path.join(dir, "index.mdx"),
      [
        "---",
        `title: ${yaml(folder.title)}`,
        `description: ${yaml(folder.overview)}`,
        "---",
        "",
        `<ComponentsGrid category="${category}" />`,
        "",
      ].join("\n"),
    );
  }

  for (const entry of entries) {
    const meta = allMeta.get(entry.name);
    if (!meta) {
      missing.push(entry.name);
      continue;
    }
    fs.writeFileSync(path.join(dir, `${entrySlug(entry)}.mdx`), page(entry, meta));
    written++;
  }
}

console.log(`Generated ${written} component pages.`);
if (missing.length) console.warn(`No docs metadata for: ${missing.join(", ")}`);
