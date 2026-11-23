import { source } from "@/lib/source";
import { readSource } from "@/lib/registry-source";
import { siteConfig } from "@/config/site";

/**
 * Plain Markdown for every docs page, e.g. /md/components/button.
 * Used by "Copy Page" and handy for LLMs.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return source.generateParams();
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);
  if (!page) return new Response("Not found", { status: 404 });

  const raw = await readSource(`src/content/docs/${page.path}`);
  const body = raw.replace(/^---[\s\S]*?---\s*/, "");
  const markdown = [
    `# ${page.data.title}`,
    page.data.description ? `\n> ${page.data.description}` : "",
    `\nSource: ${siteConfig.url}${page.url}\n`,
    body,
  ].join("\n");

  return new Response(markdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
