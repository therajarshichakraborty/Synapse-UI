import { getMDXComponents } from "@/components/mdx";
import { source } from "@/lib/source";
import { DocsBody } from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPageHeader } from "@/components/docs/content/DocsPageHeader";
import { DocsBreadcrumb } from "@/components/docs/content/DocsBreadcrumb";
import { DocsTOC } from "@/components/docs/layout/DocsTOC";
import type { TOCItemType } from "fumadocs-core/toc";

type PageParams = { slug?: string[] };

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);
  if (!page) return {};
  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);
  if (!page) notFound();

  const MDX = page.data.body;
  const toc = page.data.toc as TOCItemType[];

  // Build breadcrumb from slug
  const breadcrumbItems = [
    { name: "Docs", url: "/docs" },
    ...(slug ?? []).slice(0, -1).map((segment, i, arr) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      url: `/docs/${arr.slice(0, i + 1).join("/")}`,
    })),
    { name: page.data.title },
  ];

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <article className="mx-auto max-w-3xl px-6 py-10 xl:py-12">
          <DocsBreadcrumb items={breadcrumbItems} />
          <DocsPageHeader
            title={page.data.title}
            description={page.data.description}
          />
          <DocsBody>
            <MDX components={getMDXComponents()} />
          </DocsBody>
        </article>
      </div>

      {/* TOC — right rail */}
      <DocsTOC items={toc} />
    </div>
  );
}
