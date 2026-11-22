import { highlight } from "@/lib/shiki/highlight";
import { examplePath, readSource, toConsumerSource } from "@/lib/registry-source";
import { ComponentPreviewTabs } from "@/components/docs/component-preview-tabs";

export async function ComponentPreview({
  name,
  className,
  align = "center",
  iframe = false,
  height,
  hideCode = false,
}: {
  /** Example file name in `src/registry/examples` (without extension). */
  name: string;
  /** Extra classes for the preview canvas (e.g. min-h-[420px]). */
  className?: string;
  align?: "center" | "start" | "end";
  /** Render inside a resizable iframe (for full-width blocks). */
  iframe?: boolean;
  height?: number;
  hideCode?: boolean;
}) {
  const code = toConsumerSource(await readSource(examplePath(name)));
  const html = hideCode ? "" : await highlight(code, "tsx");

  return (
    <ComponentPreviewTabs
      name={name}
      code={code}
      html={html}
      className={className}
      align={align}
      iframe={iframe}
      height={height}
      hideCode={hideCode}
    />
  );
}
