#!/usr/bin/env node
// Synapse UI CLI: add components from the Synapse registry into your project.
// Zero dependencies. Requires Node 18+ (global fetch).
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const DEFAULT_REGISTRY = process.env.SYNAPSE_REGISTRY ?? "https://synapse-ui.vercel.app/r";
const BASE_DEPS = [
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
  "lucide-react",
  "motion",
  "radix-ui",
  "tw-animate-css",
];

const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  blue: (s) => `\x1b[34m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const flags = {};
  const names = [];
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = rest[i + 1];
      if (next && !next.startsWith("-") && ["cwd", "registry", "css"].includes(key)) {
        flags[key] = next;
        i++;
      } else flags[key] = true;
    } else if (a === "-y") flags.yes = true;
    else names.push(a);
  }
  return { command, names, flags };
}

function detectPm(cwd) {
  if (fs.existsSync(path.join(cwd, "bun.lock")) || fs.existsSync(path.join(cwd, "bun.lockb")))
    return "bun";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

function install(cwd, deps, dryRun) {
  const pkgPath = path.join(cwd, "package.json");
  const pkg = fs.existsSync(pkgPath) ? JSON.parse(fs.readFileSync(pkgPath, "utf-8")) : {};
  const have = { ...pkg.dependencies, ...pkg.devDependencies };
  const missing = deps.filter((d) => !have[d] && d !== "next" && d !== "react");
  if (!missing.length) return;
  const pm = detectPm(cwd);
  const cmd = `${pm} ${pm === "npm" ? "install" : "add"} ${missing.join(" ")}`;
  console.log(c.dim(`$ ${cmd}`));
  if (!dryRun) execSync(cmd, { cwd, stdio: "inherit" });
}

function srcRoot(cwd) {
  return fs.existsSync(path.join(cwd, "src")) ? path.join(cwd, "src") : cwd;
}

async function fetchItem(registry, name) {
  const res = await fetch(`${registry.replace(/\/$/, "")}/${name}.json`);
  if (!res.ok) throw new Error(`"${name}" was not found in the registry (${res.status}).`);
  return res.json();
}

async function add({ names, flags }) {
  if (!names.length) {
    console.error(c.red("Usage: synapse-ui add <component...>"));
    process.exit(1);
  }
  const cwd = path.resolve(flags.cwd ?? process.cwd());
  const registry = flags.registry ?? DEFAULT_REGISTRY;
  const queue = [...names];
  const seen = new Set();
  const deps = new Set();
  const written = [];

  while (queue.length) {
    const name = queue.shift();
    if (seen.has(name) || name === "utils") continue;
    seen.add(name);
    const item = await fetchItem(registry, name);
    for (const d of item.dependencies ?? []) deps.add(d);
    for (const r of item.registryDependencies ?? []) queue.push(r.replace(/^hook:/, ""));
    for (const file of item.files ?? []) {
      const target = path.join(srcRoot(cwd), file.path);
      if (fs.existsSync(target) && !flags.overwrite) {
        console.log(c.dim(`  skip ${path.relative(cwd, target)} (exists, use --overwrite)`));
        continue;
      }
      written.push(path.relative(cwd, target));
      if (!flags["dry-run"]) {
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, file.content);
      }
    }
  }

  ensureUtils(cwd, flags["dry-run"]);
  install(cwd, [...deps], flags["dry-run"]);
  console.log(
    c.green(`✔ ${flags["dry-run"] ? "Would write" : "Wrote"} ${written.length} file(s):`),
  );
  for (const f of written) console.log(`  ${c.blue(f)}`);
}

function ensureUtils(cwd, dryRun) {
  const target = path.join(srcRoot(cwd), "lib", "utils.ts");
  if (fs.existsSync(target)) return;
  console.log(c.dim(`  create ${path.relative(cwd, target)}`));
  if (dryRun) return;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(
    target,
    `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`,
  );
}

async function init({ flags }) {
  const cwd = path.resolve(flags.cwd ?? process.cwd());
  const registry = flags.registry ?? DEFAULT_REGISTRY;
  const candidates = [
    flags.css,
    "src/app/globals.css",
    "app/globals.css",
    "src/index.css",
    "src/styles/globals.css",
  ].filter(Boolean);
  const css = candidates.map((p) => path.join(cwd, p)).find((p) => fs.existsSync(p));
  ensureUtils(cwd, flags["dry-run"]);
  install(cwd, BASE_DEPS, flags["dry-run"]);
  try {
    const res = await fetch(`${registry.replace(/\/$/, "")}/../tokens.css`);
    if (res.ok && css && !flags["dry-run"]) {
      const tokens = await res.text();
      const current = fs.readFileSync(css, "utf-8");
      if (!current.includes("Synapse UI design tokens"))
        fs.writeFileSync(css, `${current}\n\n${tokens}`);
      console.log(c.green(`✔ Added design tokens to ${path.relative(cwd, css)}`));
    } else if (!css) {
      console.log(c.dim("  No global stylesheet found. Copy the tokens from /docs/theming."));
    }
  } catch {
    console.log(c.dim("  Could not download tokens. Copy them from /docs/theming."));
  }
  console.log(c.green("✔ Synapse UI is ready. Try: npx synapse-ui add button"));
}

async function list({ flags }) {
  const registry = flags.registry ?? DEFAULT_REGISTRY;
  const res = await fetch(`${registry.replace(/\/$/, "")}/index.json`);
  const items = await res.json();
  const groups = {};
  for (const item of items) (groups[item.type] ??= []).push(item.name);
  for (const [type, names] of Object.entries(groups)) {
    console.log(c.bold(type));
    console.log(`  ${names.sort().join(", ")}\n`);
  }
}

const help = `${c.bold("synapse-ui")}: add Synapse UI components to your project

  ${c.blue("init")}                 Install base dependencies, add cn() and design tokens
  ${c.blue("add")} <name...>        Add components and their dependencies
  ${c.blue("list")}                 List every available item

Options: --cwd <path>  --registry <url>  --overwrite  --dry-run  -y`;

const args = parseArgs(process.argv.slice(2));
const commands = { add, init, list };

if (!args.command || args.flags.help || !commands[args.command]) {
  console.log(help);
} else {
  commands[args.command](args).catch((err) => {
    console.error(c.red(`✖ ${err.message}`));
    process.exit(1);
  });
}
