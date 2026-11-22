import type { ShikiTransformer } from "shiki";

/** Parses `{1,3-5}` from the code fence meta and marks those lines as highlighted. */
export function parseLineRanges(meta: string | undefined): Set<number> {
  const out = new Set<number>();
  const match = meta?.match(/\{([\d,\s-]+)\}/);
  if (!match) return out;
  for (const part of match[1].split(",")) {
    const [a, b] = part.trim().split("-").map(Number);
    if (Number.isNaN(a)) continue;
    for (let i = a; i <= (b || a); i++) out.add(i);
  }
  return out;
}

export function transformerMetaHighlight(): ShikiTransformer {
  return {
    name: "synapse:meta-highlight",
    line(node, line) {
      const raw = (this.options.meta as { __raw?: string } | undefined)?.__raw;
      const lines = parseLineRanges(raw);
      if (lines.has(line)) this.addClassToHast(node, "highlighted");
    },
  };
}
