"use client";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

export function UseAutoResizeTextareaDemo() {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 200,
  });

  return (
    <textarea
      ref={textareaRef}
      onInput={() => adjustHeight()}
      placeholder="Type a message — the textarea grows with your content..."
      className="w-full max-w-md resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
    />
  );
}
