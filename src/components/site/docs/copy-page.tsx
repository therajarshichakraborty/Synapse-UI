"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
  FileTextIcon,
  SparklesIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { toast } from "sonner";
import { GitHubIcon } from "@/components/site/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/** "Copy Page" split button: copy the page as Markdown, or hand it to an AI assistant. */
export function CopyPage({
  markdownUrl,
  url,
  sourceUrl,
  className,
}: {
  /** Route that serves this page as Markdown, e.g. /md/components/button. */
  markdownUrl: string;
  /** Absolute URL of the page. */
  url: string;
  /** GitHub URL of the MDX source. */
  sourceUrl?: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const cache = React.useRef<Promise<string> | null>(null);
  const prompt = encodeURIComponent(`Read ${url} and help me use it in my project.`);

  // Fetched lazily (and prefetched on hover) so pages don't ship their own source.
  const load = React.useCallback(() => {
    cache.current ??= fetch(markdownUrl).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.text();
    });
    return cache.current;
  }, [markdownUrl]);

  const copyPage = async () => {
    const text = load();
    try {
      // A promise-backed ClipboardItem keeps the user gesture alive in Safari.
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": text.then((t) => new Blob([t], { type: "text/plain" })),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(await text);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      toast.success("Page copied as Markdown", { description: "Paste it into your AI assistant." });
    } catch {
      cache.current = null;
      toast.error("Couldn't copy the page. Try “View as Markdown”.");
    }
  };

  return (
    <div
      onPointerEnter={() => void load().catch(() => (cache.current = null))}
      className={cn(
        "inline-flex h-8 items-stretch overflow-hidden rounded-lg border border-border bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] hover:border-border-strong",
        className,
      )}
    >
      <button
        type="button"
        onClick={copyPage}
        className="inline-flex items-center gap-1.5 px-2.5 text-[13px] font-medium outline-none transition-colors hover:bg-accent focus-visible:bg-accent active:scale-[0.97]"
      >
        <span className="relative grid size-3.5 place-items-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
              transition={{ type: "spring", stiffness: 520, damping: 28 }}
              className="absolute"
            >
              {copied ? (
                <CheckIcon className="size-3.5 text-success" strokeWidth={2.5} />
              ) : (
                <CopyIcon className="size-3.5" />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
        {copied ? "Copied" : "Copy Page"}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="More page actions"
          className="group inline-flex w-8 items-center justify-center border-l border-border outline-none transition-colors hover:bg-accent focus-visible:bg-accent data-[state=open]:bg-accent"
        >
          <ChevronDownIcon className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuItem onSelect={copyPage}>
            <FileTextIcon />
            <div className="grid">
              <span>Copy as Markdown</span>
              <span className="text-xs text-muted-foreground">For pasting into LLMs</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={markdownUrl} target="_blank" rel="noreferrer">
              <FileTextIcon />
              <div className="grid">
                <span>View as Markdown</span>
                <span className="text-xs text-muted-foreground">Plain text for LLMs</span>
              </div>
              <ExternalLinkIcon className="ml-auto size-3.5 opacity-60" />
            </a>
          </DropdownMenuItem>
          {sourceUrl && (
            <DropdownMenuItem asChild>
              <a href={sourceUrl} target="_blank" rel="noreferrer">
                <GitHubIcon className="size-4" />
                <div className="grid">
                  <span>View source</span>
                  <span className="text-xs text-muted-foreground">The MDX on GitHub</span>
                </div>
                <ExternalLinkIcon className="ml-auto size-3.5 opacity-60" />
              </a>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a
              href={`https://chatgpt.com/?hints=search&q=${prompt}`}
              target="_blank"
              rel="noreferrer"
            >
              <SparklesIcon />
              <span>Open in ChatGPT</span>
              <ExternalLinkIcon className="ml-auto size-3.5 opacity-60" />
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={`https://claude.ai/new?q=${prompt}`} target="_blank" rel="noreferrer">
              <SparklesIcon />
              <span>Open in Claude</span>
              <ExternalLinkIcon className="ml-auto size-3.5 opacity-60" />
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/** "Was this page helpful?" Stored locally; a "no" links to a prefilled issue. */
export function PageFeedback({ title }: { title: string }) {
  const [vote, setVote] = React.useState<"up" | "down" | null>(null);
  const key = `synapse:feedback:${title}`;

  React.useEffect(() => {
    try {
      const v = localStorage.getItem(key);
      if (v === "up" || v === "down") setVote(v);
    } catch {
      /* storage unavailable */
    }
  }, [key]);

  const choose = (v: "up" | "down") => {
    setVote(v);
    try {
      localStorage.setItem(key, v);
    } catch {
      /* storage unavailable */
    }
    if (v === "up") toast.success("Thanks for the feedback!");
  };

  return (
    <div className="mt-20 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <AnimatePresence mode="wait" initial={false}>
        {vote === "down" ? (
          <motion.p
            key="down"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-muted-foreground"
          >
            Sorry about that.{" "}
            <a
              className="font-medium text-foreground underline underline-offset-4"
              href={`${siteConfig.links.github}/issues/new?title=${encodeURIComponent(`[docs] ${title}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              Tell us what to improve
            </a>
          </motion.p>
        ) : (
          <motion.p
            key="ask"
            exit={{ opacity: 0, y: -6 }}
            className="text-sm text-muted-foreground"
          >
            Was this page helpful?
          </motion.p>
        )}
      </AnimatePresence>
      <div className="flex gap-1.5">
        {(
          [
            ["up", ThumbsUpIcon, "Yes"],
            ["down", ThumbsDownIcon, "No"],
          ] as const
        ).map(([v, Icon, label]) => (
          <button
            key={v}
            type="button"
            aria-pressed={vote === v}
            onClick={() => choose(v)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-[13px] font-medium text-muted-foreground transition-[color,background-color,border-color,transform] hover:border-border-strong hover:text-foreground active:scale-90",
              vote === v && "border-foreground bg-foreground text-background hover:text-background",
            )}
          >
            <Icon
              className={cn("size-3.5 transition-transform", vote === v && "-rotate-12 scale-110")}
            />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** `[` and `]` jump to the previous / next page. */
export function PagerHotkeys({ previous, next }: { previous?: string; next?: string }) {
  const router = useRouter();
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      if (e.key === "[" && previous) router.push(previous);
      if (e.key === "]" && next) router.push(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previous, next, router]);
  return null;
}
