import "server-only";
import { createHighlighter, type Highlighter } from "shiki";
import { parseLineRanges } from "./transformers";

// Cached on globalThis so hot reloads in dev reuse one instance instead of piling up.
const store = globalThis as typeof globalThis & { __synapseShiki?: Promise<Highlighter> };

function getHighlighter() {
  store.__synapseShiki ??= createHighlighter({
    themes: ["github-dark-default", "github-light-default"],
    langs: ["tsx", "ts", "bash", "json", "css", "mdx"],
  });
  return store.__synapseShiki;
}

export async function highlight(code: string, lang = "tsx", highlightLines?: string) {
  const hl = await getHighlighter();
  const lines = parseLineRanges(highlightLines);
  return hl.codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
    transformers: [
      {
        line(node, line) {
          if (lines.has(line)) this.addClassToHast(node, "highlighted");
        },
      },
    ],
  });
}
