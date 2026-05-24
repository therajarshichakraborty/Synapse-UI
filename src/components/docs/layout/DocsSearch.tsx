"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, FileText, ArrowRight, Command } from "lucide-react";
import { useDocsSearch } from "fumadocs-core/search/client";
import { cn } from "@/lib/utils";

/**
 * Spotlight-style docs search.
 * Triggered by the search button or Cmd+K.
 * Uses Fumadocs' useDocsSearch hook with a fully custom modal UI.
 */
export function DocsSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { setSearch, query: searchQueryResult } = useDocsSearch({
    type: "fetch",
    delayMs: 150,
  });

  const results = searchQueryResult.isLoading ? "loading" : (searchQueryResult.data ?? "empty");

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSearch("");
    }
  }, [open, setSearch]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setSearch(value);
  };

  const handleSelect = (url: string) => {
    router.push(url);
    setOpen(false);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg",
          "border border-[var(--fd-border)] bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.04] dark:hover:bg-white/[0.07]",
          "text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-all duration-200",
          "group",
        )}
        aria-label="Search docs"
      >
        <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors" />
        <span className="hidden sm:inline">Search docs…</span>
        <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/[0.02] dark:bg-white/[0.06] border border-[var(--fd-border)] text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
            />

            {/* Search panel */}
            <motion.div
              className={cn(
                "fixed left-1/2 top-[15%] z-[101] w-full max-w-xl -translate-x-1/2",
                "rounded-lg border border-[var(--fd-border)] bg-[var(--fd-popover)] text-[var(--fd-foreground)]",
                "shadow-2xl",
                "overflow-hidden",
              )}
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {/* Input row */}
              <div className="flex items-center gap-3 border-b border-[var(--fd-border)] px-4 py-3">
                <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search documentation…"
                  className={cn(
                    "flex-1 bg-transparent text-sm text-[var(--fd-foreground)] placeholder-zinc-400 dark:placeholder-zinc-600",
                    "outline-none border-none ring-0 caret-zinc-950 dark:caret-zinc-50",
                  )}
                />
                {query && (
                  <button
                    onClick={() => handleSearch("")}
                    className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <kbd
                  className="px-1.5 py-0.5 rounded border border-[var(--fd-border)] bg-black/[0.02] dark:bg-white/[0.04] text-[10px] text-zinc-500 dark:text-zinc-400 font-mono cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[360px] overflow-y-auto p-2">
                {query.length === 0 && (
                  <div className="py-8 text-center">
                    <FileText className="h-8 w-8 text-zinc-400 dark:text-zinc-600 mx-auto mb-3" />
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Start typing to search…
                    </p>
                  </div>
                )}

                {query.length > 0 && results === "empty" && (
                  <div className="py-8 text-center">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      No results for &ldquo;{query}&rdquo;
                    </p>
                  </div>
                )}

                {query.length > 0 &&
                  Array.isArray(results) &&
                  results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result.url)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg",
                        "text-left hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group",
                        "border border-transparent",
                      )}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0">
                        <FileText className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
                          {result.type === "page" ? String(result.content) : String(result.content)}
                        </p>
                        {result.breadcrumbs && result.breadcrumbs.length > 0 && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                            {result.breadcrumbs.map(String).join(" › ")}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-400 shrink-0 transition-colors" />
                    </button>
                  ))}

                {results === "loading" && (
                  <div className="py-6 flex justify-center">
                    <div className="h-5 w-5 rounded-full border-2 border-zinc-500/20 border-t-zinc-950 dark:border-zinc-800/20 dark:border-t-zinc-200 animate-spin" />
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="border-t border-[var(--fd-border)] px-4 py-2 flex items-center justify-between">
                <p className="text-[10px] text-zinc-500">Synapse UI Docs</p>
                <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-black/[0.02] dark:bg-white/[0.04] border border-[var(--fd-border)] font-mono">
                      ↑↓
                    </kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-black/[0.02] dark:bg-white/[0.04] border border-[var(--fd-border)] font-mono">
                      ↵
                    </kbd>
                    open
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
