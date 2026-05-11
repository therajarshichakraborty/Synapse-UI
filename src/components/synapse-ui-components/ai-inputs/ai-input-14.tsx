"use client";

import * as React from "react";

import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput15Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput15({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Ask anything...",
  disabled = false,
  className,
}: AIInput15Props) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } =
    useAutoResizeTextarea();

  const handleSubmit = () => {
    if (!value.trim()) return;

    onSubmit?.(value);

    setValue("");

    adjustHeight(true);
  };

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div className="relative">
        <div
          className={cn(
            "absolute -inset-[2px] rounded-2xl opacity-75",
            "bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-500"
          )}
        />

        <div className="relative rounded-[14px] bg-background">
          <Textarea
            ref={textareaRef}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);

              adjustHeight();
            }}
            className="min-h-[52px] max-h-[200px] resize-none rounded-[14px] border-0 bg-transparent py-4 pl-4 pr-14"
          />

          <Button
            size="icon"
            onClick={handleSubmit}
            className="absolute bottom-2 right-2 rounded-xl bg-gradient-to-r from-rose-500 to-violet-500 text-white"
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}