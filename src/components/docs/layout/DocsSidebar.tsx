"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import * as PageTree from "fumadocs-core/page-tree";
import { sidebarAccordionContent, chevronVariants } from "@/design-system/motion-variants";

interface DocsSidebarProps {
  tree: PageTree.Root;
}

// ─── Individual nav item ──────────────────────────────────────────────────────
function SidebarItem({ item }: { item: PageTree.Node }) {
  const pathname = usePathname();
  const isActive = "url" in item && pathname === item.url;

  if (item.type === "page") {
    return (
      <Link
        href={item.url}
        className={cn(
          "relative flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-all duration-150",
          isActive
            ? "bg-zinc-100 text-zinc-900 font-medium dark:bg-zinc-800 dark:text-zinc-50"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
        )}
      >
        <span className="truncate">{item.name}</span>
      </Link>
    );
  }

  if (item.type === "folder") {
    return <SidebarFolder item={item} />;
  }

  if (item.type === "separator") {
    return (
      <div className="mt-5 mb-2 px-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
          {item.name}
        </p>
      </div>
    );
  }

  return null;
}

// ─── Folder with accordion ────────────────────────────────────────────────────
function SidebarFolder({ item }: { item: PageTree.Folder }) {
  const pathname = usePathname();

  // Auto-open if current path is within this folder
  const isChildActive = (nodes: PageTree.Node[]): boolean =>
    nodes.some((n) => {
      if (n.type === "page" && pathname === n.url) return true;
      if (n.type === "folder" && isChildActive(n.children)) return true;
      return false;
    });

  const [open, setOpen] = useState(() => isChildActive(item.children));

  useEffect(() => {
    if (isChildActive(item.children)) setOpen(true);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Folder with an index page link
  const indexPage = item.index;

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between gap-2 rounded-md px-3 py-1.5",
          "text-sm font-medium transition-colors duration-150 group",
          "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
          isChildActive(item.children)
            ? "text-zinc-900 dark:text-zinc-200 font-semibold"
            : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300",
        )}
      >
        <span className="truncate">{item.name}</span>
        <motion.div
          variants={chevronVariants}
          animate={open ? "open" : "closed"}
          className="shrink-0"
        >
          <ChevronRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            variants={sidebarAccordionContent}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden"
          >
            <div className="ml-3 mt-0.5 border-l border-[var(--fd-border)] pl-3 pb-1 space-y-0.5">
              {indexPage && <SidebarItem item={{ ...indexPage, type: "page" } as PageTree.Item} />}
              {item.children.map((child, i) => (
                <SidebarItem key={i} item={child} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main sidebar component ───────────────────────────────────────────────────
export function DocsSidebar({ tree }: DocsSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <nav className="px-3 py-4 space-y-0.5">
      {tree.children.map((item, i) => (
        <SidebarItem key={i} item={item} />
      ))}
    </nav>
  );

  return (
    <>
      {/* ── Mobile toggle button ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 border border-zinc-800 dark:border-zinc-200 text-zinc-50 dark:text-zinc-900 shadow-md backdrop-blur-md transition-colors"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className={cn(
                "fixed left-0 top-0 bottom-0 z-[70] w-72 lg:hidden",
                "border-r border-[var(--fd-border)] bg-[var(--fd-background)]/98 backdrop-blur-2xl",
                "overflow-y-auto",
              )}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              {/* Mobile header */}
              <div className="sticky top-0 flex items-center justify-between px-4 py-3.5 border-b border-[var(--fd-border)] bg-[var(--fd-background)]/90 backdrop-blur-md">
                <span className="text-sm font-semibold text-[var(--fd-foreground)]">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar ── */}
      <aside
        className={cn(
          "hidden lg:block",
          "sticky top-14 h-[calc(100vh-3.5rem)]", // 3.5rem = header height
          "w-60 xl:w-64 shrink-0",
          "border-r border-[var(--fd-sidebar-border)]",
          "bg-[var(--fd-sidebar)]/60 backdrop-blur-md",
          "overflow-y-auto",
        )}
      >
        {/* Subtle top gradient */}
        <div className="pointer-events-none absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-[var(--fd-background)] to-transparent z-10" />
        <SidebarContent />
        {/* Subtle bottom gradient */}
        <div className="pointer-events-none sticky bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[var(--fd-background)] to-transparent" />
      </aside>
    </>
  );
}
