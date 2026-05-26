"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface FormPopoverProps {
  children: React.ReactNode;
  title?: string;
  submitLabel?: string;
  onSubmit?: (data: Record<string, string>) => void;
  fields?: {
    name: string;
    label: string;
    type?: "text" | "email" | "number" | "textarea";
    placeholder?: string;
    required?: boolean;
    defaultValue?: string;
  }[];
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export function FormPopover({
  children,
  title,
  submitLabel = "Submit",
  onSubmit,
  fields = [],
  side = "bottom",
  className,
}: FormPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const initialData: Record<string, string> = {};
    fields.forEach((field) => {
      initialData[field.name] = field.defaultValue || "";
    });
    setFormData(initialData);
  }, [fields]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setOpen(false);
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          sideOffset={8}
          align="start"
          className={cn(
            "z-50 w-80 rounded-xl border border-border bg-card shadow-xl",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h4 className="font-semibold text-card-foreground">{title}</h4>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="p-4">
            <div className="space-y-3">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-card-foreground mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-0.5">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={formData[field.name] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={3}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={formData[field.name] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {submitLabel}
            </button>
          </form>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
