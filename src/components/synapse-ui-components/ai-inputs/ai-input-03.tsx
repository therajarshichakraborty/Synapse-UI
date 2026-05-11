"use client";

import * as React from "react";

import {
  FileText,
  Code,
  Image as ImageIcon,
  Brain,
  ArrowUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput04Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onActionClick?: (action: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput04({
  value: controlledValue,
  onChange,
  onSubmit,
  onActionClick,
  placeholder = "What would you like to create?",
  disabled = false,
  className,
}: AIInput04Props) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } =
    useAutoResizeTextarea({
      minHeight: 52,
      maxHeight: 200,
    });

  const handleSubmit = () => {
    if (!value.trim()) return;

    onSubmit?.(value);

    setValue("");

    adjustHeight(true);
  };

  const quickActions = [
    {
      id: "write",
      icon: FileText,
      label: "Write",
    },
    {
      id: "code",
      icon: Code,
      label: "Code",
    },
    {
      id: "image",
      icon: ImageIcon,
      label: "Image",
    },
    {
      id: "analyze",
      icon: Brain,
      label: "Analyze",
    },
  ];

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div className="mb-3 flex flex-wrap gap-2">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 rounded-full"
            onClick={() =>
              onActionClick?.(action.id)
            }
          >
            <action.icon className="size-3.5" />

            {action.label}
          </Button>
        ))}
      </div>

      <div
        className={cn(
          "relative rounded-2xl border border-input bg-background shadow-sm",
          "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/20"
        )}
      >
        <Textarea
          ref={textareaRef}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);

            adjustHeight();
          }}
          className="min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent py-4 pl-4 pr-14"
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