// source.config.ts
import { defineCollections } from "fumadocs-mdx/config";
import { pageSchema, metaSchema } from "fumadocs-core/source/schema";
var docs = defineCollections({
  type: "doc",
  dir: "src/content/docs",
  schema: pageSchema,
});
var meta = defineCollections({
  type: "meta",
  dir: "content/docs",
  schema: metaSchema,
});
export { docs, meta };
