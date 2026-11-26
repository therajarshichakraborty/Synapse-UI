"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowRightIcon,
  BlocksIcon,
  BookOpenIcon,
  ComponentIcon,
  FileTextIcon,
  HashIcon,
  LaptopIcon,
  MoonIcon,
  SearchIcon,
  SmartphoneIcon,
  SparklesIcon,
  SunIcon,
} from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  animatedComponents,
  blockComponents,
  coreComponents,
  entryUrl,
  nativeComponents,
} from "@/registry/registry";

type SearchResult = { id: string; url: string; type: "page" | "heading" | "text"; content: string };

export const gettingStartedPages = [
  { title: "Introduction", url: "/docs" },
  { title: "Installation", url: "/docs/installation" },
  { title: "Theming", url: "/docs/theming" },
  { title: "Dark Mode", url: "/docs/dark-mode" },
  { title: "CLI", url: "/docs/cli" },
  { title: "Changelog", url: "/docs/changelog" },
];

const CommandMenuContext = React.createContext<{ open: () => void }>({ open: () => {} });

export function useCommandMenu() {
  return React.useContext(CommandMenuContext);
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = React.useState(false);
  const value = React.useMemo(() => ({ open: () => setOpen(true) }), []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdK = e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey);
      const isSlash = e.key === "/" && !isTypingTarget(e.target);
      if (isCmdK || isSlash) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CommandMenuContext.Provider value={value}>
      {children}
      <CommandMenu open={isOpen} onOpenChange={setOpen} />
    </CommandMenuContext.Provider>
  );
}

function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);

  React.useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const id = window.setTimeout(() => {
      fetch(`/api/search?query=${encodeURIComponent(query)}`, { signal: controller.signal })
        .then((r) => (r.ok ? (r.json() as Promise<SearchResult[]>) : []))
        .then((data) =>
          setResults(
            Array.isArray(data)
              ? data.slice(0, 12).map((r) => ({ ...r, content: r.content.replace(/<[^>]+>/g, "") }))
              : [],
          ),
        )
        .catch(() => {});
    }, 120);
    return () => {
      controller.abort();
      window.clearTimeout(id);
    };
  }, [query]);

  const run = React.useCallback(
    (fn: () => void) => {
      onOpenChange(false);
      setQuery("");
      fn();
    },
    [onOpenChange],
  );

  const go = (url: string) => run(() => router.push(url));

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search documentation"
      description="Search pages, components and blocks"
      className="sm:max-w-xl"
    >
      <Command className="rounded-none! bg-transparent">
        <CommandInput
          placeholder="Search docs, components, blocks..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[min(60vh,460px)] scrollbar-thin">
          <CommandEmpty>No results found.</CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading="Matches in docs">
              {results.map((r) => (
                <CommandItem
                  key={r.id}
                  value={`search ${r.content} ${r.url}`}
                  onSelect={() => go(r.url)}
                >
                  {r.type === "page" ? <FileTextIcon /> : <HashIcon />}
                  <span className="truncate">{r.content}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading="Getting Started">
            {gettingStartedPages.map((p) => (
              <CommandItem key={p.url} value={p.title} onSelect={() => go(p.url)}>
                <BookOpenIcon />
                {p.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Components">
            {coreComponents.map((c) => (
              <CommandItem
                key={c.name}
                value={`${c.title} ${c.name}`}
                onSelect={() => go(entryUrl(c))}
              >
                <ComponentIcon />
                {c.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Animated">
            {animatedComponents.map((c) => (
              <CommandItem
                key={c.name}
                value={`${c.title} ${c.name} animated`}
                onSelect={() => go(entryUrl(c))}
              >
                <SparklesIcon />
                {c.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Blocks">
            {blockComponents.map((c) => (
              <CommandItem
                key={c.name}
                value={`${c.title} ${c.name} block`}
                onSelect={() => go(entryUrl(c))}
              >
                <BlocksIcon />
                {c.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="React Native">
            {nativeComponents.map((c) => (
              <CommandItem
                key={c.name}
                value={`${c.title} ${c.name} react native expo mobile`}
                onSelect={() => go(entryUrl(c))}
              >
                <SmartphoneIcon />
                {c.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem value="theme light" onSelect={() => run(() => setTheme("light"))}>
              <SunIcon /> Light
            </CommandItem>
            <CommandItem value="theme dark" onSelect={() => run(() => setTheme("dark"))}>
              <MoonIcon /> Dark
            </CommandItem>
            <CommandItem value="theme system" onSelect={() => run(() => setTheme("system"))}>
              <LaptopIcon /> System
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Links">
            <CommandItem value="home landing page" onSelect={() => go("/")}>
              <ArrowRightIcon /> Home
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

export function SearchTrigger({ className }: { className?: string }) {
  const { open } = useCommandMenu();
  return (
    <button
      type="button"
      onClick={open}
      aria-label="Search documentation"
      aria-keyshortcuts="Meta+K Control+K"
      className={cn(
        "group inline-flex h-9 items-center gap-2 rounded-lg bg-muted/70 px-3 text-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 dark:bg-muted dark:hover:bg-accent",
        className,
      )}
    >
      <SearchIcon className="size-4 shrink-0 sm:hidden" aria-hidden="true" />
      <span className="hidden flex-1 truncate text-left sm:inline">Search documentation...</span>
      <kbd className="pointer-events-none hidden h-5 items-center gap-0.5 rounded-md border border-border bg-background px-1.5 font-sans text-[11px] font-medium text-muted-foreground md:inline-flex lg:hidden xl:inline-flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
