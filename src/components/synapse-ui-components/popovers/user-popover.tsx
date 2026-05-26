"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import { MapPin, Calendar, Link as LinkIcon, Mail } from "lucide-react"

interface UserPopoverProps {
  children: React.ReactNode
  user?: {
    name: string
    username?: string
    avatar?: string
    bio?: string
    location?: string
    joinDate?: string
    website?: string
    email?: string
    stats?: {
      label: string
      value: string | number
    }[]
  }
  side?: "top" | "right" | "bottom" | "left"
  className?: string
  actions?: React.ReactNode
}

export function UserPopover({
  children,
  user = { name: "User", username: "user", bio: "No bio available" },
  side = "top",
  className,
  actions,
}: UserPopoverProps) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          sideOffset={8}
          align="start"
          className={cn(
            "z-50 w-80 rounded-xl border border-border bg-card shadow-xl overflow-hidden",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
        >
          {/* Header with gradient */}
          <div className="h-16 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
          
          {/* Avatar overlapping header */}
          <div className="px-4 -mt-10">
            <div className="relative inline-block">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-20 w-20 rounded-full border-4 border-card object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full border-4 border-card bg-muted flex items-center justify-center text-2xl font-semibold text-muted-foreground">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* User info */}
          <div className="px-4 pt-2 pb-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold text-card-foreground">{user.name}</h4>
                {user.username && (
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
                )}
              </div>
              {actions}
            </div>

            {user.bio && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {user.bio}
              </p>
            )}

            {/* Meta info */}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {user.location}
                </span>
              )}
              {user.joinDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {user.joinDate}
                </span>
              )}
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <LinkIcon className="h-3 w-3" />
                  Website
                </a>
              )}
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <Mail className="h-3 w-3" />
                  Email
                </a>
              )}
            </div>

            {/* Stats */}
            {user.stats && user.stats.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border flex gap-4">
                {user.stats.map((stat, index) => (
                  <div key={index}>
                    <span className="font-semibold text-card-foreground">
                      {typeof stat.value === "number"
                        ? stat.value.toLocaleString()
                        : stat.value}
                    </span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
