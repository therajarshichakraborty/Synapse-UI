"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const languageLabels: Record<string, string> = {
  tsx:        "TypeScript JSX",
  ts:         "TypeScript",
  jsx:        "JavaScript JSX",
  js:         "JavaScript",
  bash:       "Shell",
  sh:         "Shell",
  css:        "CSS",
  json:       "JSON",
  mdx:        "MDX",
  html:       "HTML",
  python:     "Python",
  py:         "Python",
};

const languageColors: Record<string, string> = {
  tsx:    "text-blue-400   bg-blue-500/10   border-blue-500/20",
  ts:     "text-blue-400   bg-blue-500/10   border-blue-500/20",
  jsx:    "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  js:     "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  bash:   "text-green-400  bg-green-500/10  border-green-500/20",
  sh:     "text-green-400  bg-green-500/10  border-green-500/20",
  css:    "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  json:   "text-orange-400 bg-orange-500/10 border-orange-500/20",
  python: "text-sky-400    bg-sky-500/10    border-sky-500/20",
};

interface PremiumCodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  /** data-language from rehype */
  "data-language"?: string;
  /** filename shown in the header tab */
  filename?: string;
}

/**
 * Premium code block — glassmorphic dark panel with gradient top border,
 * language badge, filename tab, and animated copy button.
 * Replaces the default fumadocs <pre> element.
 */
export function PremiumCodeBlock({
  children,
  className,
  "data-language": lang,
  filename,
}: PremiumCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node && typeof node === "object" && "props" in node) {
      return extractText((node as any).props?.children);
    }
    return "";
  };

  const handleCopy = async () => {
    const text = extractText(children);
    await navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resolvedLang = lang ?? className?.replace(/language-/, "") ?? "";
  const label = languageLabels[resolvedLang] ?? resolvedLang.toUpperCase();
  const badgeColor = languageColors[resolvedLang] ?? "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
  const isBash = resolvedLang === "bash" || resolvedLang === "sh";

  return (
    <div
      className={cn(
        "relative my-6 rounded-xl overflow-hidden",
        "border border-white/[0.08]",
        "bg-[#0a0014]/80 backdrop-blur-md",
        "shadow-[0_4px_40px_rgba(0,0,0,0.4)]",
        "group"
      )}
    >
      {/* Gradient top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-violet-500/50 via-fuchsia-500/30 to-transparent" />

      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          {isBash && <Terminal className="h-3.5 w-3.5 text-green-400" />}
          {filename ? (
            <span className="text-xs text-zinc-400 font-mono">{filename}</span>
          ) : (
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border",
                badgeColor
              )}
            >
              {label || "CODE"}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all duration-200",
            "border",
            copied
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-white/[0.06] bg-white/[0.03] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.07] hover:border-white/[0.1]"
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <><Check className="h-3 w-3" /><span>Copied!</span></>
          ) : (
            <><Copy className="h-3 w-3" /><span>Copy</span></>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre
          className={cn(
            "px-5 py-4 text-sm leading-relaxed font-mono",
            "text-zinc-300",
            "[&_code]:bg-transparent [&_code]:text-inherit [&_code]:p-0",
            "[&_.line]:leading-7",
            "[&_.highlighted]:bg-violet-500/10 [&_.highlighted]:border-l-2 [&_.highlighted]:border-violet-400 [&_.highlighted]:-mx-5 [&_.highlighted]:px-4",
          )}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
