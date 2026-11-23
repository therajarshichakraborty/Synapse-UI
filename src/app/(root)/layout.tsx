import type { ReactNode } from "react";
import { getGitHubStars } from "@/lib/github";
import { LandingNav } from "@/components/site/landing/landing-nav";
import { SiteFooter } from "@/components/site/site-footer";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const stars = await getGitHubStars();
  return (
    <div className="relative min-h-svh overflow-x-clip bg-background">
      <LandingNav stars={stars} />
      <main id="main" className="relative -mt-[76px]">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
