import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { synapseDark, synapseLight } from "./src/lib/shiki/themes";
import { transformerMetaHighlight } from "./src/lib/shiki/transformers";

export const docs = defineDocs({
  dir: "src/content/docs",
});

export default defineConfig({
  mdxOptions: {
    remarkNpmOptions: false,
    remarkCodeTabOptions: false,
    rehypeCodeOptions: {
      ...rehypeCodeDefaultOptions,
      themes: {
        light: synapseLight,
        dark: synapseDark,
      },
      defaultColor: false,
      icon: false,
      tab: false,
      transformers: [...(rehypeCodeDefaultOptions.transformers ?? []), transformerMetaHighlight()],
    },
  },
});
