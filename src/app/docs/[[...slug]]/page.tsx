import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { getMDXComponents } from "@/components/mdx";
import { DocsToc, type TocItem } from "@/components/site/docs/docs-toc";
import { Button } from "@/components/ui/button";
import { source } from "@/lib/source";
import { buildDocsNav, getPager } from "@/lib/docs-nav";
import { registry, entryUrl } from "@/registry/registry";
import { siteConfig } from "@/config/site";
import { CopyPage, PageFeedback, PagerHotkeys } from "@/components/site/docs/copy-page";

type PageParams = { slug?: string[] };

export const dynamicParams = false;

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
    openGraph: { title: page.data.title, description: page.data.description },
  };
}

const pill =
  "inline-flex h-6 items-center gap-1 rounded-full bg-secondary px-2.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent";

export default async function DocsPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);
  if (!page) notFound();

  const MDX = page.data.body;
  const toc = (page.data.toc ?? []) as TocItem[];
  const groups = buildDocsNav(source.pageTree);
  const { previous, next, current } = getPager(groups, page.url);
  const entry = registry.find((e) => entryUrl(e) === page.url);
  const sourceUrl = `${siteConfig.links.github}/blob/main/src/content/docs/${page.path}`;
  const crumbs = [
    { title: "Docs", url: "/docs" },
    ...(current?.group && current.group !== "Getting Started"
      ? [
          {
            title: current.group,
            url: groups.find((g) => g.title === current.group)?.items[0]?.url,
          },
        ]
      : []),
  ];

  return (
    <div className="flex">
      <PagerHotkeys previous={previous?.url} next={next?.url} />
      <article className="mx-auto w-full max-w-[54rem] min-w-0 px-4 pt-8 pb-24 sm:px-8 lg:pt-10">
        <header className="mb-10">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13.5px] text-muted-foreground">
              {crumbs.map((c) => (
                <li key={c.title} className="flex items-center gap-1.5">
                  {c.url ? (
                    <Link href={c.url} className="transition-colors hover:text-foreground">
                      {c.title}
                    </Link>
                  ) : (
                    c.title
                  )}
                  <span aria-hidden="true" className="text-border-strong">
                    /
                  </span>
                </li>
              ))}
              <li aria-current="page" className="font-medium text-foreground">
                {page.data.title}
              </li>
            </ol>
          </nav>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-[2.25rem] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[2.75rem]">
              {page.data.title}
            </h1>
            <div className="flex shrink-0 items-center gap-1.5 sm:pt-2">
              <CopyPage
                markdownUrl={`/md${page.url.replace(/^\/docs/, "")}`}
                url={`${siteConfig.url}${page.url}`}
                sourceUrl={sourceUrl}
              />
              {previous && (
                <Button
                  variant="outline"
                  size="icon-sm"
                  asChild
                  className="group/prev transition-transform active:scale-90"
                >
                  <Link href={previous.url} aria-label={`Previous: ${previous.title}`}>
                    <ArrowLeftIcon className="transition-transform group-hover/prev:-translate-x-0.5" />
                  </Link>
                </Button>
              )}
              {next && (
                <Button
                  variant="outline"
                  size="icon-sm"
                  asChild
                  className="group/next transition-transform active:scale-90"
                >
                  <Link href={next.url} aria-label={`Next: ${next.title}`}>
                    <ArrowRightIcon className="transition-transform group-hover/next:translate-x-0.5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          {page.data.description && (
            <p className="mt-3 max-w-2xl text-[1.0625rem] leading-7 text-pretty text-muted-foreground">
              {page.data.description}
            </p>
          )}
          {entry && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {entry.primitive && (
                <a href={entry.primitive.href} target="_blank" rel="noreferrer" className={pill}>
                  {entry.primitive.label}
                  <ArrowUpRightIcon className="size-3" aria-hidden="true" />
                </a>
              )}
              <a href="#api-reference" className={pill}>
                API Reference
                <ArrowUpRightIcon className="size-3" aria-hidden="true" />
              </a>
            </div>
          )}
        </header>

        <div className="docs-prose">
          <MDX components={getMDXComponents()} />
        </div>

        <PageFeedback title={page.data.title} />

        {(previous || next) && (
          <nav aria-label="Pagination" className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {previous ? (
              <Link
                href={previous.url}
                className="group flex flex-col gap-1 rounded-2xl border border-border p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_12px_32px_-18px_rgba(0,0,0,0.25)]"
              >
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-1" />
                  Previous
                </span>
                <span className="font-medium">{previous.title}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Link
                href={next.url}
                className="group flex flex-col items-end gap-1 rounded-2xl border border-border p-4 text-right transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_12px_32px_-18px_rgba(0,0,0,0.25)]"
              >
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  Next
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="font-medium">{next.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>

      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col self-start py-10 pr-6 xl:flex">
        <DocsToc items={toc} title={page.data.title} editUrl={sourceUrl} />
      </aside>
    </div>
  );
}
