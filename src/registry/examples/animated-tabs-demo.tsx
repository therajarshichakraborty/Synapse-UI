import { AnimatedTabs } from "@/components/animated/animated-tabs";

const panel = (title: string, gradient: string) => (
  <div
    className="flex h-48 w-full items-end rounded-2xl border border-border p-6"
    style={{ background: gradient }}
  >
    <span className="text-2xl font-semibold tracking-tight text-white">{title}</span>
  </div>
);

export default function AnimatedTabsDemo() {
  return (
    <div className="w-full max-w-xl">
      <AnimatedTabs
        tabs={[
          {
            value: "product",
            label: "Product",
            content: panel("Product", "linear-gradient(135deg,#0e7490,#1d4ed8)"),
          },
          {
            value: "services",
            label: "Services",
            content: panel("Services", "linear-gradient(135deg,#1d4ed8,#4338ca)"),
          },
          {
            value: "playground",
            label: "Playground",
            content: panel("Playground", "linear-gradient(135deg,#4338ca,#0e7490)"),
          },
          {
            value: "content",
            label: "Content",
            content: panel("Content", "linear-gradient(135deg,#2563eb,#22d3ee)"),
          },
        ]}
      />
    </div>
  );
}
