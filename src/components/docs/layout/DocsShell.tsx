import { AnimatedGradient } from "@/components/motion/AnimatedGradient";
import { DocsHeader } from "./DocsHeader";
import { DocsSidebar } from "./DocsSidebar";
import * as PageTree from "fumadocs-core/page-tree";
import type { ReactNode } from "react";

interface DocsShellProps {
  children: ReactNode;
  tree: PageTree.Root;
}

/**
 * Master docs layout shell.
 * Replaces fumadocs-ui/layouts/docs with our premium custom chrome.
 * Keeps Fumadocs as the pure content/routing engine.
 */
export function DocsShell({ children, tree }: DocsShellProps) {
  return (
    <div className="relative min-h-screen bg-[var(--fd-background)] text-[var(--fd-foreground)] transition-colors duration-200">
      {/* Shared animated gradient background */}
      <AnimatedGradient className="fixed" intensity={0.7} />

      {/* Sticky header */}
      <DocsHeader />

      {/* Main layout: sidebar + content */}
      <div className="relative flex max-w-[1800px] mx-auto">
        {/* Premium sidebar */}
        <DocsSidebar tree={tree} />

        {/* Page content — full width, TOC is rendered per-page */}
        <div className="flex-1 min-w-0 min-h-[calc(100vh-3.5rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}
