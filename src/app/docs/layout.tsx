import type { Metadata } from "next";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { buildDocsNav } from "@/lib/docs-nav";
import { getGitHubStars } from "@/lib/github";
import { SiteHeader } from "@/components/site/site-header";
import { DocsSidebar, DocsSidebarNav } from "@/components/site/docs/docs-sidebar";
import { ScrollProgress } from "@/components/site/docs/scroll-progress";

export const metadata: Metadata = {
  title: {
    template: "%s | Synapse UI",
    default: "Documentation",
  },
};

export default async function DocsLayout({ children }: { children: ReactNode }) {
  const groups = buildDocsNav(source.pageTree);
  const stars = await getGitHubStars();

  return (
    <div className="relative min-h-svh bg-background">
      <ScrollProgress />
      <SiteHeader stars={stars} mobileNav={<DocsSidebarNav groups={groups} />} />
      <div className="mx-auto flex w-full max-w-[1600px]">
        <aside className="sticky top-0 hidden h-svh w-64 shrink-0 self-start lg:block xl:w-72">
          <DocsSidebar groups={groups} />
        </aside>
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
