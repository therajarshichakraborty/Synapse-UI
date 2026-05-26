import fs from "node:fs";
import path from "path";

const REGISTRY_DIR = path.join("public", "r");
const STYLES_DIR = path.join(REGISTRY_DIR, "styles", "default");

// Ensure target directories exist
fs.mkdirSync(STYLES_DIR, { recursive: true });

// Read package.json to match third-party dependencies
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const knownDeps = Object.keys(packageJson.dependencies || {});

// Utility to convert string to PascalCase
function pascalCase(str) {
  return str
    .replace(/[-_.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^(.)/, (c) => c.toUpperCase());
}

// Map subdirectories to categories in the docs registry
const CATEGORY_MAP = {
  "ai-inputs": "ai-input",
  "alerts": "alert",
  "badges": "badge",
  "buttons": "button",
  "cards": "card",
  "FAQs": "faq",
  "inputs": "input",
  "lists": "list",
  "popovers": "popover",
  "pricings": "pricing",
  "texts": "text",
  "tooltips": "tooltip",
  "blocks": "block",
};

// Scan imports to determine npm dependencies and registry dependencies
function scanFileDependencies(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const dependencies = new Set();
  const registryDependencies = new Set();

  // Match import statements with 'from' (supporting multi-line imports)
  const importFromRegex = /import\s+([^;]*?)\s+from\s+["']([^"']+)["']/g;
  // Match side-effect imports
  const importSideEffectRegex = /import\s+["']([^"']+)["']/g;

  function getPackageName(importPath) {
    if (importPath.startsWith("@")) {
      const parts = importPath.split("/");
      return parts.slice(0, 2).join("/");
    }
    return importPath.split("/")[0];
  }

  const nodeBuiltins = [
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
  ];

  let match;
  // Process imports with 'from'
  while ((match = importFromRegex.exec(content)) !== null) {
    const importPath = match[2];

    if (importPath.startsWith("@/components/ui/")) {
      const depName = importPath.substring("@/components/ui/".length).split("/")[0].replace(/\.(tsx|ts)$/, "");
      registryDependencies.add(depName);
    } else if (importPath.startsWith("@/hooks/")) {
      const depName = importPath.substring("@/hooks/".length).split("/")[0].replace(/\.(tsx|ts)$/, "");
      registryDependencies.add(`hook:${depName}`);
    } else if (importPath.startsWith("@/components/synapse-ui-components/")) {
      registryDependencies.add(`synapse:${importPath}`);
    } else if (importPath.startsWith("@/components/synapse-ui/")) {
      const mappedPath = importPath.replace("@/components/synapse-ui/", "@/components/synapse-ui-components/");
      registryDependencies.add(`synapse:${mappedPath}`);
    } else if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
      // Check if it's an NPM package dependency
      const pkgName = getPackageName(importPath);
      if (!nodeBuiltins.includes(pkgName) && pkgName !== "react" && pkgName !== "react-dom") {
        dependencies.add(pkgName);
      }
    }
  }

  // Process side-effect imports
  while ((match = importSideEffectRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
      const pkgName = getPackageName(importPath);
      if (!nodeBuiltins.includes(pkgName) && pkgName !== "react" && pkgName !== "react-dom") {
        dependencies.add(pkgName);
      }
    }
  }

  return {
    dependencies: Array.from(dependencies),
    registryDependencies: Array.from(registryDependencies),
  };
}

// Collect registry items
const registryItems = [];

// 1. Scan UI Primitives (src/components/ui/)
const uiDir = path.join("src", "components", "ui");
if (fs.existsSync(uiDir)) {
  const uiFiles = fs.readdirSync(uiDir).filter(f => f.endsWith(".tsx") || f.endsWith(".ts"));
  for (const file of uiFiles) {
    const filePath = path.join(uiDir, file);
    const stat = fs.statSync(filePath);
    if (stat.size === 0) continue;

    const name = file.replace(/\.(tsx|ts)$/, "");
    const { dependencies, registryDependencies } = scanFileDependencies(filePath);
    const content = fs.readFileSync(filePath, "utf-8");
    const registryContent = content.replace(/@\/components\/synapse-ui-components\//g, "@/components/synapse-ui/");

    registryItems.push({
      name,
      type: "registry:ui",
      dependencies,
      registryDependencies,
      files: [
        {
          path: `components/ui/${file}`,
          content: registryContent,
          type: "registry:ui",
        },
      ],
    });
  }
}

// 2. Scan Hooks (src/hooks/)
const hooksDir = path.join("src", "hooks");
if (fs.existsSync(hooksDir)) {
  const hooksFiles = fs.readdirSync(hooksDir).filter(f => f.endsWith(".ts"));
  for (const file of hooksFiles) {
    const filePath = path.join(hooksDir, file);
    const stat = fs.statSync(filePath);
    if (stat.size === 0) continue;

    const name = file.replace(/\.ts$/, "");
    const { dependencies, registryDependencies } = scanFileDependencies(filePath);
    const content = fs.readFileSync(filePath, "utf-8");
    const registryContent = content.replace(/@\/components\/synapse-ui-components\//g, "@/components/synapse-ui/");

    registryItems.push({
      name,
      type: "registry:hook",
      dependencies,
      registryDependencies,
      files: [
        {
          path: `hooks/${file}`,
          content: registryContent,
          type: "registry:hook",
        },
      ],
    });
  }
}

// Group of components to import in src/components/docs/registry.tsx
const docsRegistryDemos = {
  useAutoResizeTextarea: [],
};
Object.values(CATEGORY_MAP).forEach(cat => {
  docsRegistryDemos[cat] = [];
});

// Keep track of imports to generate in registry.tsx
const importsList = [];

// 3. Scan synapse-ui-components (src/components/synapse-ui-components/)
const synapseComponentsDir = path.join("src", "components", "synapse-ui-components");
if (fs.existsSync(synapseComponentsDir)) {
  const items = fs.readdirSync(synapseComponentsDir);
  for (const item of items) {
    const itemPath = path.join(synapseComponentsDir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const category = CATEGORY_MAP[item] || item;
      const childFiles = fs.readdirSync(itemPath);

      if (item === "blocks") {
        // Under blocks, check for subfolders like blocks/ai-card-generation/
        for (const blockDirName of childFiles) {
          const blockDirPath = path.join(itemPath, blockDirName);
          if (fs.statSync(blockDirPath).isDirectory()) {
            const blockFiles = fs.readdirSync(blockDirPath).filter(f => f.endsWith(".tsx") || f.endsWith(".ts"));
            const filesPayload = [];
            const allDeps = new Set();
            const allRegDeps = new Set();
            let mainBlockFile = null;
            let mainBlockFileContent = "";

            for (const file of blockFiles) {
              const filePath = path.join(blockDirPath, file);
              const fileStat = fs.statSync(filePath);
              if (fileStat.size === 0) continue;

              const content = fs.readFileSync(filePath, "utf-8");
              const registryContent = content.replace(/@\/components\/synapse-ui-components\//g, "@/components/synapse-ui/");
              const { dependencies, registryDependencies } = scanFileDependencies(filePath);

              dependencies.forEach(d => allDeps.add(d));
              registryDependencies.forEach(r => allRegDeps.add(r));

              filesPayload.push({
                path: `components/synapse-ui/blocks/${blockDirName}/${file}`,
                content: registryContent,
                type: "registry:ui",
              });

              if (file === `${blockDirName}.tsx` || file === "index.tsx") {
                mainBlockFile = file;
                mainBlockFileContent = content;
              }
            }

            if (filesPayload.length === 0) continue;

            const name = `block-${blockDirName}`;
            const registryItem = {
              name,
              type: "registry:ui",
              dependencies: Array.from(allDeps),
              registryDependencies: Array.from(allRegDeps),
              files: filesPayload,
            };
            registryItems.push(registryItem);

            // Register in docs if there's a main block file
            if (mainBlockFile) {
              const exportName = pascalCase(blockDirName);
              const uniqueImportName = "Block_" + blockDirName.replace(/[-.]/g, "_");

              importsList.push({
                uniqueName: uniqueImportName,
                originalName: exportName,
                path: `@/components/synapse-ui-components/blocks/${blockDirName}/${mainBlockFile.replace(/\.tsx$/, "")}`,
                isDefault: true,
              });

              let previewClassName = "min-h-[600px] w-full max-w-4xl overflow-auto";
              if (blockDirName === "ai-card-generation") {
                previewClassName = "min-h-[550px] w-full max-w-md overflow-auto";
              } else if (blockDirName.startsWith("landing-") || blockDirName === "saas-landing") {
                previewClassName = "min-h-[600px] w-full max-w-5xl overflow-auto";
              }

              docsRegistryDemos["block"].push({
                id: name,
                title: pascalCase(blockDirName.replace(/-/g, " ")),
                uniqueName: uniqueImportName,
                originalName: exportName,
                previewClassName,
                code: mainBlockFileContent.replace(/@\/components\/synapse-ui-components\//g, "@/components/synapse-ui/"),
              });
            }
          }
        }
      } else {
        // Normal component directories (ai-inputs, buttons, alerts, etc.)
        for (const file of childFiles) {
          if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue;
          const filePath = path.join(itemPath, file);
          const fileStat = fs.statSync(filePath);
          if (fileStat.size === 0) continue;

          const name = file.replace(/\.(tsx|ts)$/, "");
          const content = fs.readFileSync(filePath, "utf-8");
          const registryContent = content.replace(/@\/components\/synapse-ui-components\//g, "@/components/synapse-ui/");
          const { dependencies, registryDependencies } = scanFileDependencies(filePath);

          const registryItem = {
            name,
            type: "registry:ui",
            dependencies,
            registryDependencies,
            files: [
              {
                path: `components/synapse-ui/${item}/${file}`,
                content: registryContent,
                type: "registry:ui",
              },
            ],
          };
          registryItems.push(registryItem);

          // Now parse the file to see how it's exported for docs imports
          let isDefault = false;
          let exportName = "";

          const defaultFuncMatch = content.match(/export\s+default\s+function\s+(\w+)/);
          const defaultClassMatch = content.match(/export\s+default\s+class\s+(\w+)/);
          const defaultConstMatch = content.match(/export\s+default\s+const\s+(\w+)/);
          const defaultSimpleMatch = content.match(/export\s+default\s+(\w+)/);

          if (defaultFuncMatch) {
            exportName = defaultFuncMatch[1];
            isDefault = true;
          } else if (defaultClassMatch) {
            exportName = defaultClassMatch[1];
            isDefault = true;
          } else if (defaultConstMatch) {
            exportName = defaultConstMatch[1];
            isDefault = true;
          } else if (defaultSimpleMatch && defaultSimpleMatch[1] !== "function" && defaultSimpleMatch[1] !== "class") {
            exportName = defaultSimpleMatch[1];
            isDefault = true;
          } else if (content.includes("export default")) {
            isDefault = true;
            exportName = pascalCase(name);
          } else {
            const namedFuncMatch = content.match(/export\s+function\s+(\w+)/);
            const namedConstMatch = content.match(/export\s+const\s+(\w+)/);
            if (namedFuncMatch) {
              exportName = namedFuncMatch[1];
            } else if (namedConstMatch) {
              exportName = namedConstMatch[1];
            } else {
              exportName = pascalCase(name);
            }
          }

          const uniqueImportName = pascalCase(category) + "_" + name.replace(/[-.]/g, "_");

          importsList.push({
            uniqueName: uniqueImportName,
            originalName: exportName,
            path: `@/components/synapse-ui-components/${item}/${name}`,
            isDefault,
          });

          // Set default preview layout based on category
          let previewClassName = "min-h-[120px]";
          let extraProps = "";
          if (category === "ai-input") previewClassName = "min-h-[200px] w-full max-w-2xl";
          else if (category === "alert") previewClassName = "min-h-[120px] w-full max-w-lg";
          else if (category === "badge") {
            previewClassName = "min-h-[120px] flex justify-center items-center gap-2";
            if (name === "status-badge") {
              extraProps = 'props: { children: "Online", status: "online" }, ';
            } else if (name === "count-badge") {
              extraProps = 'props: { count: 8 }, ';
            } else if (name === "gradient-badge") {
              extraProps = 'props: { children: "Gradient" }, ';
            } else if (name === "icon-badge") {
              extraProps = 'props: { icon: <span>✨</span> }, ';
            } else if (name === "notification-badge") {
              extraProps = 'props: { count: 4, showZero: true }, ';
            } else if (name === "outline-badge") {
              extraProps = 'props: { children: "Outline" }, ';
            } else if (name === "pill-badge") {
              extraProps = 'props: { children: "Pill Badge" }, ';
            } else if (name === "tag-badge") {
              extraProps = 'props: { children: "Tag" }, ';
            } else if (name === "multi-color-badge") {
              extraProps = 'props: { segments: [{ label: "Beta", color: "blue" }, { label: "v1.0", color: "zinc" }] }, ';
            } else if (name === "animated-badge") {
              extraProps = 'props: { children: "Animated" }, ';
            }
          }
          else if (category === "popover") {
            previewClassName = "min-h-[260px] flex justify-center items-center";
            if (name === "color-popover") {
              extraProps = 'props: { children: <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50">Pick Color</button> }, ';
            } else if (name === "action-popover") {
              extraProps = 'props: { children: <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50">Actions</button> }, ';
            } else if (name === "form-popover") {
              extraProps = 'props: { children: <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50">Feedback</button>, fields: [{ name: "email", label: "Email Address", type: "email", placeholder: "you@example.com", required: true }, { name: "message", label: "Feedback", type: "textarea", placeholder: "What can we improve?", required: true }] }, ';
            } else if (name === "menu-popover") {
              extraProps = 'props: { children: <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50">Open Menu</button>, items: [{ label: "Profile", shortcut: "⇧⌘P" }, { label: "Settings", shortcut: "⌘S" }, { label: "Billing", shortcut: "⌘B" }, { label: "Logout", danger: true }] }, ';
            } else if (name === "user-popover") {
              extraProps = 'props: { children: <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50">User Profile</button>, user: { name: "Sarah Connor", username: "sarah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", bio: "Tech enthusiast. Building the future of AI interfaces at Synapse UI.", location: "Los Angeles, CA", joinDate: "Joined Jan 2024", stats: [{ label: "Followers", value: 1240 }, { label: "Following", value: 480 }] } }, ';
            }
          }
          else if (category === "tooltip") {
            previewClassName = "min-h-[120px] flex justify-center items-center";
            if (name === "basic-tooltip") {
              extraProps = 'props: { children: <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50">Hover me</button>, content: "This is a simple tooltip" }, ';
            } else if (name === "hotkey-tooltip") {
              extraProps = 'props: { children: <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50">Save</button>, content: "Save file", keys: ["⌘", "S"] }, ';
            } else if (name === "icon-tooltip") {
              extraProps = 'props: { children: <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50">Info</button>, content: "Helpful icon description info." }, ';
            } else if (name === "progress-tooltip") {
              extraProps = 'props: { children: <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50">Downloading</button>, label: "Status update", value: 65 }, ';
            } else if (name === "rich-tooltip") {
              extraProps = 'props: { children: <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50">Analytics</button>, title: "Performance Data", description: "Real-time user analytics and session details." }, ';
            }
          }
          else if (category === "button") previewClassName = "min-h-[120px] flex justify-center items-center";
          else if (category === "card") {
            previewClassName = "min-h-[200px] w-full max-w-md";
            extraProps = "props: { href: '#' }, ";
          } else if (category === "faq") previewClassName = "min-h-[200px] w-full max-w-2xl";
          else if (category === "input") previewClassName = "min-h-[80px] w-full max-w-md";
          else if (category === "list") previewClassName = "min-h-[200px] w-full max-w-md";
          else if (category === "pricing") previewClassName = "min-h-[200px] w-full max-w-2xl";
          else if (category === "text") {
            previewClassName = "min-h-[80px] w-full";
            extraProps = "props: { text: 'Synapse UI' }, ";
          }

          docsRegistryDemos[category].push({
            id: name,
            title: pascalCase(name.replace(/-/g, " ")),
            uniqueName: uniqueImportName,
            originalName: exportName,
            previewClassName,
            extraProps,
            code: content.replace(/@\/components\/synapse-ui-components\//g, "@/components/synapse-ui/"),
          });
        }
      }
    } else if (item.endsWith(".tsx") || item.endsWith(".ts")) {
      // Standalone file in synapse-ui-components like action-search-bar.tsx
      const fileStat = fs.statSync(itemPath);
      if (fileStat.size > 0) {
        const name = item.replace(/\.(tsx|ts)$/, "");
        const content = fs.readFileSync(itemPath, "utf-8");
        const registryContent = content.replace(/@\/components\/synapse-ui-components\//g, "@/components/synapse-ui/");
        const { dependencies, registryDependencies } = scanFileDependencies(itemPath);

        const registryItem = {
          name,
          type: "registry:ui",
          dependencies,
          registryDependencies,
          files: [
            {
              path: `components/synapse-ui/${item}`,
              content: registryContent,
              type: "registry:ui",
            },
          ],
        };
        registryItems.push(registryItem);
      }
    }
  }
}

// Post-process registryItems to recursively inline local hook and synapse-component dependencies
for (const item of registryItems) {
  const filesMap = new Map();
  item.files.forEach(f => filesMap.set(f.path, f));
  
  const finalRegDeps = new Set();
  const finalDeps = new Set(item.dependencies);
  
  const queue = [...item.registryDependencies];
  const processed = new Set();
  
  while (queue.length > 0) {
    const dep = queue.shift();
    if (processed.has(dep)) continue;
    processed.add(dep);
    
    if (dep.startsWith("hook:")) {
      const hookName = dep.substring("hook:".length);
      let hookPath = path.join("src", "hooks", `${hookName}.ts`);
      let relativePath = `hooks/${hookName}.ts`;
      if (!fs.existsSync(hookPath)) {
        hookPath = path.join("src", "hooks", `${hookName}.tsx`);
        relativePath = `hooks/${hookName}.tsx`;
      }
      
      if (fs.existsSync(hookPath)) {
        const fileContent = fs.readFileSync(hookPath, "utf-8");
        const registryContent = fileContent.replace(/@\/components\/synapse-ui-components\//g, "@/components/synapse-ui/");
        
        filesMap.set(relativePath, {
          path: relativePath,
          content: registryContent,
          type: "registry:hook",
        });
        
        const subDeps = scanFileDependencies(hookPath);
        subDeps.dependencies.forEach(d => finalDeps.add(d));
        subDeps.registryDependencies.forEach(r => queue.push(r));
      }
    } else if (dep.startsWith("synapse:")) {
      const importPath = dep.substring("synapse:".length);
      const relativePart = importPath.substring("@/components/synapse-ui-components/".length);
      
      let compPath = "";
      let relativePath = "";
      
      const possiblePaths = [
        path.join("src", "components", "synapse-ui-components", `${relativePart}.tsx`),
        path.join("src", "components", "synapse-ui-components", `${relativePart}.ts`),
        path.join("src", "components", "synapse-ui-components", relativePart, `index.tsx`),
        path.join("src", "components", "synapse-ui-components", relativePart, `index.ts`),
      ];
      
      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          compPath = p;
          const ext = p.endsWith(".tsx") ? ".tsx" : ".ts";
          relativePath = `components/synapse-ui/${relativePart}${p.endsWith("index.tsx") || p.endsWith("index.ts") ? "/index" : ""}${ext}`;
          break;
        }
      }
      
      if (compPath && fs.existsSync(compPath)) {
        const fileContent = fs.readFileSync(compPath, "utf-8");
        const registryContent = fileContent.replace(/@\/components\/synapse-ui-components\//g, "@/components/synapse-ui/");
        
        filesMap.set(relativePath, {
          path: relativePath,
          content: registryContent,
          type: "registry:ui",
        });
        
        const subDeps = scanFileDependencies(compPath);
        subDeps.dependencies.forEach(d => finalDeps.add(d));
        subDeps.registryDependencies.forEach(r => queue.push(r));
      }
    } else {
      finalRegDeps.add(dep);
    }
  }
  
  item.files = Array.from(filesMap.values());
  item.dependencies = Array.from(finalDeps);
  item.registryDependencies = Array.from(finalRegDeps);
}

// 4. Output shadcn registry JSONs
// Individual component files
for (const item of registryItems) {
  const jsonContent = JSON.stringify(item, null, 2);
  fs.writeFileSync(path.join(REGISTRY_DIR, `${item.name}.json`), jsonContent);
  fs.writeFileSync(path.join(STYLES_DIR, `${item.name}.json`), jsonContent);
}

// Index JSON
const indexContent = JSON.stringify(registryItems, null, 2);
fs.writeFileSync(path.join(REGISTRY_DIR, "index.json"), indexContent);
fs.writeFileSync(path.join(STYLES_DIR, "index.json"), indexContent);

console.log(`Successfully generated registry index with ${registryItems.length} components/hooks.`);

// 5. Generate src/components/docs/registry.tsx
const generatedImports = importsList
  .map(imp => {
    if (imp.isDefault) {
      return `import ${imp.uniqueName} from "${imp.path}";`;
    } else {
      return `import { ${imp.originalName} as ${imp.uniqueName} } from "${imp.path}";`;
    }
  })
  .join("\n");

let demosDeclaration = "export const demos: Record<DemoCategory, DemoEntry[]> = {\n";
for (const [category, items] of Object.entries(docsRegistryDemos)) {
  demosDeclaration += `  "${category}": [\n`;
  for (const item of items) {
    if (category === "block") {
      demosDeclaration += `    demo(
      "${item.id}",
      "${item.title}",
      ${item.uniqueName},
      ${JSON.stringify(item.code)},
      { previewClassName: "${item.previewClassName}" }
    ),\n`;
    } else {
      demosDeclaration += `    demo(
      "${item.id}",
      "${item.title}",
      ${item.uniqueName},
      ${JSON.stringify(item.code)},
      { ${item.extraProps}previewClassName: "${item.previewClassName}" }
    ),\n`;
    }
  }
  // If useAutoResizeTextarea, preserve its hardcoded demo from original registry
  if (category === "useAutoResizeTextarea") {
    demosDeclaration += `    {
      id: "use-auto-resize-textarea",
      title: "Live demo",
      component: UseAutoResizeTextareaDemo,
      code: \`"use client";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

export default function ChatInput() {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 200,
  });

  return (
    <textarea
      ref={textareaRef}
      onInput={() => adjustHeight()}
      placeholder="Type a message..."
      className="w-full resize-none rounded-xl border px-4 py-3"
    />
  );
}\`,
      previewClassName: "min-h-[120px] w-full max-w-md",
    },\n`;
  }
  demosDeclaration += `  ],\n`;
}
demosDeclaration += "};\n";

const registryFileContent = `"use client";

import type { ComponentType } from "react";

${generatedImports}

import { UseAutoResizeTextareaDemo } from "./use-auto-resize-textarea-demo";

export type DemoEntry = {
  id: string;
  title: string;
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  props?: Record<string, unknown>;
  previewClassName?: string;
};

export type DemoCategory =
  | "ai-input"
  | "alert"
  | "badge"
  | "button"
  | "card"
  | "faq"
  | "input"
  | "list"
  | "popover"
  | "pricing"
  | "text"
  | "tooltip"
  | "block"
  | "useAutoResizeTextarea";

function demo(
  id: string,
  title: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>,
  code: string,
  options?: Pick<DemoEntry, "props" | "previewClassName">,
): DemoEntry {
  return { id, title, component, code, ...options };
}

${demosDeclaration}
`;

fs.writeFileSync(path.join("src", "components", "docs", "registry.tsx"), registryFileContent);
console.log("Successfully generated src/components/docs/registry.tsx");
