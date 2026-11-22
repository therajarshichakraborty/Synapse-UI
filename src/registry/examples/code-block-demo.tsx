import { CodeBlock } from "@/components/animated/code-block";

const page = `import { Button } from "@/components/ui/button";

export default function Page() {
  // Synapse components are just files you own
  return <Button variant="gradient">Ship it</Button>;
}`;

const button = `export function Button({ variant = "default", ...props }) {
  return <button data-variant={variant} {...props} />;
}`;

export default function CodeBlockDemo() {
  return (
    <CodeBlock
      className="w-full max-w-xl"
      highlight={[5]}
      files={[
        { name: "page.tsx", code: page },
        { name: "button.tsx", code: button },
      ]}
    />
  );
}
