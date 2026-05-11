"use client";

import * as React from "react";

import {
  MessageSquare,
  Image as ImageIcon,
  Code,
  ArrowUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

type InputMode =
  | "chat"
  | "image"
  | "code";

interface AIInput11Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (
    value: string,
    mode: InputMode
  ) => void;
  disabled?: boolean;
  className?: string;
}

export function AIInput11({
  value: controlledValue,
  onChange,
  onSubmit,
  disabled = false,
  className,
}: AIInput11Props) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const [mode, setMode] =
    React.useState<InputMode>("chat");

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } =
    useAutoResizeTextarea();

  const handleSubmit = () => {
    if (!value.trim()) return;

    onSubmit?.(value, mode);

    setValue("");

    adjustHeight(true);
  };

  const modes = [
    {
      id: "chat" as const,
      icon: MessageSquare,
      label: "Chat",
    },
    {
      id: "image" as const,
      icon: ImageIcon,
      label: "Image",
    },
    {
      id: "code" as const,
      icon: Code,
      label: "Code",
    },
  ];

  const placeholders = {
    chat: "Ask anything...",
    image:
      "Describe the image...",
    code: "Describe the code...",
  };

  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <div className="rounded-2xl border border-input bg-background shadow-sm">
        <div className="flex items-center gap-1 px-2 pt-2">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() =>
                setMode(m.id)
              }
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs",
                mode === m.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <m.icon className="size-3.5" />
              {m.label}
            </button>
          ))}
        </div>

        <Textarea
          ref={textareaRef}
          placeholder={
            placeholders[mode]
          }
          disabled={disabled}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);

            adjustHeight();
          }}
          className={cn(
            "min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent py-3 pl-4 pr-14",
            mode === "code" &&
              "font-mono text-sm"
          )}
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