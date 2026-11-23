import fs from "node:fs";
import path from "path";

const REGISTRY_DIR = path.join("public", "r");
const STYLES_DIR = path.join(REGISTRY_DIR, "styles", "default");

// Ensure target directories exist
fs.mkdirSync(STYLES_DIR, { recursive: true });

const nodeBuiltins = new Set([
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
]);

function getPackageName(importPath) {
  if (importPath.startsWith("@")) return importPath.split("/").slice(0, 2).join("/");
  return importPath.split("/")[0];
}

// Scan imports to determine npm dependencies and registry dependencies
function scanFileDependencies(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const dependencies = new Set();
  const registryDependencies = new Set();

  const importFromRegex = /import\s+([^;]*?)\s+from\s+["']([^"']+)["']/g;
  const importSideEffectRegex = /import\s+["']([^"']+)["']/g;

  let match;
  while ((match = importFromRegex.exec(content)) !== null) {
    const importPath = match[2];
    if (importPath.startsWith("@/components/ui/")) {
      registryDependencies.add(
        importPath
          .substring("@/components/ui/".length)
          .split("/")[0]
          .replace(/\.(tsx|ts)$/, ""),
      );
    } else if (importPath.startsWith("@/hooks/")) {
      registryDependencies.add(
        `hook:${importPath
          .substring("@/hooks/".length)
          .split("/")[0]
          .replace(/\.(tsx|ts)$/, "")}`,
      );
    } else if (importPath.startsWith("@/components/native/")) {
      registryDependencies.add(`native:${importPath.substring("@/components/native/".length)}`);
    } else if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
      const pkgName = getPackageName(importPath);
      if (!nodeBuiltins.has(pkgName) && pkgName !== "react" && pkgName !== "react-dom") {
        dependencies.add(pkgName);
      }
    }
  }

  while ((match = importSideEffectRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
      const pkgName = getPackageName(importPath);
      if (!nodeBuiltins.has(pkgName) && pkgName !== "react" && pkgName !== "react-dom") {
        dependencies.add(pkgName);
      }
    }
  }

  return {
    dependencies: Array.from(dependencies),
    registryDependencies: Array.from(registryDependencies),
  };
}

const registryItems = [];

// 1. UI primitives (src/components/ui/)
const uiDir = path.join("src", "components", "ui");
if (fs.existsSync(uiDir)) {
  for (const file of fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))) {
    const filePath = path.join(uiDir, file);
    if (fs.statSync(filePath).size === 0) continue;
    const { dependencies, registryDependencies } = scanFileDependencies(filePath);
    registryItems.push({
      name: file.replace(/\.(tsx|ts)$/, ""),
      type: "registry:ui",
      dependencies,
      registryDependencies,
      files: [
        {
          path: `components/ui/${file}`,
          content: fs.readFileSync(filePath, "utf-8"),
          type: "registry:ui",
        },
      ],
    });
  }
}

// 2. Hooks (src/hooks/)
const hooksDir = path.join("src", "hooks");
if (fs.existsSync(hooksDir)) {
  for (const file of fs.readdirSync(hooksDir).filter((f) => f.endsWith(".ts"))) {
    const filePath = path.join(hooksDir, file);
    if (fs.statSync(filePath).size === 0) continue;
    const { dependencies, registryDependencies } = scanFileDependencies(filePath);
    registryItems.push({
      name: file.replace(/\.ts$/, ""),
      type: "registry:hook",
      dependencies,
      registryDependencies,
      files: [
        {
          path: `hooks/${file}`,
          content: fs.readFileSync(filePath, "utf-8"),
          type: "registry:hook",
        },
      ],
    });
  }
}

// 3. Animated components and blocks (src/components/animated, src/components/blocks)
for (const [dirName, type] of [
  ["animated", "registry:ui"],
  ["blocks", "registry:block"],
]) {
  const dir = path.join("src", "components", dirName);
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"))) {
    const filePath = path.join(dir, file);
    const name = file.replace(/\.tsx$/, "");
    const { dependencies, registryDependencies } = scanFileDependencies(filePath);
    const content = fs.readFileSync(filePath, "utf-8");
    const animatedDeps = [
      ...content.matchAll(/from\s+["']@\/components\/animated\/([\w-]+)["']/g),
    ].map((m) => m[1]);
    registryItems.push({
      name,
      type,
      dependencies,
      registryDependencies: [...new Set([...registryDependencies, ...animatedDeps])].filter(
        (d) => d !== name,
      ),
      files: [{ path: `components/${dirName}/${file}`, content, type }],
    });
  }
}

// 4. React Native components (src/components/native). Published as `native-<name>`
//    with their shared files (theme, icon, portal…) inlined, so one add is enough.
const nativeDir = path.join("src", "components", "native");
if (fs.existsSync(nativeDir)) {
  for (const file of fs.readdirSync(nativeDir).filter((f) => /\.tsx?$/.test(f))) {
    const filePath = path.join(nativeDir, file);
    const base = file.replace(/\.(tsx|ts)$/, "");
    const { dependencies, registryDependencies } = scanFileDependencies(filePath);
    registryItems.push({
      name: `native-${base}`,
      type: "registry:ui",
      dependencies,
      registryDependencies: registryDependencies.filter((d) => d !== `native:${base}`),
      files: [
        {
          path: `components/native/${file}`,
          content: fs.readFileSync(filePath, "utf-8"),
          type: "registry:ui",
        },
      ],
    });
  }
}

// Inline local hook and native dependencies recursively
function resolveLocal(dep) {
  if (dep.startsWith("hook:")) {
    const hookName = dep.substring("hook:".length);
    for (const ext of [".ts", ".tsx"]) {
      const p = path.join("src", "hooks", `${hookName}${ext}`);
      if (fs.existsSync(p))
        return { file: p, rel: `hooks/${hookName}${ext}`, type: "registry:hook" };
    }
  } else if (dep.startsWith("native:")) {
    const rel = dep.substring("native:".length);
    for (const ext of [".tsx", ".ts"]) {
      const p = path.join(nativeDir, `${rel}${ext}`);
      if (fs.existsSync(p))
        return { file: p, rel: `components/native/${rel}${ext}`, type: "registry:ui" };
    }
  }
  return null;
}

for (const item of registryItems) {
  const filesMap = new Map(item.files.map((f) => [f.path, f]));
  const finalRegDeps = new Set();
  const finalDeps = new Set(item.dependencies);
  const queue = [...item.registryDependencies];
  const processed = new Set();

  while (queue.length > 0) {
    const dep = queue.shift();
    if (processed.has(dep)) continue;
    processed.add(dep);

    if (dep.startsWith("hook:") || dep.startsWith("native:")) {
      const local = resolveLocal(dep);
      if (!local) continue;
      if (!filesMap.has(local.rel)) {
        filesMap.set(local.rel, {
          path: local.rel,
          content: fs.readFileSync(local.file, "utf-8"),
          type: local.type,
        });
      }
      const sub = scanFileDependencies(local.file);
      sub.dependencies.forEach((d) => finalDeps.add(d));
      sub.registryDependencies.forEach((r) => queue.push(r));
    } else {
      finalRegDeps.add(dep);
    }
  }

  item.files = Array.from(filesMap.values());
  item.dependencies = Array.from(finalDeps);
  item.registryDependencies = Array.from(finalRegDeps);
}

// 5. Output shadcn registry JSONs
for (const item of registryItems) {
  const jsonContent = JSON.stringify(item, null, 2);
  fs.writeFileSync(path.join(REGISTRY_DIR, `${item.name}.json`), jsonContent);
  fs.writeFileSync(path.join(STYLES_DIR, `${item.name}.json`), jsonContent);
}

const indexContent = JSON.stringify(registryItems, null, 2);
fs.writeFileSync(path.join(REGISTRY_DIR, "index.json"), indexContent);
fs.writeFileSync(path.join(STYLES_DIR, "index.json"), indexContent);

console.log(`Successfully generated registry index with ${registryItems.length} components/hooks.`);
