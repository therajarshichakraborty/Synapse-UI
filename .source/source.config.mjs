// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";

// src/lib/shiki/themes.ts
function build(p) {
  return {
    name: p.name,
    type: p.type,
    settings: [],
    colors: { "editor.background": p.bg, "editor.foreground": p.fg },
    tokenColors: [
      { settings: { foreground: p.fg, background: p.bg } },
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: p.comment, fontStyle: "italic" }
      },
      {
        scope: [
          "keyword",
          "storage",
          "storage.type",
          "storage.modifier",
          "keyword.operator.new",
          "keyword.control"
        ],
        settings: { foreground: p.keyword }
      },
      {
        scope: ["keyword.operator", "punctuation", "meta.brace"],
        settings: { foreground: p.punct }
      },
      {
        scope: ["string", "string.template", "punctuation.definition.string"],
        settings: { foreground: p.string }
      },
      {
        scope: ["entity.name.function", "support.function", "meta.function-call"],
        settings: { foreground: p.fn }
      },
      {
        scope: [
          "entity.name.type",
          "support.type",
          "support.class",
          "entity.name.class",
          "entity.other.inherited-class"
        ],
        settings: { foreground: p.type_ }
      },
      {
        scope: [
          "constant",
          "constant.numeric",
          "constant.language",
          "support.constant",
          "variable.other.constant"
        ],
        settings: { foreground: p.constant }
      },
      { scope: ["entity.name.tag", "support.class.component"], settings: { foreground: p.tag } },
      { scope: ["entity.other.attribute-name"], settings: { foreground: p.attr } },
      {
        scope: ["variable", "variable.parameter", "meta.object-literal.key"],
        settings: { foreground: p.variable }
      },
      { scope: ["markup.heading"], settings: { foreground: p.keyword, fontStyle: "bold" } },
      { scope: ["markup.inserted"], settings: { foreground: p.string } },
      { scope: ["markup.deleted"], settings: { foreground: "#f43f5e" } }
    ]
  };
}
var synapseDark = build({
  name: "synapse-dark",
  type: "dark",
  fg: "#dbe4f5",
  bg: "#080b14",
  comment: "#5b6886",
  keyword: "#7aa2ff",
  string: "#67e8f9",
  fn: "#a5b4fc",
  type_: "#818cf8",
  constant: "#93c5fd",
  tag: "#60a5fa",
  attr: "#a5f3fc",
  punct: "#7d8aa8",
  variable: "#dbe4f5"
});
var synapseLight = build({
  name: "synapse-light",
  type: "light",
  fg: "#0b1220",
  bg: "#f6f8fc",
  comment: "#8190a8",
  keyword: "#1d4ed8",
  string: "#0e7490",
  fn: "#4338ca",
  type_: "#4f46e5",
  constant: "#0369a1",
  tag: "#2563eb",
  attr: "#0f766e",
  punct: "#64748b",
  variable: "#0b1220"
});

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
        light: synapseLight,
        dark: synapseDark
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
