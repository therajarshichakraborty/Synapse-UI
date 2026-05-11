"use client";

import * as React from "react";

import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput05Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput05({
  value: controlledValue,
  onChange,
  onSubmit,
  label = "Your message",
  disabled = false,
  className,
}: AIInput05Props) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const [isFocused, setIsFocused] =
    React.useState(false);

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } =
    useAutoResizeTextarea({
      minHeight: 56,
      maxHeight: 200,
    });

  const handleSubmit = () => {
    if (!value.trim()) return;

    onSubmit?.(value);

    setValue("");

    adjustHeight(true);
  };

  const isActive =
    isFocused || value.length > 0;

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div
        className={cn(
          "relative rounded-2xl border bg-background shadow-sm transition-all",
          isFocused
            ? "border-primary ring-[3px] ring-primary/20"
            : "border-input"
        )}
      >
        <label
          className={cn(
            "pointer-events-none absolute left-4 transition-all",
            isActive
              ? "top-2 text-xs text-primary"
              : "top-1/2 -translate-y-1/2 text-muted-foreground"
          )}
        >
          {label}
        </label>

        <Textarea
          ref={textareaRef}
          disabled={disabled}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            setValue(e.target.value);

            adjustHeight();
          }}
          className={cn(
            "min-h-[56px] max-h-[200px] resize-none border-0 bg-transparent pr-14",
            isActive
              ? "pt-6 pb-3 pl-4"
              : "py-4 pl-4"
          )}
        />

        <Button
          type="button"
          size="icon"
          disabled={!value.trim()}
          onClick={handleSubmit}
          className="absolute right-2 bottom-2 rounded-xl"
        >
          <ArrowUp className="size-4" />
        </Button>
      </div>
    </div>
  );
}