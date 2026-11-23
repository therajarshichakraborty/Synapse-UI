"use client";

import { useState } from "react";
import { Users, X, Plus, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  online: boolean;
}

interface Alert20Props {
  title?: string;
  description?: string;
  members?: TeamMember[];
  onInvite?: (email: string) => void;
  onDismiss?: () => void;
  className?: string;
}

const defaultMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Chen",
    email: "alex@company.com",
    avatar: "AC",
    role: "Owner",
    online: true,
  },
  {
    id: "2",
    name: "Sarah Kim",
    email: "sarah@company.com",
    avatar: "SK",
    role: "Editor",
    online: true,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@company.com",
    avatar: "MJ",
    role: "Viewer",
    online: false,
  },
];

export default function Alert20({
  title = "Team Collaboration",
  description = "Manage who has access to this project.",
  members = defaultMembers,
  onInvite,
  onDismiss,
  className,
}: Alert20Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [email, setEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 200);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsInviting(true);
    setTimeout(() => {
      setIsInviting(false);
      setInviteSent(true);
      onInvite?.(email);
      setTimeout(() => {
        setInviteSent(false);
        setEmail("");
      }, 2000);
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div
        className={cn(
          "relative rounded-xl overflow-hidden",
          "bg-white dark:bg-zinc-900",
          "border border-zinc-200 dark:border-zinc-800",
          "shadow-xl shadow-zinc-200/50 dark:shadow-zinc-950/50",
          "transition-all duration-200",
          isExiting && "opacity-0 scale-95",
        )}
        role="dialog"
        aria-labelledby="team-title"
      >
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                <Users className="h-5 w-5 text-white" />
              </div>

              <div>
                <h3
                  id="team-title"
                  className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  {title}
                </h3>
                <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0 p-1 rounded-md",
                "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors duration-150",
                "focus:outline-none focus:ring-2 focus:ring-zinc-400",
              )}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleInvite} className="mt-4">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email to invite..."
                className={cn(
                  "flex-1 px-3 py-2 text-sm rounded-lg",
                  "bg-zinc-50 dark:bg-zinc-800",
                  "border border-zinc-200 dark:border-zinc-700",
                  "text-zinc-900 dark:text-zinc-100",
                  "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                )}
              />
              <button
                type="submit"
                disabled={isInviting || inviteSent || !email.trim()}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg",
                  "transition-all duration-150",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  "dark:focus:ring-offset-zinc-900",
                  inviteSent
                    ? "bg-emerald-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white",
                )}
              >
                {isInviting ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : inviteSent ? (
                  <>
                    <Check className="h-4 w-4" />
                    Sent
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Invite
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="px-5 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members..."
              className={cn(
                "w-full pl-9 pr-3 py-2 text-sm rounded-lg",
                "bg-zinc-50 dark:bg-zinc-800",
                "border border-zinc-200 dark:border-zinc-700",
                "text-zinc-900 dark:text-zinc-100",
                "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              )}
            />
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto">
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className={cn(
                  "flex items-center gap-3 px-5 py-3",
                  "hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
                  "transition-colors duration-150",
                )}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center",
                      "bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800",
                      "text-xs font-semibold text-zinc-700 dark:text-zinc-300",
                    )}
                  >
                    {member.avatar}
                  </div>
                  <div
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900",
                      member.online ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600",
                    )}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {member.email}
                  </p>
                </div>

                <span
                  className={cn(
                    "flex-shrink-0 px-2 py-1 text-[10px] font-medium uppercase tracking-wide rounded-full",
                    member.role === "Owner"
                      ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300"
                      : member.role === "Editor"
                        ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
                  )}
                >
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-3 bg-zinc-50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
            {members.length} team member{members.length !== 1 && "s"} •{" "}
            {members.filter((m) => m.online).length} online
          </p>
        </div>
      </div>
    </div>
  );
}
