"use client";

import * as React from "react";

import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput12Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

export function AIInput12({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Write your message...",
  disabled = false,
  maxLength = 500,
  className,
}: AIInput12Props) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } =
    useAutoResizeTextarea();

  const handleSubmit = () => {
    if (
      !value.trim() ||
      value.length > maxLength
    )
      return;

    onSubmit?.(value);

    setValue("");

    adjustHeight(true);
  };

  const count = value.length;

  const isNear =
    count >= maxLength * 0.8;

  const isOver =
    count > maxLength;

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div
        className={cn(
          "rounded-2xl border bg-background shadow-sm",
          isOver
            ? "border-destructive"
            : "border-input"
        )}
      >
        <Textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            setValue(e.target.value);

            adjustHeight();
          }}
          className="min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent py-4 pl-4 pr-14"
        />

        <div className="flex items-center justify-between px-3 pb-3">
          <span
            className={cn(
              "text-xs",
              isOver
                ? "text-destructive"
                : isNear
                ? "text-amber-500"
                : "text-muted-foreground"
            )}
          >
            {count}/{maxLength}
          </span>

          <Button
            size="icon"
            disabled={isOver}
            onClick={handleSubmit}
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}