"use client";

import * as React from "react";

interface UseAutoResizeTextareaProps {
  minHeight?: number;
  maxHeight?: number;
}

export function useAutoResizeTextarea({
  minHeight = 52,
  maxHeight = 200,
}: UseAutoResizeTextareaProps = {}) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustHeight = React.useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = "auto";
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight],
  );

  return { textareaRef, adjustHeight };
}
