import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns = [
  { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { title: "Resources", links: ["Docs", "Guides", "Support", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
];

export default function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-semibold">
              <span className="size-6 rounded-md bg-foreground" /> Acme
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Get product updates in your inbox, once a month.
            </p>
            <form className="mt-4 flex gap-2">
              <Input type="email" placeholder="you@company.com" aria-label="Email address" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className="text-sm font-medium">{c.title}</h3>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2026 Acme Inc. All rights reserved.
        </div>
      </div>
      <div
        aria-hidden="true"
        className="text-center text-[clamp(4rem,18vw,14rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent select-none"
        style={{
          backgroundImage: "linear-gradient(180deg, var(--border-strong), transparent 85%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        acme
      </div>
    </footer>
  );
}
