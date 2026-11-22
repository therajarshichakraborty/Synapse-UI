import "server-only";
import { createHighlighter, type Highlighter } from "shiki";
import { synapseDark, synapseLight } from "./themes";
import { parseLineRanges } from "./transformers";

let highlighter: Promise<Highlighter> | null = null;

function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: [synapseDark, synapseLight],
    langs: ["tsx", "ts", "bash", "json", "css", "mdx"],
  });
  return highlighter;
}

export async function highlight(code: string, lang = "tsx", highlightLines?: string) {
  const hl = await getHighlighter();
  const lines = parseLineRanges(highlightLines);
  return hl.codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "synapse-light", dark: "synapse-dark" },
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
