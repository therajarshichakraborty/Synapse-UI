"use client";

import * as React from "react";

import {
  ArrowUp,
  Mic,
  Paperclip,
  Square,
  Sparkles,
} from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

const aiInputVariants = cva(
  [
    "group relative w-full overflow-hidden transition-all duration-200",
    "border backdrop-blur-xl",
    "focus-within:ring-4",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background/80",
          "focus-within:border-primary/40",
          "focus-within:ring-primary/10",
        ],

        glass: [
          "border-white/10 bg-white/5",
          "shadow-2xl shadow-black/5",
          "focus-within:border-white/20",
          "focus-within:ring-white/10",
        ],

        gradient: [
          "border-transparent",
          "bg-gradient-to-b from-background to-muted/40",
          "focus-within:ring-primary/15",
        ],
      },

      size: {
        sm: "rounded-2xl",
        default: "rounded-3xl",
        lg: "rounded-[28px]",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const textareaSizes = {
  sm: "px-4 pt-3 pb-14 text-sm",
  default: "px-5 pt-4 pb-16 text-sm",
  lg: "px-6 pt-5 pb-20 text-base",
};

const actionSizes = {
  sm: "h-8 w-8",
  default: "h-9 w-9",
  lg: "h-10 w-10",
};

interface AIInputProps
  extends VariantProps<typeof aiInputVariants> {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;

  onVoiceClick?: () => void;
  onAttachClick?: () => void;
  onEnhanceClick?: () => void;

  placeholder?: string;

  disabled?: boolean;
  loading?: boolean;

  className?: string;

  minHeight?: number;
  maxHeight?: number;

  showVoice?: boolean;
  showAttach?: boolean;
  showEnhance?: boolean;

  submitOnEnter?: boolean;
}

export function AIInput({
  value: controlledValue,
  onChange,
  onSubmit,

  onVoiceClick,
  onAttachClick,
  onEnhanceClick,

  placeholder = "Ask anything...",

  disabled = false,
  loading = false,

  className,

  variant,
  size,

  minHeight = 56,
  maxHeight = 240,

  showVoice = true,
  showAttach = true,
  showEnhance = false,

  submitOnEnter = true,
}: AIInputProps) {
  const [internalValue, setInternalValue] =
    React.useState("");

  const value = controlledValue ?? internalValue;

  const setValue = onChange ?? setInternalValue;

  const { textareaRef, adjustHeight } =
    useAutoResizeTextarea({
      minHeight,
      maxHeight,
    });

  React.useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleSubmit = React.useCallback(() => {
    if (!value.trim()) return;

    if (disabled || loading) return;

    onSubmit?.(value);

    setValue("");

    requestAnimationFrame(() => {
      adjustHeight(true);
    });
  }, [
    value,
    disabled,
    loading,
    onSubmit,
    setValue,
    adjustHeight,
  ]);

  return (
    <TooltipProvider delayDuration={100}>
      <div
        className={cn(
          "relative w-full",
          className
        )}
      >
        <div
          className={cn(
            aiInputVariants({
              variant,
              size,
            })
          )}
        >
          {/* glow */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
              "bg-gradient-to-r from-primary/5 via-transparent to-primary/5",
              "group-focus-within:opacity-100"
            )}
          />

          <Textarea
            ref={textareaRef}
            value={value}
            disabled={disabled}
            rows={1}
            placeholder={placeholder}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (
                submitOnEnter &&
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className={cn(
              "relative z-10 w-full resize-none border-0 bg-transparent",
              "leading-6 shadow-none",
              "placeholder:text-muted-foreground/70",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "overflow-y-auto",
              textareaSizes[size ?? "default"]
            )}
            style={{
              minHeight,
              maxHeight,
            }}
          />

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-20",
              "flex items-center justify-between",
              "px-3 pb-3"
            )}
          >
            {/* LEFT ACTIONS */}
            <div className="flex items-center gap-1">
              {showAttach && (
                <ActionButton
                  tooltip="Attach File"
                  onClick={onAttachClick}
                  size={size}
                  disabled={disabled}
                >
                  <Paperclip className="h-4 w-4" />
                </ActionButton>
              )}

              {showVoice && (
                <ActionButton
                  tooltip="Voice Input"
                  onClick={onVoiceClick}
                  size={size}
                  disabled={disabled}
                >
                  <Mic className="h-4 w-4" />
                </ActionButton>
              )}

              {showEnhance && (
                <ActionButton
                  tooltip="Enhance Prompt"
                  onClick={onEnhanceClick}
                  size={size}
                  disabled={disabled}
                >
                  <Sparkles className="h-4 w-4" />
                </ActionButton>
              )}
            </div>

            {/* SEND */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  disabled={
                    disabled ||
                    loading ||
                    !value.trim()
                  }
                  onClick={handleSubmit}
                  className={cn(
                    "rounded-2xl transition-all duration-200",
                    "shadow-md",
                    "hover:scale-[1.03]",
                    "active:scale-95",
                    actionSizes[size ?? "default"]
                  )}
                >
                  {loading ? (
                    <Square className="h-3.5 w-3.5 fill-current" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>

              <TooltipContent side="top">
                Send Message
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

interface ActionButtonProps {
  children: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
}

function ActionButton({
  children,
  tooltip,
  onClick,
  disabled,
  size = "default",
}: ActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          disabled={disabled}
          onClick={onClick}
          className={cn(
            "rounded-xl text-muted-foreground",
            "hover:bg-muted hover:text-foreground",
            "transition-colors",
            actionSizes[size]
          )}
        >
          {children}
        </Button>
      </TooltipTrigger>

      <TooltipContent side="top">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}