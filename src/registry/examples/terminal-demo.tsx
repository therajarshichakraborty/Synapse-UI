import { Terminal } from "@/components/animated/terminal";

export default function TerminalDemo() {
  return (
    <Terminal
      className="w-full max-w-lg"
      title="zsh: my-app"
      lines={[
        { type: "command", text: "npx synapse-ui-cli@latest add button" },
        { type: "output", text: "✔ Checking registry.", tone: "muted" },
        { type: "output", text: "✔ Installing dependencies.", tone: "muted" },
        { type: "output", text: "✔ Created 1 file:", tone: "success" },
        { type: "output", text: "  - components/ui/button.tsx", tone: "info" },
      ]}
    />
  );
}
