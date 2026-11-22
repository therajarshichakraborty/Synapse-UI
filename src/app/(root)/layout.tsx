import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="noise relative min-h-svh overflow-x-clip bg-background">
      <SiteHeader variant="landing" />
      <main id="main" className="relative">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
