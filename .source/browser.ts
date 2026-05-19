// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../src/content/docs/index.mdx?collection=docs"), "components/ai-input.mdx": () => import("../src/content/docs/components/ai-input.mdx?collection=docs"), "components/alert.mdx": () => import("../src/content/docs/components/alert.mdx?collection=docs"), "components/block.mdx": () => import("../src/content/docs/components/block.mdx?collection=docs"), "components/button.mdx": () => import("../src/content/docs/components/button.mdx?collection=docs"), "components/card.mdx": () => import("../src/content/docs/components/card.mdx?collection=docs"), "components/faq.mdx": () => import("../src/content/docs/components/faq.mdx?collection=docs"), "components/input.mdx": () => import("../src/content/docs/components/input.mdx?collection=docs"), "components/list.mdx": () => import("../src/content/docs/components/list.mdx?collection=docs"), "components/pricing.mdx": () => import("../src/content/docs/components/pricing.mdx?collection=docs"), "components/profile.mdx": () => import("../src/content/docs/components/profile.mdx?collection=docs"), "components/text.mdx": () => import("../src/content/docs/components/text.mdx?collection=docs"), "hooks/useAutoResizeTextarea.mdx": () => import("../src/content/docs/hooks/useAutoResizeTextarea.mdx?collection=docs"), }),
};
export default browserCollections;