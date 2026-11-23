// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";

// src/lib/shiki/transformers.ts
function parseLineRanges(meta) {
  const out = /* @__PURE__ */ new Set();
  const match = meta?.match(/\{([\d,\s-]+)\}/);
  if (!match) return out;
  for (const part of match[1].split(",")) {
    const [a, b] = part.trim().split("-").map(Number);
    if (Number.isNaN(a)) continue;
    for (let i = a; i <= (b || a); i++) out.add(i);
  }
  return out;
}
function transformerMetaHighlight() {
  return {
    name: "synapse:meta-highlight",
    line(node, line) {
      const raw = this.options.meta?.__raw;
      const lines = parseLineRanges(raw);
      if (lines.has(line)) this.addClassToHast(node, "highlighted");
    }
  };
}

// source.config.ts
var docs = defineDocs({
  dir: "src/content/docs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkNpmOptions: false,
    remarkCodeTabOptions: false,
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      themes: {
        light: "github-light-default",
        dark: "github-dark-default"
      },
      defaultColor: false,
      icon: false,
      tab: false,
      transformers: [...rehypeCodeDefaultOptions.transformers ?? [], transformerMetaHighlight()]
    }
  }
});
export {
  source_config_default as default,
  docs
};
