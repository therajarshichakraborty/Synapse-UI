import { CheckIcon } from "lucide-react";
import { Terminal } from "@/components/animated/terminal";
import { SectionHeading } from "@/components/site/landing/reveal";

const points = [
  "Resolves registry dependencies recursively",
  "Installs npm packages with your package manager",
  "Compatible with the shadcn registry format",
];

const everything = [
  ["add --all", "detects your project"],
  ["add --all --react", "only React"],
  ["add --all --native", "only React Native"],
  ["add --all --both", "both"],
] as const;

export function CliSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="CLI"
            title="One command. Everything it needs."
            description="Add a component and the CLI writes the files, pulls in the primitives it depends on and installs the packages."
          />
          <ul className="mt-8 grid gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background">
                  <CheckIcon className="size-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-[13px] font-medium text-foreground">Or install everything at once</p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {everything.map(([cmd, label]) => (
                <li
                  key={cmd}
                  className="flex min-w-0 flex-col gap-0.5 rounded-lg border border-border bg-surface-1 px-3 py-2"
                >
                  <code className="truncate font-mono text-[12px] text-foreground">{cmd}</code>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative">
          <Terminal
            title="~/my-app"
            lines={[
              { type: "command", text: "npx synapse-ui-cli@latest add button" },
              { type: "output", text: "✔ Checking registry.", tone: "muted" },
              {
                type: "output",
                text: "✔ Resolving dependencies: class-variance-authority, radix-ui",
                tone: "muted",
              },
              { type: "output", text: "✔ Installing packages with bun.", tone: "muted" },
              { type: "output", text: "✔ Created 1 file:", tone: "success" },
              { type: "output", text: "    components/synapse-ui/button.tsx", tone: "info" },
              { type: "command", text: "npx synapse-ui-cli@latest add date-picker" },
              {
                type: "output",
                text: "✔ Created 3 files: date-picker, calendar, popover",
                tone: "success",
              },
              { type: "command", text: "npx synapse-ui-cli@latest add --all --react" },
              {
                type: "output",
                text: "✔ Adding every React component → components/synapse-ui",
                tone: "success",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
