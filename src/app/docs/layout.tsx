import "./docs.css";

import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";

export const metadata: Metadata = {
  title: {
    template: "%s | Synapse UI Docs",
    default: "Synapse UI Documentation",
  },
};

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
