<p align="center">
  <a href="https://synapse-ui-dev.vercel.app">
    <img src="https://synapse-ui-dev.vercel.app/readme/banner.png" alt="Synapse UI" width="100%" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/synapseui"><img src="https://img.shields.io/npm/v/synapseui?style=flat-square&color=0a0a0a&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/synapseui"><img src="https://img.shields.io/npm/dm/synapseui?style=flat-square&color=0a0a0a" alt="downloads" /></a>
  <a href="https://github.com/therajarshichakraborty/Synapse-UI/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/synapseui?style=flat-square&color=0a0a0a" alt="MIT license" /></a>
  <img src="https://img.shields.io/node/v/synapseui?style=flat-square&color=0a0a0a" alt="node version" />
</p>

<p align="center">
  <b>The official CLI for <a href="https://synapse-ui-dev.vercel.app">Synapse UI</a>.</b><br />
  Add beautiful, accessible React and React Native components to your shadcn/ui project.<br />
  You get the source code, not a dependency.
</p>

<p align="center">
  <a href="https://synapse-ui-dev.vercel.app/docs">Docs</a> ·
  <a href="https://synapse-ui-dev.vercel.app/docs/components">Components</a> ·
  <a href="https://synapse-ui-dev.vercel.app/docs/react-native">React Native</a> ·
  <a href="https://github.com/therajarshichakraborty/Synapse-UI">GitHub</a>
</p>

---

## Quick start

```bash
# 1. Set up shadcn/ui (skip if your project already has components.json)
npx shadcn@latest init

# 2. Add the Synapse design tokens (once per project)
npx synapseui@latest init

# 3. Add components
npx synapseui@latest add button dialog
```

<p align="center">
  <img src="https://synapse-ui-dev.vercel.app/readme/terminal.png" alt="synapseui add dialog native-fab" width="100%" />
</p>

Use whichever package manager you like:

```bash
npx synapseui@latest add button
pnpm dlx synapseui@latest add button
bunx synapseui@latest add button
yarn dlx synapseui@latest add button
```

---

## Step by step

### 1. Have a project that uses shadcn/ui

Synapse UI never creates an app or sets up shadcn for you. It installs into a project that already has a `components.json`.

**Starting from scratch?** Create a Next.js app, then set up shadcn:

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npx shadcn@latest init
```

**React Native / Expo?** Your Expo project only needs a `components.json` and an `@/*` path alias in `tsconfig.json`. Running `npx shadcn@latest init` creates both.

> If `components.json` is missing, the CLI stops and tells you to run `npx shadcn@latest init`. It never changes anything in that case.

### 2. Add the design tokens

Synapse components use semantic color tokens (`surface-1`, `brand`, `border-strong`…). This appends them to the stylesheet named in your `components.json` (for example `src/app/globals.css`):

```bash
npx synapseui@latest init
```

Running it again does nothing if the tokens are already there.

### 3. Add components

```bash
npx synapseui@latest add dialog
```

The CLI:

1. Downloads `dialog` and everything it depends on (here, `button`).
2. Writes the files to the right folder, rewriting imports to match your aliases.
3. Installs any missing npm packages with your package manager (`npx expo install` in Expo apps).

### 4. Use them

```tsx
import { Button } from "@/components/synapse-ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/synapse-ui/dialog";

export default function Page() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>Hello from Synapse UI</DialogContent>
    </Dialog>
  );
}
```

React Native:

```bash
npx synapseui@latest add native-fab
```

```tsx
import { Fab } from "@/components/native/fab";

export function Screen() {
  return <Fab icon="plus" onPress={() => console.log("pressed")} />;
}
```

---

## Where files go

| Kind                      | Folder                   | Example                            |
| ------------------------- | ------------------------ | ---------------------------------- |
| Web components and blocks | `components/synapse-ui/` | `components/synapse-ui/dialog.tsx` |
| React Native components   | `components/native/`     | `components/native/fab.tsx`        |
| Hooks                     | `hooks/`                 | `hooks/use-mobile.ts`              |

Folders follow your `components.json` aliases and `tsconfig` paths, so a `src/` folder or a custom alias (like `~/components`) just works. Shared native files such as `theme.tsx` and `icon.tsx` are added automatically the first time you add a native component.

---

## Commands

### `init`

Adds the Synapse design tokens to your global stylesheet.

```bash
npx synapseui@latest init
```

### `add`

Adds one or more components and their dependencies.

```bash
npx synapseui@latest add <name...>
```

```bash
npx synapseui@latest add dialog sheet marquee      # several at once
npx synapseui@latest add --all                     # every web component and block
npx synapseui@latest add --all --native            # every React Native component
npx synapseui@latest add dialog --dry-run          # preview, write nothing
```

### `list`

Shows every available item, grouped by where it installs.

```bash
npx synapseui@latest list
```

### Options

| Option             | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| `--all`            | Every web component and block. Add `--native` for React Native |
| `-o, --overwrite`  | Replace files that already exist                               |
| `-y, --yes`        | Skip confirmation prompts                                      |
| `--dry-run`        | Show what would change without writing anything                |
| `--cwd <path>`     | Run in another directory                                       |
| `--registry <url>` | Use a self-hosted registry                                     |
| `-h, --help`       | Show help                                                      |
| `-v, --version`    | Show the version                                               |

When a file already exists and differs, the CLI asks before replacing it. Identical files are left alone, so running `add` twice is safe.

---

## Prefer the shadcn CLI?

Every Synapse item is a standard shadcn registry item and installs to the same folders:

```bash
npx shadcn@latest add https://synapse-ui-dev.vercel.app/r/dialog.json
npx shadcn@latest add https://synapse-ui-dev.vercel.app/r/native-fab.json
npx shadcn@latest add https://synapse-ui-dev.vercel.app/r/all.json          # everything (web)
npx shadcn@latest add https://synapse-ui-dev.vercel.app/r/all-native.json   # everything (native)
```

Or add Synapse as a namespace in `components.json`:

```json
{
  "registries": {
    "@synapse": "https://synapse-ui-dev.vercel.app/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @synapse/dialog @synapse/native-fab
```

---

## Troubleshooting

| Message                                   | Fix                                                                               |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| `No components.json found`                | Run `npx shadcn@latest init` in your project first.                               |
| `"xyz" is not in the Synapse UI registry` | Check the name with `npx synapseui@latest list`.                                  |
| `Synapse design tokens are missing`       | Run `npx synapseui@latest init` once.                                             |
| `Skipped N existing file(s)`              | You changed those files. Re-run with `--overwrite` to replace them.               |
| Imports can't be resolved                 | Make sure `tsconfig.json` has an `@/*` path alias that matches `components.json`. |

## Requirements

- Node.js 18 or later
- A project set up with [shadcn/ui](https://ui.shadcn.com) (`components.json`)
- React 19 and Tailwind CSS v4 for web components; Expo for React Native components

## License

MIT © Rajarshi Chakraborty
