import { defineDocs, defineConfig, defineCollections } from "fumadocs-mdx/config";
import { pageSchema, metaSchema } from "fumadocs-core/source/schema";

// export const docs = defineDocs({
//   dir: "src/content/docs",
// });

// export default defineConfig({
//   mdxOptions: {},
// });

export const docs = defineCollections({
  type: "doc",
  dir: "src/content/docs",
  schema: pageSchema,
});

export const meta = defineCollections({
  type: "meta",
  dir: "content/docs",
  schema: metaSchema,
});
