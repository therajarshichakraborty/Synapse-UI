import type { ThemeRegistrationRaw } from "shiki";

type Palette = {
  name: string;
  type: "dark" | "light";
  fg: string;
  bg: string;
  comment: string;
  keyword: string;
  string: string;
  fn: string;
  type_: string;
  constant: string;
  tag: string;
  attr: string;
  punct: string;
  variable: string;
};

function build(p: Palette): ThemeRegistrationRaw {
  return {
    name: p.name,
    type: p.type,
    settings: [],
    colors: { "editor.background": p.bg, "editor.foreground": p.fg },
    tokenColors: [
      { settings: { foreground: p.fg, background: p.bg } },
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: p.comment, fontStyle: "italic" },
      },
      {
        scope: [
          "keyword",
          "storage",
          "storage.type",
          "storage.modifier",
          "keyword.operator.new",
          "keyword.control",
        ],
        settings: { foreground: p.keyword },
      },
      {
        scope: ["keyword.operator", "punctuation", "meta.brace"],
        settings: { foreground: p.punct },
      },
      {
        scope: ["string", "string.template", "punctuation.definition.string"],
        settings: { foreground: p.string },
      },
      {
        scope: ["entity.name.function", "support.function", "meta.function-call"],
        settings: { foreground: p.fn },
      },
      {
        scope: [
          "entity.name.type",
          "support.type",
          "support.class",
          "entity.name.class",
          "entity.other.inherited-class",
        ],
        settings: { foreground: p.type_ },
      },
      {
        scope: [
          "constant",
          "constant.numeric",
          "constant.language",
          "support.constant",
          "variable.other.constant",
        ],
        settings: { foreground: p.constant },
      },
      { scope: ["entity.name.tag", "support.class.component"], settings: { foreground: p.tag } },
      { scope: ["entity.other.attribute-name"], settings: { foreground: p.attr } },
      {
        scope: ["variable", "variable.parameter", "meta.object-literal.key"],
        settings: { foreground: p.variable },
      },
      { scope: ["markup.heading"], settings: { foreground: p.keyword, fontStyle: "bold" } },
      { scope: ["markup.inserted"], settings: { foreground: p.string } },
      { scope: ["markup.deleted"], settings: { foreground: "#f43f5e" } },
    ],
  };
}

export const synapseDark = build({
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
  variable: "#dbe4f5",
});

export const synapseLight = build({
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
  variable: "#0b1220",
});
