import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Synapse-ui : Free UI Components to build beautiful websites",
    default: "Synapse-ui : Free UI Components to build beautiful websites",
  },
};
export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{
        defaultOpenLevel: 1,
      }}
    >
      {children}
    </DocsLayout>
  );
}
