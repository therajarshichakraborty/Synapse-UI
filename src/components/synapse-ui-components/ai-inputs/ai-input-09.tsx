"use client";

import * as React from "react";

import {
  Lock,
  Unlock,
  ArrowUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Textarea } from "@/components/ui/textarea";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput10Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (
    value: string,
    isPrivate: boolean
  ) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput10({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Private conversation...",
  disabled = false,
  className,
}: AIInput10Props) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const [isPrivate, setIsPrivate] =
    React.useState(true);

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } =
    useAutoResizeTextarea();

  const handleSubmit = () => {
    if (!value.trim()) return;

    onSubmit?.(value, isPrivate);

    setValue("");

    adjustHeight(true);
  };

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div
        className={cn(
          "rounded-2xl border bg-background shadow-sm",
          isPrivate
            ? "border-input"
            : "border-amber-500/50"
        )}
      >
        <div className="flex items-center justify-between px-3 pt-2">
          <button
            type="button"
            onClick={() =>
              setIsPrivate(!isPrivate)
            }
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2 py-1 text-xs",
              isPrivate
                ? "bg-muted"
                : "bg-amber-500/10 text-amber-500"
            )}
          >
            {isPrivate ? (
              <>
                <Lock className="size-3" />
                Private
              </>
            ) : (
              <>
                <Unlock className="size-3" />
                Shared
              </>
            )}
          </button>

          {!isPrivate && (
            <Badge variant="outline">
              Others can see this
            </Badge>
          )}
        </div>

        <Textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            setValue(e.target.value);

            adjustHeight();
          }}
          className="min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent py-3 pl-4 pr-14"
        />

        <div className="flex justify-end px-3 pb-3">
          <Button
            size="icon"
            onClick={handleSubmit}
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}