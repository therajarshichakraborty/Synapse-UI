import type { ComponentType } from "react";

import { AIInput01 } from "@/components/synapse-ui-components/ai-inputs/ai-input-01";
import { AIInput04 } from "@/components/synapse-ui-components/ai-inputs/ai-input-04";
import { AIInput08 } from "@/components/synapse-ui-components/ai-inputs/ai-input-08";
import Alert02 from "@/components/synapse-ui-components/alerts/alert-02";
import Alert07 from "@/components/synapse-ui-components/alerts/alert-07";
import Alert09 from "@/components/synapse-ui-components/alerts/alert-09";
import AICardGeneration from "@/components/synapse-ui-components/blocks/ai-card-generation/ai-card-generation";
import Btn01 from "@/components/synapse-ui-components/buttons/button-01";
import Button02 from "@/components/synapse-ui-components/buttons/button-02";
import Button08 from "@/components/synapse-ui-components/buttons/button-08";
import Card_01 from "@/components/synapse-ui-components/cards/card-01";
import Card_04 from "@/components/synapse-ui-components/cards/card-04";
import Card_25 from "@/components/synapse-ui-components/cards/card-25";
import Faq02 from "@/components/synapse-ui-components/FAQs/faq-02";
import Faq08 from "@/components/synapse-ui-components/FAQs/faq-08";
import Faq14 from "@/components/synapse-ui-components/FAQs/faq-14";
import Input_01 from "@/components/synapse-ui-components/inputs/input-01";
import Input_03 from "@/components/synapse-ui-components/inputs/input-03";
import Input_06 from "@/components/synapse-ui-components/inputs/input-06";
import List01 from "@/components/synapse-ui-components/lists/list-01";
import List05 from "@/components/synapse-ui-components/lists/list-05";
import List12 from "@/components/synapse-ui-components/lists/list-12";
import Pricing_01 from "@/components/synapse-ui-components/pricings/pricing-01";
import Pricing_04 from "@/components/synapse-ui-components/pricings/pricing-04";
import Pricing_06 from "@/components/synapse-ui-components/pricings/pricing-06";
import Text02 from "@/components/synapse-ui-components/texts/text-02";

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
  | "button"
  | "card"
  | "faq"
  | "input"
  | "list"
  | "pricing"
  | "text"
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

export const demos: Record<DemoCategory, DemoEntry[]> = {
  "ai-input": [
    demo("ai-input-01", "AI Input 01", AIInput01, `import { AIInput01 } from "@/components/synapse-ui-components/ai-inputs/ai-input-01";

export default function Example() {
  return <AIInput01 />;
}`),
    demo("ai-input-04", "AI Input 04", AIInput04, `import { AIInput04 } from "@/components/synapse-ui-components/ai-inputs/ai-input-04";

export default function Example() {
  return <AIInput04 />;
}`),
    demo("ai-input-08", "AI Input 08", AIInput08, `import { AIInput08 } from "@/components/synapse-ui-components/ai-inputs/ai-input-08";

export default function Example() {
  return <AIInput08 />;
}`, { previewClassName: "min-h-[200px] w-full max-w-2xl" }),
  ],
  alert: [
    demo("alert-02", "Alert 02", Alert02, `import Alert02 from "@/components/synapse-ui-components/alerts/alert-02";

export default function Example() {
  return <Alert02 />;
}`, { previewClassName: "min-h-[160px] w-full max-w-lg" }),
    demo("alert-07", "Alert 07", Alert07, `import Alert07 from "@/components/synapse-ui-components/alerts/alert-07";

export default function Example() {
  return <Alert07 />;
}`, { previewClassName: "min-h-[120px] w-full max-w-lg" }),
    demo("alert-09", "Alert 09", Alert09, `import Alert09 from "@/components/synapse-ui-components/alerts/alert-09";

export default function Example() {
  return <Alert09 />;
}`, { previewClassName: "min-h-[120px] w-full max-w-lg" }),
  ],
  button: [
    demo("button-01", "Button 01", Btn01, `import Btn01 from "@/components/synapse-ui-components/buttons/button-01";

export default function Example() {
  return <Btn01>Continue</Btn01>;
}`),
    demo("button-02", "Button 02", Button02, `import Button02 from "@/components/synapse-ui-components/buttons/button-02";

export default function Example() {
  return <Button02 />;
}`),
    demo("button-08", "Button 08", Button08, `import Button08 from "@/components/synapse-ui-components/buttons/button-08";

export default function Example() {
  return <Button08 />;
}`),
  ],
  card: [
    demo("card-01", "Card 01", Card_01, `import Card_01 from "@/components/synapse-ui-components/cards/card-01";

export default function Example() {
  return <Card_01 href="#" />;
}`, { props: { href: "#" }, previewClassName: "min-h-[200px] w-full max-w-md" }),
    demo("card-04", "Card 04", Card_04, `import Card_04 from "@/components/synapse-ui-components/cards/card-04";

export default function Example() {
  return <Card_04 />;
}`, { previewClassName: "min-h-[160px] w-full max-w-sm" }),
    demo("card-25", "Card 25", Card_25, `import Card_25 from "@/components/synapse-ui-components/cards/card-25";

export default function Example() {
  return <Card_25 />;
}`, { previewClassName: "min-h-[200px] w-full max-w-md" }),
  ],
  faq: [
    demo("faq-02", "FAQ 02", Faq02, `import Faq02 from "@/components/synapse-ui-components/FAQs/faq-02";

export default function Example() {
  return <Faq02 />;
}`, { previewClassName: "min-h-[200px] w-full max-w-2xl" }),
    demo("faq-08", "FAQ 08", Faq08, `import Faq08 from "@/components/synapse-ui-components/FAQs/faq-08";

export default function Example() {
  return <Faq08 />;
}`, { previewClassName: "min-h-[200px] w-full max-w-2xl" }),
    demo("faq-14", "FAQ 14", Faq14, `import Faq14 from "@/components/synapse-ui-components/FAQs/faq-14";

export default function Example() {
  return <Faq14 />;
}`, { previewClassName: "min-h-[200px] w-full max-w-2xl" }),
  ],
  input: [
    demo("input-01", "Input 01", Input_01, `import Input_01 from "@/components/synapse-ui-components/inputs/input-01";

export default function Example() {
  return <Input_01 />;
}`, { previewClassName: "min-h-[80px] w-full max-w-md" }),
    demo("input-03", "Input 03", Input_03, `import Input_03 from "@/components/synapse-ui-components/inputs/input-03";

export default function Example() {
  return <Input_03 />;
}`, { previewClassName: "min-h-[80px] w-full max-w-md" }),
    demo("input-06", "Input 06", Input_06, `import Input_06 from "@/components/synapse-ui-components/inputs/input-06";

export default function Example() {
  return <Input_06 />;
}`, { previewClassName: "min-h-[80px] w-full max-w-md" }),
  ],
  list: [
    demo("list-01", "List 01", List01, `import List01 from "@/components/synapse-ui-components/lists/list-01";

export default function Example() {
  return <List01 />;
}`, { previewClassName: "min-h-[200px] w-full max-w-md" }),
    demo("list-05", "List 05", List05, `import List05 from "@/components/synapse-ui-components/lists/list-05";

export default function Example() {
  return <List05 />;
}`, { previewClassName: "min-h-[200px] w-full max-w-md" }),
    demo("list-12", "List 12", List12, `import List12 from "@/components/synapse-ui-components/lists/list-12";

export default function Example() {
  return <List12 />;
}`, { previewClassName: "min-h-[200px] w-full max-w-md" }),
  ],
  pricing: [
    demo("pricing-01", "Pricing 01", Pricing_01, `import Pricing_01 from "@/components/synapse-ui-components/pricings/pricing-01";

export default function Example() {
  return <Pricing_01 />;
}`, { previewClassName: "min-h-[200px] w-full max-w-2xl" }),
    demo("pricing-04", "Pricing 04", Pricing_04, `import Pricing_04 from "@/components/synapse-ui-components/pricings/pricing-04";

export default function Example() {
  return <Pricing_04 />;
}`, { previewClassName: "min-h-[200px] w-full max-w-2xl" }),
    demo("pricing-06", "Pricing 06", Pricing_06, `import Pricing_06 from "@/components/synapse-ui-components/pricings/pricing-06";

export default function Example() {
  return <Pricing_06 />;
}`, { previewClassName: "min-h-[200px] w-full max-w-2xl" }),
  ],
  text: [
    demo("text-02", "Text 02", Text02, `import Text02 from "@/components/synapse-ui-components/texts/text-02";

export default function Example() {
  return <Text02 text="Synapse UI" />;
}`, { props: { text: "Synapse UI" }, previewClassName: "min-h-[80px] w-full" }),
  ],
  block: [
    demo(
      "block-ai-card-generation",
      "AI Card Generation",
      AICardGeneration,
      `import AICardGeneration from "@/components/synapse-ui-components/blocks/ai-card-generation/ai-card-generation";

export default function Example() {
  return <AICardGeneration />;
}`,
      { previewClassName: "min-h-[400px] max-h-[600px] w-full max-w-2xl overflow-auto" },
    ),
  ],
  useAutoResizeTextarea: [
    {
      id: "use-auto-resize-textarea",
      title: "Live demo",
      component: UseAutoResizeTextareaDemo,
      code: `"use client";

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
}`,
      previewClassName: "min-h-[120px] w-full max-w-md",
    },
  ],
};
