#!/usr/bin/env node
// Synapse UI CLI: add Synapse UI components to a project that already uses shadcn/ui.
// Zero dependencies. Node 18+ (global fetch).
//
//   npx synapseui@latest add native-fab
//   npx synapseui@latest add dialog marquee
//   npx synapseui@latest add --all            every web component -> components/synapse-ui
//   npx synapseui@latest add --all --native   every React Native component -> components/native
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { execSync } from "node:child_process";

const VERSION = "0.2.0";
const DEFAULT_REGISTRY = process.env.SYNAPSE_REGISTRY ?? "https://synapse-ui-dev.vercel.app/r";

const tty = process.stdout.isTTY;
const paint = (code) => (s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : String(s));
const c = {
  dim: paint(2),
  bold: paint(1),
  blue: paint(34),
  green: paint(32),
  red: paint(31),
  yellow: paint(33),
};

class CliError extends Error {}

/* ── args ─────────────────────────────────────────────────────────────── */
const VALUE_FLAGS = new Set(["cwd", "registry"]);
function parseArgs(argv) {
  const [command, ...rest] = argv;
  const flags = {};
  const names = [];
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === "-y") flags.yes = true;
    else if (a === "-o") flags.overwrite = true;
    else if (a === "-a") flags.all = true;
    else if (a === "-h") flags.help = true;
    else if (a.startsWith("--")) {
      const [key, inline] = a.slice(2).split("=");
      if (VALUE_FLAGS.has(key)) flags[key] = inline ?? rest[++i];
      else flags[key] = true;
    } else names.push(a);
  }
  return { command, names, flags };
}

/* ── project ──────────────────────────────────────────────────────────── */
/** JSON.parse that tolerates comments and trailing commas (tsconfig.json), string-aware. */
function readJson(file) {
  const src = fs.readFileSync(file, "utf-8");
  let out = "";
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '"') {
      let j = i + 1;
      while (j < src.length && src[j] !== '"') j += src[j] === "\\" ? 2 : 1;
      out += src.slice(i, j + 1);
      i = j;
    } else if (ch === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
      out += "\n";
    } else if (ch === "/" && src[i + 1] === "*") {
      i = src.indexOf("*/", i + 2);
      if (i === -1) break;
      i++;
    } else out += ch;
  }
  return JSON.parse(out.replace(/,(\s*[}\]])/g, "$1"));
}

/** shadcn must be set up first. Synapse never scaffolds an app or runs `shadcn init`. */
function loadProject(cwd) {
  if (!fs.existsSync(path.join(cwd, "package.json"))) {
    throw new CliError(`No package.json in ${cwd}. Run this inside your app (or pass --cwd).`);
  }
  const configPath = path.join(cwd, "components.json");
  if (!fs.existsSync(configPath)) {
    throw new CliError(
      `No components.json found. Synapse UI installs into projects that already use shadcn/ui.\n` +
        `  Set it up first:  ${c.bold("npx shadcn@latest init")}\n` +
        `  Then run this command again.`,
    );
  }
  const config = readJson(configPath);
  const aliases = {
    components: config.aliases?.components ?? "@/components",
    utils: config.aliases?.utils ?? "@/lib/utils",
    hooks: config.aliases?.hooks ?? "@/hooks",
  };
  return { cwd, config, aliases, resolveAlias: makeResolver(cwd) };
}

/** Maps an import alias (e.g. "@/components") to a folder using tsconfig/jsconfig paths. */
function makeResolver(cwd) {
  let paths = {};
  let baseUrl = ".";
  for (const name of ["tsconfig.json", "jsconfig.json"]) {
    const p = path.join(cwd, name);
    if (!fs.existsSync(p)) continue;
    try {
      const opts = readJson(p).compilerOptions ?? {};
      paths = opts.paths ?? {};
      baseUrl = opts.baseUrl ?? ".";
    } catch {}
    break;
  }
  const hasSrc = fs.existsSync(path.join(cwd, "src"));
  return (alias) => {
    for (const [pattern, targets] of Object.entries(paths)) {
      const prefix = pattern.replace(/\*$/, "");
      if (pattern.endsWith("*") && alias.startsWith(prefix) && targets?.[0]) {
        return path.join(cwd, baseUrl, targets[0].replace(/\*$/, ""), alias.slice(prefix.length));
      }
    }
    // Fallback: "@/x" -> src/x when there is a src folder, else ./x.
    return path.join(cwd, hasSrc ? "src" : "", alias.replace(/^[@~]\//, ""));
  };
}

/** Where a registry target lands, honouring the project's aliases. */
function destination(project, target) {
  if (target.startsWith("~/")) return path.join(project.cwd, target.slice(2));
  const { resolveAlias, aliases } = project;
  if (target.startsWith("components/"))
    return path.join(resolveAlias(aliases.components), target.slice(11));
  if (target.startsWith("hooks/")) return path.join(resolveAlias(aliases.hooks), target.slice(6));
  if (target.startsWith("lib/"))
    return path.join(resolveAlias(path.dirname(aliases.utils)), target.slice(4));
  return path.join(resolveAlias("@/"), target);
}

/** Rewrites the registry's "@/..." imports to the project's aliases. */
function transformImports(code, aliases) {
  return code
    .replace(/(["'])@\/lib\/utils\1/g, `$1${aliases.utils}$1`)
    .replace(/(["'])@\/components\//g, `$1${aliases.components}/`)
    .replace(/(["'])@\/hooks\//g, `$1${aliases.hooks}/`);
}

function ensureUtils(project, dryRun) {
  const file = path.join(project.resolveAlias(project.aliases.utils) + ".ts");
  if (fs.existsSync(file) || fs.existsSync(file.replace(/\.ts$/, ".js"))) return null;
  if (!dryRun) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(
      file,
      `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`,
    );
  }
  return path.relative(project.cwd, file);
}

/* ── package manager ──────────────────────────────────────────────────── */
function detectPm(cwd) {
  const ua = process.env.npm_config_user_agent ?? "";
  for (let dir = cwd; ; dir = path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, "bun.lock")) || fs.existsSync(path.join(dir, "bun.lockb")))
      return "bun";
    if (fs.existsSync(path.join(dir, "pnpm-lock.yaml"))) return "pnpm";
    if (fs.existsSync(path.join(dir, "yarn.lock"))) return "yarn";
    if (fs.existsSync(path.join(dir, "package-lock.json"))) return "npm";
    if (path.dirname(dir) === dir) break;
  }
  if (ua.startsWith("pnpm")) return "pnpm";
  if (ua.startsWith("bun")) return "bun";
  if (ua.startsWith("yarn")) return "yarn";
  return "npm";
}

function installPackages(project, packages, { dryRun, native }) {
  const pkg = readJson(path.join(project.cwd, "package.json"));
  const have = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
  const missing = [...packages].filter((p) => !have[p]).sort();
  if (!missing.length) return [];
  const isExpo = Boolean(have.expo);
  const pm = detectPm(project.cwd);
  const cmd =
    native && isExpo
      ? `npx expo install ${missing.join(" ")}`
      : `${pm} ${pm === "npm" ? "install" : "add"} ${missing.join(" ")}`;
  console.log(c.dim(`$ ${cmd}`));
  if (!dryRun) execSync(cmd, { cwd: project.cwd, stdio: "inherit" });
  return missing;
}

/* ── registry ─────────────────────────────────────────────────────────── */
async function fetchJson(url) {
  let res;
  try {
    res = await fetch(url);
  } catch {
    throw new CliError(`Could not reach ${url}. Check your connection or --registry.`);
  }
  if (!res.ok) throw new CliError(`${url} returned ${res.status}.`);
  return res.json();
}

const itemUrl = (registry, ref) =>
  /^https?:\/\//.test(ref) ? ref : `${registry}/${ref.replace(/\.json$/, "")}.json`;

/** Fetches the items and everything they depend on (each once). */
async function resolveItems(registry, refs) {
  const seen = new Map();
  const queue = refs.map((r) => itemUrl(registry, r));
  while (queue.length) {
    const batch = queue.splice(0, 8).filter((u) => !seen.has(u));
    batch.forEach((u) => seen.set(u, null));
    const results = await Promise.all(
      batch.map((u) =>
        fetchJson(u).catch((e) => {
          const name = path.basename(u, ".json");
          throw new CliError(
            e.message.includes("404")
              ? `"${name}" is not in the Synapse UI registry. Run ${c.bold("synapseui list")} to see every item.`
              : e.message,
          );
        }),
      ),
    );
    batch.forEach((u, i) => {
      seen.set(u, results[i]);
      for (const dep of results[i].registryDependencies ?? []) {
        const depUrl = itemUrl(registry, dep);
        if (!seen.has(depUrl)) queue.push(depUrl);
      }
    });
  }
  return [...seen.values()];
}

async function confirm(question) {
  if (!process.stdin.isTTY) return true;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await rl.question(`${question} ${c.dim("(y/N)")} `)).trim().toLowerCase();
  rl.close();
  return answer === "y" || answer === "yes";
}

/* ── commands ─────────────────────────────────────────────────────────── */
async function add({ names, flags }) {
  const registry = (flags.registry ?? DEFAULT_REGISTRY).replace(/\/$/, "");
  const project = loadProject(path.resolve(flags.cwd ?? process.cwd()));
  const dryRun = Boolean(flags["dry-run"]);

  let refs = names;
  if (flags.all) refs = [flags.native ? "all-native" : "all", ...names];
  if (!refs.length) {
    throw new CliError(
      `Name at least one component, e.g. ${c.bold("synapseui add button")}, or use --all.`,
    );
  }

  console.log(c.dim(`Resolving ${refs.join(", ")} from ${registry}`));
  const items = await resolveItems(registry, refs);
  const files = items.flatMap((item) => item.files ?? []);
  const packages = new Set(items.flatMap((item) => item.dependencies ?? []));
  const native = items.some((item) => item.meta?.category === "native");

  // Plan writes and find conflicts.
  const plan = [];
  const unique = new Map(files.map((f) => [f.target ?? f.path, f]));
  for (const [target, file] of unique) {
    const dest = destination(project, target);
    const content = transformImports(file.content, project.aliases);
    const exists = fs.existsSync(dest);
    const same = exists && fs.readFileSync(dest, "utf-8") === content;
    plan.push({ dest, content, exists, same });
  }
  const conflicts = plan.filter((p) => p.exists && !p.same);
  let overwrite = Boolean(flags.overwrite);
  if (conflicts.length && !overwrite && !flags.yes && !dryRun) {
    console.log(c.yellow(`${conflicts.length} file(s) already exist and differ:`));
    for (const p of conflicts.slice(0, 10)) console.log(`  ${path.relative(project.cwd, p.dest)}`);
    overwrite = await confirm("Overwrite them?");
  }

  const written = [];
  const skipped = [];
  for (const p of plan) {
    const rel = path.relative(project.cwd, p.dest);
    if (p.same) continue;
    if (p.exists && !overwrite) {
      skipped.push(rel);
      continue;
    }
    if (!dryRun) {
      fs.mkdirSync(path.dirname(p.dest), { recursive: true });
      fs.writeFileSync(p.dest, p.content);
    }
    written.push(rel);
  }

  const utils = !native ? ensureUtils(project, dryRun) : null;
  if (utils) {
    written.push(utils);
    packages.add("clsx");
    packages.add("tailwind-merge");
  }
  const installed = installPackages(project, packages, { dryRun, native });

  if (!written.length && !installed.length && !skipped.length) {
    console.log(c.green("✔ Already up to date."));
    return;
  }
  const verb = dryRun ? "Would write" : "Wrote";
  const pkgs = installed.length
    ? c.dim(`, ${dryRun ? "would install" : "installed"} ${installed.length} package(s)`)
    : "";
  console.log(c.green(`✔ ${verb} ${written.length} file(s)`) + pkgs);
  for (const f of written.slice(0, 40)) console.log(`  ${c.blue(f)}`);
  if (written.length > 40) console.log(c.dim(`  …and ${written.length - 40} more`));
  if (skipped.length) {
    console.log(
      c.yellow(
        `• Skipped ${skipped.length} existing file(s). Re-run with --overwrite to replace them.`,
      ),
    );
  }
  const web = items.some((item) => ["web", "block"].includes(item.meta?.category));
  if (web && !hasTokens(stylesheet(project))) {
    console.log(
      c.yellow(
        `• Synapse design tokens are missing. Run ${c.bold("npx synapseui@latest init")} once.`,
      ),
    );
  }
}

function stylesheet(project) {
  const css = project.config.tailwind?.css;
  return css ? path.join(project.cwd, css) : null;
}
const TOKENS_MARKER = "Synapse UI design tokens";
const hasTokens = (file) =>
  Boolean(file) && fs.existsSync(file) && fs.readFileSync(file, "utf-8").includes(TOKENS_MARKER);

/** Appends the Synapse design tokens to the stylesheet named in components.json. */
async function init({ flags }) {
  const registry = (flags.registry ?? DEFAULT_REGISTRY).replace(/\/$/, "");
  const project = loadProject(path.resolve(flags.cwd ?? process.cwd()));
  const css = stylesheet(project);
  if (!css || !fs.existsSync(css)) {
    throw new CliError(
      `Could not find the stylesheet from components.json (tailwind.css: "${project.config.tailwind?.css ?? ""}").`,
    );
  }
  const rel = path.relative(project.cwd, css);
  if (hasTokens(css)) {
    console.log(c.green(`✔ Design tokens are already in ${rel}.`));
    return;
  }
  const res = await fetch(new URL("../tokens.css", `${registry}/`)).catch(() => null);
  if (!res?.ok)
    throw new CliError("Could not download the design tokens. Copy them from /docs/theming.");
  const tokens = await res.text();
  if (!flags["dry-run"])
    fs.appendFileSync(
      css,
      `

${tokens}`,
    );
  console.log(
    c.green(`✔ ${flags["dry-run"] ? "Would add" : "Added"} Synapse design tokens to ${rel}`),
  );
  console.log(c.dim(`  Next: npx synapseui@latest add button`));
}

async function list({ flags }) {
  const registry = (flags.registry ?? DEFAULT_REGISTRY).replace(/\/$/, "");
  const items = await fetchJson(`${registry}/index.json`);
  const groups = [
    ["web", "Components", "components/synapse-ui"],
    ["block", "Blocks", "components/synapse-ui"],
    ["native", "React Native", "components/native"],
    ["hook", "Hooks", "hooks"],
  ];
  for (const [key, title, dir] of groups) {
    const names = items
      .filter((i) => i.category === key)
      .map((i) => i.name)
      .sort();
    if (!names.length) continue;
    console.log(`${c.bold(title)} ${c.dim(`(${names.length}) → ${dir}`)}`);
    console.log(`  ${names.join(", ")}\n`);
  }
}

const help = `${c.bold("synapseui")} ${c.dim(`v${VERSION}`)}  Add Synapse UI components to a shadcn/ui project.

${c.bold("Usage")}
  synapseui init                 Add the Synapse design tokens to your stylesheet
  synapseui add <name...>        Add components and everything they depend on
  synapseui add --all            Add every web component   → components/synapse-ui
  synapseui add --all --native   Add every native component → components/native
  synapseui list                 List every available item

${c.bold("Options")}
  -o, --overwrite     Replace files that already exist
  -y, --yes           Skip confirmation prompts
      --dry-run       Show what would change without writing anything
      --cwd <path>    Project directory (default: current directory)
      --registry <url>

${c.bold("Requires")} a project already set up with shadcn/ui (components.json).
  New project?  npx shadcn@latest init`;

const args = parseArgs(process.argv.slice(2));
const commands = { init, add, list };

if (args.flags.version || args.command === "--version" || args.command === "-v") {
  console.log(VERSION);
} else if (!args.command || args.flags.help || !commands[args.command]) {
  if (args.command && !commands[args.command] && !["help", "--help", "-h"].includes(args.command)) {
    console.error(c.red(`Unknown command "${args.command}".\n`));
  }
  console.log(help);
} else {
  commands[args.command](args).catch((err) => {
    console.error(c.red(`✖ ${err.message}`));
    if (!(err instanceof CliError) && process.env.DEBUG) console.error(err);
    process.exit(1);
  });
}
