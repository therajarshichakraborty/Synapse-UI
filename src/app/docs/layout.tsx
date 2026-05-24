import "./docs.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { source } from "@/lib/source";
import { DocsShell } from "@/components/docs/layout/DocsShell";

export const metadata: Metadata = {
  title: {
    template: "%s | Synapse UI Docs",
    default: "Synapse UI Documentation",
  },
  description:
    "Premium UI component library for React & Next.js. 100+ animated components built with Tailwind CSS and shadcn/ui.",
};

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  return <DocsShell tree={source.pageTree}>{children}</DocsShell>;
}
