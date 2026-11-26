import "server-only";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

export async function readSource(relPath: string): Promise<string> {
  try {
    return await fs.readFile(path.join(/*turbopackIgnore: true*/ ROOT, relPath), "utf-8");
  } catch {
    return `// Source not found: ${relPath}`;
  }
}

export function examplePath(name: string) {
  return `src/registry/examples/${name}.tsx`;
}

/** Rewrites internal aliases the way they land in a consumer project. */
/** Web components install into `components/synapse-ui/` (CLI and shadcn alike). */
export function toConsumerSource(code: string) {
  return code.replace(
    /@\/components\/(?:ui|animated|blocks|synapse-ui-components)\//g,
    "@/components/synapse-ui/",
  );
}

const IGNORED = new Set(["react", "react-dom", "next"]);

export type SourceDeps = { packages: string[]; internal: string[] };

/** Scans import statements to find npm packages and internal registry dependencies. */
export function scanDeps(code: string): SourceDeps {
  const packages = new Set<string>();
  const internal = new Set<string>();
  const re = /(?:import|export)\s+(?:[^"']*?\s+from\s+)?["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    const spec = m[1];
    if (spec.startsWith("@/components/ui/")) internal.add(spec.slice("@/components/ui/".length));
    else if (spec.startsWith("@/components/animated/"))
      internal.add(spec.slice("@/components/animated/".length));
    else if (spec.startsWith("@/hooks/")) internal.add(spec.slice("@/hooks/".length));
    else if (spec.startsWith(".") || spec.startsWith("@/")) continue;
    else {
      const name = spec.startsWith("@")
        ? spec.split("/").slice(0, 2).join("/")
        : spec.split("/")[0];
      if (!IGNORED.has(name) && !name.startsWith("node:")) packages.add(name);
    }
  }
  return { packages: [...packages].sort(), internal: [...internal].sort() };
}

/** Maps a source path to the path it should be written to in a consumer project. */
export function targetPath(relPath: string) {
  return relPath
    .replace(/^src\//, "")
    .replace(
      /^components\/(?:ui|animated|blocks|synapse-ui-components)\//,
      "components/synapse-ui/",
    );
}
