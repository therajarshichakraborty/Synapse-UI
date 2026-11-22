import type * as PageTree from "fumadocs-core/page-tree";
import { newUrls } from "@/registry/registry";

export type NavLink = { title: string; url: string; isNew?: boolean };
export type NavGroup = { title: string; items: NavLink[] };

function nodeName(name: PageTree.Node["name"]): string {
  return typeof name === "string" ? name : String(name ?? "");
}

function collectPages(nodes: PageTree.Node[], out: NavLink[]) {
  for (const node of nodes) {
    if (node.type === "page") {
      out.push({ title: nodeName(node.name), url: node.url, isNew: newUrls.has(node.url) });
    } else if (node.type === "folder") {
      if (node.index) {
        out.push({ title: "Overview", url: node.index.url });
      }
      collectPages(node.children, out);
    }
  }
}

/** Flattens the Fumadocs page tree into serializable sidebar groups. */
export function buildDocsNav(tree: PageTree.Root): NavGroup[] {
  const groups: NavGroup[] = [];
  let current: NavGroup | null = null;

  for (const node of tree.children) {
    if (node.type === "separator") {
      current = { title: nodeName(node.name), items: [] };
      groups.push(current);
    } else if (node.type === "page") {
      if (!current) {
        current = { title: "Getting Started", items: [] };
        groups.push(current);
      }
      current.items.push({
        title: nodeName(node.name),
        url: node.url,
        isNew: newUrls.has(node.url),
      });
    } else if (node.type === "folder") {
      const items: NavLink[] = [];
      collectPages([node], items);
      groups.push({ title: nodeName(node.name), items });
      current = null;
    }
  }

  return groups.filter((g) => g.items.length > 0);
}

export function flattenNav(groups: NavGroup[]): (NavLink & { group: string })[] {
  return groups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.title })));
}

export function getPager(groups: NavGroup[], url: string) {
  const flat = flattenNav(groups);
  const index = flat.findIndex((i) => i.url === url);
  return {
    current: index >= 0 ? flat[index] : undefined,
    previous: index > 0 ? flat[index - 1] : undefined,
    next: index >= 0 && index < flat.length - 1 ? flat[index + 1] : undefined,
  };
}
