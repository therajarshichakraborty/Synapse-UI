"use client";

import React, { useState, useRef } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const languageLabels: Record<string, string> = {
  tsx: "TypeScript JSX",
  ts: "TypeScript",
  jsx: "JavaScript JSX",
  js: "JavaScript",
  bash: "Shell",
  sh: "Shell",
  css: "CSS",
  json: "JSON",
  mdx: "MDX",
  html: "HTML",
  python: "Python",
  py: "Python",
};

const languageColors: Record<string, string> = {
  tsx: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20",
  ts: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20",
  jsx: "text-amber-600 dark:text-yellow-400 bg-amber-50 dark:bg-yellow-500/10 border-amber-200 dark:border-yellow-500/20",
  js: "text-amber-600 dark:text-yellow-400 bg-amber-50 dark:bg-yellow-500/10 border-amber-200 dark:border-yellow-500/20",
  bash: "text-emerald-600 dark:text-green-400 bg-emerald-50 dark:bg-green-500/10 border-emerald-200 dark:border-green-500/20",
  sh: "text-emerald-600 dark:text-green-400 bg-emerald-50 dark:bg-green-500/10 border-emerald-200 dark:border-green-500/20",
  css: "text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-500/10 border-fuchsia-200 dark:border-fuchsia-500/20",
  json: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20",
  python:
    "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/20",
};

interface PremiumCodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
  className?: string;
  "data-language"?: string;
  filename?: string;
}

export function PremiumCodeBlock({
  children,
  className,
  "data-language": lang,
  filename,
  style,
  ...props
}: PremiumCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const extractText = (node: React.ReactNode): string => {
    if (node === null || node === undefined) return "";
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) {
      return node.map(extractText).join("");
    }
    if (React.isValidElement(node)) {
      const props = node.props as any;
      if (
        props &&
        props.dangerouslySetInnerHTML &&
        typeof props.dangerouslySetInnerHTML.__html === "string"
      ) {
        const html = props.dangerouslySetInnerHTML.__html;
        return html
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<[^>]*>/g, "")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
      }
      const childrenText = extractText(props?.children);
      const className = props?.className || "";
      if (typeof className === "string" && className.split(" ").includes("line")) {
        return childrenText + "\n";
      }
      return childrenText;
    }
    return "";
  };

  const handleCopy = async () => {
    try {
      let text = preRef.current?.textContent || "";

      if (!text || (text.split("\n").length <= 1 && React.Children.count(children) > 1)) {
        text = extractText(children);
      }

      text = text.trim();
      if (!text) return;

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code block content:", err);
    }
  };

  let resolvedLang = lang || "";

  if (!resolvedLang && className) {
    const match = className.split(" ").find((c) => c.startsWith("language-"));
    if (match) {
      resolvedLang = match.replace("language-", "");
    }
  }

  if (!resolvedLang && children) {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && typeof child.props === "object" && child.props !== null) {
        const childClass = (child.props as any).className;
        if (typeof childClass === "string") {
          const match = childClass.split(" ").find((c: string) => c.startsWith("language-"));
          if (match) {
            resolvedLang = match.replace("language-", "");
          }
        }
      }
    });
  }

  const shikiGenericClasses = ["shiki", "shiki-themes", "github-light", "github-dark"];
  if (shikiGenericClasses.includes(resolvedLang.toLowerCase()) || resolvedLang.includes(" ")) {
    resolvedLang = "";
  }

  const label = languageLabels[resolvedLang] ?? resolvedLang.toUpperCase();
  const badgeColor =
    languageColors[resolvedLang] ??
    "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-500/10 border-zinc-200 dark:border-zinc-500/20";
  const isBash = resolvedLang === "bash" || resolvedLang === "sh";

  return (
    <div
      className={cn(
        "relative my-6 rounded-lg overflow-hidden",
        "border border-zinc-200 dark:border-zinc-800",
        "bg-zinc-50 dark:bg-zinc-950",
        "shadow-sm dark:shadow-md",
        "group",
      )}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/30">
        <div className="flex items-center gap-2.5">
          {isBash && <Terminal className="h-3.5 w-3.5 text-emerald-600 dark:text-green-400" />}
          {filename ? (
            <span className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">{filename}</span>
          ) : (
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border",
                badgeColor,
              )}
            >
              {label || "CODE"}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all duration-200",
            "border",
            copied
              ? "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/[0.07] hover:border-zinc-300 dark:hover:border-white/[0.1]",
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <pre
          ref={preRef}
          style={style}
          className={cn(
            "px-5 py-4 text-sm leading-relaxed font-mono !bg-transparent",
            "text-zinc-800 dark:text-zinc-300",
            "[&_code]:!bg-transparent [&_code]:!text-inherit [&_code]:!p-0 [&_code]:!border-none [&_code]:!shadow-none [&_code]:!ring-0",
            "[&_.line]:leading-7",
            "[&_.highlighted]:bg-violet-500/10 [&_.highlighted]:border-l-2 [&_.highlighted]:border-violet-400 [&_.highlighted]:-mx-5 [&_.highlighted]:px-4",
            className,
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
