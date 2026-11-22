import "server-only";
import { createHighlighter, type Highlighter } from "shiki";
import { parseLineRanges } from "./transformers";

let highlighter: Promise<Highlighter> | null = null;

function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: ["github-dark-default", "github-light-default"],
    langs: ["tsx", "ts", "bash", "json", "css", "mdx"],
  });
  return highlighter;
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
