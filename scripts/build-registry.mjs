// Builds the Synapse UI registry (public/r/*.json).
//
// The same JSON serves two installers:
//   1. shadcn:      npx shadcn@latest add https://synapse-ui-dev.vercel.app/r/native-fab.json
//   2. Synapse CLI: npx synapseui@latest add native-fab
//
// Install layout in the user's project (src/ is respected automatically):
//   web components (ui, animated, blocks) -> components/synapse-ui/<name>.tsx
//   React Native components               -> components/native/<name>.tsx
//   hooks                                 -> hooks/<name>.ts
//
// Every file carries an explicit `target`, and every registry dependency is a full
// Synapse URL, so the shadcn CLI never substitutes its own components.
import fs from "node:fs";
import path from "node:path";

const REGISTRY_URL = (
  process.env.SYNAPSE_REGISTRY_URL ?? "https://synapse-ui-dev.vercel.app/r"
).replace(/\/$/, "");
const REGISTRY_DIR = path.join("public", "r");
const STYLES_DIR = path.join(REGISTRY_DIR, "styles", "default");
const SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";
fs.mkdirSync(STYLES_DIR, { recursive: true });

const WEB_DIRS = ["ui", "animated", "blocks"];
const nativeDir = path.join("src", "components", "native");
const hooksDir = path.join("src", "hooks");
const IGNORED_PKGS = new Set([
  "react",
  "react-dom",
  "next",
  ...[
    "fs",
    "path",
    "crypto",
    "os",
    "http",
    "https",
    "stream",
    "util",
    "zlib",
    "url",
    "child_process",
  ],
]);

const pkgName = (p) => (p.startsWith("@") ? p.split("/").slice(0, 2).join("/") : p.split("/")[0]);
const read = (p) => fs.readFileSync(p, "utf-8");
const url = (name) => `${REGISTRY_URL}/${name}.json`;

/** Web files import each other from one flat folder once installed. */
function toInstalledSource(code) {
  return code.replace(/@\/components\/(?:ui|animated|blocks)\//g, "@/components/synapse-ui/");
}

/** npm packages + local imports (web names, hooks, native files) of one source file. */
function scan(code) {
  const packages = new Set();
  const web = new Set();
  const hooks = new Set();
  const native = new Set();
  const re = /(?:import|export)\s+(?:[^"';]*?\s+from\s+)?["']([^"']+)["']/g;
  for (const [, spec] of code.matchAll(re)) {
    let m;
    if ((m = spec.match(/^@\/components\/(?:ui|animated|blocks)\/([\w-]+)/))) web.add(m[1]);
    else if ((m = spec.match(/^@\/hooks\/([\w-]+)/))) hooks.add(m[1]);
    else if ((m = spec.match(/^@\/components\/native\/([\w-]+)/))) native.add(m[1]);
    else if (!spec.startsWith(".") && !spec.startsWith("@/")) {
      const name = pkgName(spec);
      if (!IGNORED_PKGS.has(name)) packages.add(name);
    }
  }
  return { packages, web, hooks, native };
}

function findFile(dir, base) {
  for (const ext of [".tsx", ".ts"]) {
    const p = path.join(dir, base + ext);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const sources = (dir, re) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => re.test(f) && fs.statSync(path.join(dir, f)).size > 0)
    : [];

const items = [];

// Web components and blocks (one item per file; other web components are registry deps).
for (const dir of WEB_DIRS) {
  const type = dir === "blocks" ? "registry:block" : "registry:component";
  for (const file of sources(path.join("src", "components", dir), /\.tsx?$/)) {
    const name = file.replace(/\.tsx?$/, "");
    items.push({
      name,
      type,
      category: dir === "blocks" ? "block" : "web",
      entry: path.join("src", "components", dir, file),
      target: `components/synapse-ui/${file}`,
    });
  }
}
// React Native: shared native files (theme, icon, portal…) are inlined, so one add is enough.
for (const file of sources(nativeDir, /\.tsx?$/)) {
  const base = file.replace(/\.tsx?$/, "");
  items.push({
    name: `native-${base}`,
    type: "registry:component",
    category: "native",
    entry: path.join(nativeDir, file),
    target: `components/native/${file}`,
  });
}
// Hooks
for (const file of sources(hooksDir, /\.tsx?$/)) {
  items.push({
    name: file.replace(/\.tsx?$/, ""),
    type: "registry:hook",
    category: "hook",
    entry: path.join(hooksDir, file),
    target: `hooks/${file}`,
  });
}

const webNames = new Set(
  items.filter((i) => i.category === "web" || i.category === "block").map((i) => i.name),
);

const output = items.map((item) => {
  const files = new Map();
  const packages = new Set();
  const registryDeps = new Set();
  const queue = [{ file: item.entry, target: item.target }];

  while (queue.length) {
    const { file, target } = queue.shift();
    if (files.has(target)) continue;
    const code = read(file);
    const deps = scan(code);
    deps.packages.forEach((p) => packages.add(p));
    files.set(target, {
      path: target,
      target,
      type: item.type === "registry:hook" ? "registry:hook" : "registry:component",
      content: toInstalledSource(code),
    });
    for (const w of deps.web) if (w !== item.name && webNames.has(w)) registryDeps.add(url(w));
    for (const h of deps.hooks) {
      const p = findFile(hooksDir, h);
      if (p) queue.push({ file: p, target: `hooks/${path.basename(p)}` });
    }
    for (const n of deps.native) {
      const p = findFile(nativeDir, n);
      if (p) queue.push({ file: p, target: `components/native/${path.basename(p)}` });
    }
  }

  // react-native ships with every Expo app; installing it into a web app would be wrong.
  if (item.category === "native") packages.delete("react-native");

  return {
    $schema: SCHEMA,
    name: item.name,
    type: item.type,
    meta: { category: item.category },
    dependencies: [...packages].sort(),
    registryDependencies: [...registryDeps].sort(),
    files: [...files.values()],
  };
});

// Collection items: `all` (every web component + block) and `all-native`.
const collection = (name, description, category) => ({
  $schema: SCHEMA,
  name,
  type: "registry:block",
  description,
  meta: { category: "collection" },
  dependencies: [],
  registryDependencies: output
    .filter((i) => category.includes(i.meta.category))
    .map((i) => url(i.name)),
  files: [],
});
output.push(
  collection("all", "Every Synapse UI web component and block.", ["web", "block"]),
  collection("all-native", "Every Synapse UI React Native component.", ["native"]),
);

for (const item of output) {
  const json = JSON.stringify(item, null, 2);
  fs.writeFileSync(path.join(REGISTRY_DIR, `${item.name}.json`), json);
  fs.writeFileSync(path.join(STYLES_DIR, `${item.name}.json`), json);
}

// Lightweight index for `synapseui list` / `add --all` (no file contents).
const index = output.map(({ name, type, meta, dependencies, registryDependencies }) => ({
  name,
  type,
  category: meta.category,
  dependencies,
  registryDependencies,
}));
fs.writeFileSync(path.join(REGISTRY_DIR, "index.json"), JSON.stringify(index, null, 2));
fs.writeFileSync(path.join(STYLES_DIR, "index.json"), JSON.stringify(index, null, 2));

console.log(`Successfully generated registry index with ${output.length} components/hooks.`);
