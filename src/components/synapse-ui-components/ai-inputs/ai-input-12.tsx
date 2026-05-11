"use client";

import * as React from "react";

import {
  Sparkles,
  Settings,
  Eye,
  Globe,
  Paperclip,
  Image as ImageIcon,
  Mic,
  Command,
  Loader2,
  ArrowUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Textarea } from "@/components/ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput13Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function AIInput13({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "How can I help?",
  disabled = false,
  isLoading = false,
  className,
}: AIInput13Props) {
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
    <div className={cn("mx-auto max-w-2xl", className)}>
      <div className="rounded-2xl border border-input bg-background shadow-lg">
        <div className="flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
              <Sparkles className="size-3.5 text-white" />
            </div>

            <span className="text-sm font-medium">
              AI Assistant
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
              >
                <Settings className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 size-4" />
                Preview
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Globe className="mr-2 size-4" />
                Web Search
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
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
          className="min-h-[56px] max-h-[200px] resize-none border-0 bg-transparent px-4 py-3"
        />

        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1">
            {[
              Paperclip,
              ImageIcon,
              Mic,
            ].map((Icon, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                  >
                    <Icon className="size-4" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  Action
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <kbd className="hidden rounded border bg-muted px-1.5 py-1 text-[10px] sm:inline-flex">
              <Command className="mr-1 size-3" />
              K
            </kbd>

            <Button
              size="sm"
              disabled={!value.trim()}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-1 size-3 animate-spin" />
                  Thinking
                </>
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
    </div>
  );
}