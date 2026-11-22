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
  const { previous, next } = getPager(groups, page.url);
  const entry = registry.find((e) => entryUrl(e) === page.url);

  return (
    <div className="flex">
      <article className="mx-auto w-full max-w-[54rem] min-w-0 px-4 pt-8 pb-24 sm:px-8 lg:pt-10">
        <header className="mb-10">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-[2rem] leading-tight font-semibold tracking-tight sm:text-4xl">
              {page.data.title}
            </h1>
            <div className="flex shrink-0 items-center gap-1.5 pt-1">
              {previous && (
                <Button variant="secondary" size="icon-sm" asChild>
                  <Link href={previous.url} aria-label={`Previous: ${previous.title}`}>
                    <ArrowLeftIcon />
                  </Link>
                </Button>
              )}
              {next && (
                <Button variant="secondary" size="icon-sm" asChild>
                  <Link href={next.url} aria-label={`Next: ${next.title}`}>
                    <ArrowRightIcon />
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

        {(previous || next) && (
          <nav aria-label="Pagination" className="mt-20 flex items-center justify-between gap-4">
            {previous ? (
              <Button variant="secondary" asChild>
                <Link href={previous.url}>
                  <ArrowLeftIcon data-icon="inline-start" />
                  {previous.title}
                </Link>
              </Button>
            ) : (
              <span />
            )}
            {next && (
              <Button variant="secondary" asChild>
                <Link href={next.url}>
                  {next.title}
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            )}
          </nav>
        )}
      </article>

      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col self-start py-10 pr-6 xl:flex">
        <DocsToc items={toc} />
      </aside>
    </div>
  );
}
