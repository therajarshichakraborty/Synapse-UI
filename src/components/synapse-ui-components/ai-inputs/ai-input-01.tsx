"use client";

import * as React from "react";

import {
  Sparkles,
  ChevronDown,
  Loader2,
  ArrowUp,
  Paperclip,
  Image as ImageIcon,
  Globe,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput02Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onAttach?: () => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  model?: string;
  onModelChange?: (model: string) => void;
}

export function AIInput02({
  value: controlledValue,
  onChange,
  onSubmit,
  onAttach,
  placeholder = "Message AI...",
  disabled = false,
  isLoading = false,
  className,
  model = "GPT-4o",
  onModelChange,
}: AIInput02Props) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } =
    useAutoResizeTextarea({
      minHeight: 56,
      maxHeight: 200,
    });

  const handleSubmit = () => {
    if (!value.trim() || disabled || isLoading)
      return;

    onSubmit?.(value);

    setValue("");

    adjustHeight(true);
  };

  const models = [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      badge: "Fastest",
    },
    {
      id: "gpt-4-turbo",
      name: "GPT-4 Turbo",
      badge: "Smart",
    },
    {
      id: "claude-3",
      name: "Claude 3",
      badge: "New",
    },
  ];

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div
        className={cn(
          "rounded-2xl border border-input bg-background shadow-sm",
          "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/20"
        )}
      >
        <div className="flex items-center gap-2 px-3 pt-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1.5 text-xs"
              >
                <Sparkles className="size-3.5" />

                {model}

                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-48"
            >
              {models.map((m) => (
                <DropdownMenuItem
                  key={m.id}
                  onClick={() =>
                    onModelChange?.(m.name)
                  }
                  className="flex items-center justify-between"
                >
                  <span>{m.name}</span>

                  <Badge variant="secondary">
                    {m.badge}
                  </Badge>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Textarea
          ref={textareaRef}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            adjustHeight();
          }}
          className="min-h-[48px] max-h-[200px] resize-none border-0 bg-transparent py-3 px-3"
        />

        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onAttach}
                >
                  <Paperclip className="size-4" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Attach Files
              </TooltipContent>
            </Tooltip>

            <Button
              variant="ghost"
              size="icon-sm"
            >
              <ImageIcon className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
            >
              <Globe className="size-4" />
            </Button>
          </div>

          <Button
            size="sm"
            disabled={!value.trim()}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                Send
                <ArrowUp className="ml-1 size-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}