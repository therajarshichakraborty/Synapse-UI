import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import { getMDXComponents } from "@/components/mdx";
import { DocsToc, type TocItem } from "@/components/site/docs/docs-toc";
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

export default async function DocsPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);
  if (!page) notFound();

  const MDX = page.data.body;
  const toc = (page.data.toc ?? []) as TocItem[];
  const groups = buildDocsNav(source.pageTree);
  const { current, previous, next } = getPager(groups, page.url);
  const entry = registry.find((e) => entryUrl(e) === page.url);

  return (
    <div className="flex">
      <article className="mx-auto w-full max-w-[52rem] min-w-0 px-4 pt-8 pb-20 sm:px-8 lg:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-1.5 text-[13px] text-muted-foreground"
        >
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          {current?.group && current.url !== "/docs" && (
            <>
              <ChevronRightIcon className="size-3.5" aria-hidden="true" />
              <span>{current.group}</span>
            </>
          )}
          <ChevronRightIcon className="size-3.5" aria-hidden="true" />
          <span className="truncate font-medium text-foreground" aria-current="page">
            {page.data.title}
          </span>
        </nav>

        <header className="mb-8 border-b border-border pb-8">
          <h1 className="text-h1 font-semibold text-gradient-subtle">{page.data.title}</h1>
          {page.data.description && (
            <p className="mt-3 text-body-lg text-muted-foreground">{page.data.description}</p>
          )}
          {entry && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {entry.primitive && (
                <a
                  href={entry.primitive.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-surface-1 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                >
                  {entry.primitive.label}
                  <ExternalLinkIcon className="size-3" aria-hidden="true" />
                </a>
              )}
              <a
                href="#api-reference"
                className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-surface-1 px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                API Reference
              </a>
              {entry.isNew && (
                <span className="inline-flex h-7 items-center rounded-md border border-primary/30 bg-primary/10 px-2.5 text-xs font-medium text-primary">
                  New
                </span>
              )}
            </div>
          )}
        </header>

        <div className="docs-prose">
          <MDX components={getMDXComponents()} />
        </div>

        {(previous || next) && (
          <nav
            aria-label="Pagination"
            className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={previous.url}
                className="group rounded-xl border border-border bg-surface-1 p-4 transition-colors hover:border-primary/40"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                  Previous
                </span>
                <span className="mt-1 block font-medium">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={next.url}
                className="group rounded-xl border border-border bg-surface-1 p-4 text-right transition-colors hover:border-primary/40"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  Next
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1 block font-medium">{next.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>

      <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 overflow-y-auto py-10 pr-6 scrollbar-thin xl:block">
        <DocsToc items={toc} />
      </aside>
    </div>
  );
}
