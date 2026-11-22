import type { ReactNode } from "react";
import { getGitHubStars } from "@/lib/github";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const stars = await getGitHubStars();
  return (
    <div className="relative min-h-svh overflow-x-clip bg-background">
      <SiteHeader stars={stars} />
      <main id="main" className="relative">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
