"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconBadgeVariants = cva(
  "inline-flex w-fit items-center justify-center rounded-lg transition-all duration-200",
  {
    variants: {
      size: {
        sm: "h-6 w-6 [&>svg]:h-3.5 [&>svg]:w-3.5",
        md: "h-8 w-8 [&>svg]:h-4 [&>svg]:w-4",
        lg: "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5",
      },
      variant: {
        filled: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
        soft: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        outline: "border-2 border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400",
        ghost: "text-zinc-600 dark:text-zinc-400",
      },
      color: {
        default: "",
        primary: "",
        success: "",
        warning: "",
        danger: "",
      },
      state: {
        default: "",
        hover: "ring-2 ring-offset-2 ring-offset-background",
        active: "scale-90",
        disabled: "opacity-40 cursor-not-allowed",
      },
    },
    compoundVariants: [
      // Success variants
      {
        variant: "filled",
        color: "success",
        className: "bg-emerald-500 text-white dark:bg-emerald-500",
      },
      {
        variant: "soft",
        color: "success",
        className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "border-emerald-300 text-emerald-600 dark:border-emerald-700 dark:text-emerald-400",
      },
      { variant: "ghost", color: "success", className: "text-emerald-600 dark:text-emerald-400" },
      // Warning variants
      {
        variant: "filled",
        color: "warning",
        className: "bg-amber-500 text-white dark:bg-amber-500",
      },
      {
        variant: "soft",
        color: "warning",
        className: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
      },
      {
        variant: "outline",
        color: "warning",
        className: "border-amber-300 text-amber-600 dark:border-amber-700 dark:text-amber-400",
      },
      { variant: "ghost", color: "warning", className: "text-amber-600 dark:text-amber-400" },
      // Danger variants
      { variant: "filled", color: "danger", className: "bg-red-500 text-white dark:bg-red-500" },
      {
        variant: "soft",
        color: "danger",
        className: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400",
      },
      {
        variant: "outline",
        color: "danger",
        className: "border-red-300 text-red-600 dark:border-red-700 dark:text-red-400",
      },
      { variant: "ghost", color: "danger", className: "text-red-600 dark:text-red-400" },
      // Primary variants
      { variant: "filled", color: "primary", className: "bg-blue-500 text-white dark:bg-blue-500" },
      {
        variant: "soft",
        color: "primary",
        className: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
      },
      {
        variant: "outline",
        color: "primary",
        className: "border-blue-300 text-blue-600 dark:border-blue-700 dark:text-blue-400",
      },
      { variant: "ghost", color: "primary", className: "text-blue-600 dark:text-blue-400" },
      // Hover ring colors
      { state: "hover", color: "default", className: "ring-zinc-300 dark:ring-zinc-600" },
      { state: "hover", color: "primary", className: "ring-blue-300 dark:ring-blue-600" },
      { state: "hover", color: "success", className: "ring-emerald-300 dark:ring-emerald-600" },
      { state: "hover", color: "warning", className: "ring-amber-300 dark:ring-amber-600" },
      { state: "hover", color: "danger", className: "ring-red-300 dark:ring-red-600" },
    ],
    defaultVariants: {
      size: "md",
      variant: "filled",
      color: "default",
      state: "default",
    },
  },
);

interface IconBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof iconBadgeVariants> {
  icon: React.ReactNode;
}

function IconBadge({ className, size, variant, color, state, icon, ...props }: IconBadgeProps) {
  return (
    <span className={cn(iconBadgeVariants({ size, variant, color, state }), className)} {...props}>
      {icon}
    </span>
  );
}

export { IconBadge, iconBadgeVariants };
