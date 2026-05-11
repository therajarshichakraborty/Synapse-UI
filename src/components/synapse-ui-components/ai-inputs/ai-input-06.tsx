"use client";

import * as React from "react";

import {
  Paperclip,
  Image as ImageIcon,
  FileText,
  X,
  Plus,
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

interface AttachedFile {
  id: string;
  name: string;
  type: "image" | "document" | "other";
  size: string;
}

interface AIInput07Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (
    value: string,
    files: AttachedFile[]
  ) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInput07({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "Describe your request...",
  disabled = false,
  className,
}: AIInput07Props) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const [files, setFiles] = React.useState<
    AttachedFile[]
  >([
    {
      id: "1",
      name: "screenshot.png",
      type: "image",
      size: "2.4 MB",
    },
  ]);

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } =
    useAutoResizeTextarea();

  const handleSubmit = () => {
    if (!value.trim() && files.length === 0)
      return;

    onSubmit?.(value, files);

    setValue("");

    setFiles([]);

    adjustHeight(true);
  };

  const removeFile = (id: string) => {
    setFiles(
      files.filter((file) => file.id !== id)
    );
  };

  const getIcon = (
    type: AttachedFile["type"]
  ) => {
    switch (type) {
      case "image":
        return ImageIcon;

      case "document":
        return FileText;

      default:
        return Paperclip;
    }
  };

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div className="rounded-2xl border border-input bg-background shadow-sm">
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 pb-0">
            {files.map((file) => {
              const Icon = getIcon(file.type);

              return (
                <div
                  key={file.id}
                  className="group flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-2.5 py-1.5"
                >
                  <Icon className="size-4" />

                  <span className="max-w-[120px] truncate text-sm">
                    {file.name}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removeFile(file.id)
                    }
                    className="opacity-0 transition-all group-hover:opacity-100"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
              >
                <Plus className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              Add Attachment
            </TooltipContent>
          </Tooltip>

          <Button
            size="sm"
            onClick={handleSubmit}
          >
            <ArrowUp className="mr-1 size-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}