import Link from "next/link";
import { highlight } from "@/lib/shiki/highlight";
import { readSource, scanDeps, targetPath, toConsumerSource } from "@/lib/registry-source";
import { getEntry, entryUrl, registry } from "@/registry/registry";
import { PmCommand } from "@/components/docs/pm-command";
import { CollapsibleSource, InstallTabs } from "@/components/docs/install-tabs";
import { siteConfig } from "@/config/site";

function StepList({ children }: { children: React.ReactNode }) {
  return (
    <ol className="relative ml-3.5 border-l border-border [counter-reset:step]">{children}</ol>
  );
}

function Step({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <li className="relative pb-6 pl-8 [counter-increment:step] last:pb-0 before:absolute before:-left-3.5 before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border before:border-border before:bg-surface-2 before:font-mono before:text-xs before:text-muted-foreground before:content-[counter(step)]">
      <p className="pt-0.5 font-medium text-foreground">{title}</p>
      <div className="mt-1 text-sm text-muted-foreground">{children}</div>
    </li>
  );
}

/** Main file first, then every `@/components/native/*` file it depends on. */
async function collectNativeFiles(entryFiles: string[]) {
  const out: string[] = [];
  const queue = [...entryFiles];
  while (queue.length) {
    const file = queue.shift()!;
    if (out.includes(file)) continue;
    const code = await readSource(file);
    if (code.startsWith("// Source not found")) continue;
    out.push(file);
    for (const m of code.matchAll(/from\s+["']@\/components\/native\/([\w-]+)["']/g)) {
      const base = `src/components/native/${m[1]}`;
      const ts = `${base}.ts`;
      queue.push(
        (await readSource(`${base}.tsx`)).startsWith("// Source not found") ? ts : `${base}.tsx`,
      );
    }
  }
  return out;
}

export async function ComponentInstall({ name }: { name: string }) {
  const entry = getEntry(name);
  if (!entry) return <p className="text-sm text-destructive">Unknown registry item: {name}</p>;

  const native = entry.category === "native";
  const sources = native ? await collectNativeFiles(entry.files) : entry.files;

  const files = await Promise.all(
    sources.map(async (file) => {
      const code = toConsumerSource(await readSource(file));
      return { file, code, html: await highlight(code, "tsx"), deps: scanDeps(code) };
    }),
  );

  const packages = [...new Set(files.flatMap((f) => f.deps.packages))].filter(
    // react-native is already in every Expo app.
    (p) => !(native && p === "react-native"),
  );
  const internal = [...new Set(files.flatMap((f) => f.deps.internal))].filter(
    (d) => d !== "utils" && !entry.files.some((f) => f.endsWith(`/${d}.tsx`)),
  );

  return (
    <InstallTabs
      cli={
        <>
          <PmCommand dlx={`synapse-ui@latest add ${name}`} />
          <p className="text-xs text-muted-foreground">
            Prefer the shadcn CLI? Run{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">
              npx shadcn@latest add {siteConfig.url}/r/{name}.json
            </code>
          </p>
        </>
      }
      manual={
        <div className="pt-4">
          <StepList>
            {packages.length > 0 && (
              <Step title="Install the following dependencies:">
                {native ? (
                  <PmCommand dlx={`expo install ${packages.join(" ")}`} />
                ) : (
                  <PmCommand install={packages.join(" ")} />
                )}
              </Step>
            )}
            {internal.length > 0 && (
              <Step title="Add the components this one is built on:">
                <ul className="mt-2 flex flex-wrap gap-2">
                  {internal.map((dep) => {
                    const target = registry.find((e) => e.name === dep);
                    return (
                      <li key={dep}>
                        {target ? (
                          <Link
                            href={entryUrl(target)}
                            className="inline-flex rounded-md border border-border bg-surface-1 px-2 py-1 font-mono text-xs text-foreground hover:border-primary/40"
                          >
                            {dep}
                          </Link>
                        ) : (
                          <span className="inline-flex rounded-md border border-border bg-surface-1 px-2 py-1 font-mono text-xs">
                            {dep}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Step>
            )}
            <Step title="Copy and paste the following code into your project.">
              {files.map((f) => (
                <CollapsibleSource
                  key={f.file}
                  title={targetPath(f.file)}
                  code={f.code}
                  html={f.html}
                />
              ))}
            </Step>
            <Step title="Update the import paths to match your project setup." />
          </StepList>
        </div>
      }
    />
  );
}

export async function ComponentSource({ path, title }: { path: string; title?: string }) {
  const code = toConsumerSource(await readSource(path));
  const html = await highlight(code, "tsx");
  return <CollapsibleSource title={title ?? targetPath(path)} code={code} html={html} />;
}
