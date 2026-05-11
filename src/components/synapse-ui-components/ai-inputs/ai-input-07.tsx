"use client";

import * as React from "react";

import {
  AtSign,
  Hash,
  Globe,
  FileText,
  Code,
  ArrowUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput08Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput08({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Type @ to mention...",
  disabled = false,
  className,
}: AIInput08Props) {
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

  const mentions = [
    {
      id: "docs",
      icon: FileText,
      label: "Docs",
    },
    {
      id: "code",
      icon: Code,
      label: "Code",
    },
    {
      id: "web",
      icon: Globe,
      label: "Web",
    },
  ];

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div className="rounded-2xl border border-input bg-background shadow-sm">
        <div className="flex items-center gap-1.5 px-3 pt-3">
          {mentions.map((mention) => (
            <Button
              key={mention.id}
              variant="outline"
              size="sm"
              className="h-7 gap-1 rounded-full text-xs"
              onClick={() =>
                setValue(
                  value + `@${mention.id} `
                )
              }
            >
              <mention.icon className="size-3" />

              {mention.label}
            </Button>
          ))}
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
          className="min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent px-4 py-3"
        />

        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    setValue(value + "@")
                  }
                >
                  <AtSign className="size-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Mention
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    setValue(value + "#")
                  }
                >
                  <Hash className="size-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Tag
              </TooltipContent>
            </Tooltip>
          </div>

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