// @ts-nocheck
import * as __fd_glob_15 from "../src/content/docs/hooks/useAutoResizeTextarea.mdx?collection=docs"
import * as __fd_glob_14 from "../src/content/docs/components/text.mdx?collection=docs"
import * as __fd_glob_13 from "../src/content/docs/components/profile.mdx?collection=docs"
import * as __fd_glob_12 from "../src/content/docs/components/pricing.mdx?collection=docs"
import * as __fd_glob_11 from "../src/content/docs/components/list.mdx?collection=docs"
import * as __fd_glob_10 from "../src/content/docs/components/input.mdx?collection=docs"
import * as __fd_glob_9 from "../src/content/docs/components/faq.mdx?collection=docs"
import * as __fd_glob_8 from "../src/content/docs/components/card.mdx?collection=docs"
import * as __fd_glob_7 from "../src/content/docs/components/button.mdx?collection=docs"
import * as __fd_glob_6 from "../src/content/docs/components/block.mdx?collection=docs"
import * as __fd_glob_5 from "../src/content/docs/components/alert.mdx?collection=docs"
import * as __fd_glob_4 from "../src/content/docs/components/ai-input.mdx?collection=docs"
import * as __fd_glob_3 from "../src/content/docs/index.mdx?collection=docs"
import { default as __fd_glob_2 } from "../src/content/docs/components/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../src/content/docs/hooks/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../src/content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "src/content/docs", {"meta.json": __fd_glob_0, "hooks/meta.json": __fd_glob_1, "components/meta.json": __fd_glob_2, }, {"index.mdx": __fd_glob_3, "components/ai-input.mdx": __fd_glob_4, "components/alert.mdx": __fd_glob_5, "components/block.mdx": __fd_glob_6, "components/button.mdx": __fd_glob_7, "components/card.mdx": __fd_glob_8, "components/faq.mdx": __fd_glob_9, "components/input.mdx": __fd_glob_10, "components/list.mdx": __fd_glob_11, "components/pricing.mdx": __fd_glob_12, "components/profile.mdx": __fd_glob_13, "components/text.mdx": __fd_glob_14, "hooks/useAutoResizeTextarea.mdx": __fd_glob_15, });