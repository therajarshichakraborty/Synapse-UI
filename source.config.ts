import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
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
        light: "github-light-default",
        dark: "github-dark-default",
      },
      defaultColor: false,
      icon: false,
      tab: false,
      transformers: [...(rehypeCodeDefaultOptions.transformers ?? []), transformerMetaHighlight()],
    },
  },
});
