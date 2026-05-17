import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Flame, Blocks } from "lucide-react";
//import { HeaderPro } from "@/components/landing/header-pro";
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center">
          <Blocks className="mr-2 h-5 w-5 text-violet-700" />
          <span className="hidden md:inline-flex items-center text-lg font-bold tracking-tight text-black dark:text-white">
            Synapse-UI
          </span>
        </div>
      ),
    },
    links: [
      {
        text: "Pricing",
        url: "/pricing",
      },
    ],
  };
}
