import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Blocks } from "lucide-react";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <Blocks className="h-5 w-5 text-violet-700" />
        <span className="font-bold tracking-tight">Synapse UI</span>
      </div>
    ),
    url: "/",
  },
  links: [
    { type: "main", text: "Home", url: "/" },
    { type: "main", text: "Docs", url: "/docs" },
    { type: "main", text: "Pricing", url: "/pricing" },
  ],
};
