import type { Metadata } from "next";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { buildDocsNav } from "@/lib/docs-nav";
import { SiteHeader } from "@/components/site/site-header";
import { DocsSidebar, DocsSidebarNav } from "@/components/site/docs/docs-sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s | Synapse UI",
    default: "Documentation",
  },
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  const groups = buildDocsNav(source.pageTree);

  return (
    <div className="relative min-h-svh bg-background">
      <SiteHeader variant="docs" mobileNav={<DocsSidebarNav groups={groups} />} />
      <div className="mx-auto flex w-full max-w-[1600px]">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 border-r border-border md:block lg:w-72">
          <DocsSidebar groups={groups} />
        </aside>
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
