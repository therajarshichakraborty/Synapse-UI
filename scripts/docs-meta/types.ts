/** Authoring format for generated component pages. See scripts/generate-docs.ts. */
export type PropTuple = [prop: string, type: string, defaultValue?: string, description?: string];

export type DocMeta = {
  name: string;
  /** Example rendered at the top. Defaults to `${name}-demo`. */
  preview?: string;
  previewClassName?: string;
  align?: "center" | "start";
  /** Render previews in a responsive iframe (blocks). */
  iframe?: boolean;
  height?: number;
  /** Markdown shown under the description, before the preview. */
  intro?: string;
  usage?: { imports: string; code: string };
  examples?: {
    name: string;
    title: string;
    description?: string;
    className?: string;
    height?: number;
  }[];
  api?: { name: string; description?: string; props: PropTuple[] }[];
  a11y?: { notes?: string; keys?: [string, string][] };
  /** Markdown appended at the end of the page. */
  extra?: string;
};
