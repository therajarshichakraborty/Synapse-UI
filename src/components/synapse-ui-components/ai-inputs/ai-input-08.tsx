"use client";

import * as React from "react";

import {
  ArrowUp,
  Square,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput09Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onStop?: () => void;
  placeholder?: string;
  disabled?: boolean;
  isStreaming?: boolean;
  className?: string;
}

export function AIInput09({
  value: controlledValue,
  onChange,
  onSubmit,
  onStop,
  placeholder = "Ask me anything...",
  disabled = false,
  isStreaming = false,
  className,
}: AIInput09Props) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } =
    useAutoResizeTextarea();

  const handleSubmit = () => {
    if (
      !value.trim() ||
      disabled ||
      isStreaming
    )
      return;

    onSubmit?.(value);

    setValue("");

    adjustHeight(true);
  };

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div className="relative rounded-2xl border border-input bg-background shadow-sm">
        {isStreaming && (
          <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden rounded-t-2xl">
            <div className="h-full w-1/3 animate-pulse bg-primary" />
          </div>
        )}

        <Textarea
          ref={textareaRef}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);

            adjustHeight();
          }}
          className="min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent py-4 pl-4 pr-24"
        />

        <div className="absolute bottom-2 right-2">
          {isStreaming ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={onStop}
            >
              <Square className="mr-1 size-3" />
              Stop
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={handleSubmit}
            >
              <ArrowUp className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}