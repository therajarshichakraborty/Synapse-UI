"use client";

import { motion } from "motion/react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, UserPlus, Check, Award, Flame, TrendingUp } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
}

interface Card24Props {
  name?: string;
  handle?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  stats?: StatItem[];
  activityData?: number[];
}

export default function Card_24({
  name = "Seraphina Vance",
  handle = "@seraphina.design",
  bio = "Lead Interaction Designer & Creative Technologist. Building the future of spatial computing interfaces.",
  avatarUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
  bannerUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=200",
  stats = [
    { label: "Followers", value: "14.2k" },
    { label: "Projects", value: "84" },
    { label: "Impact", value: "98%" },
  ],
  activityData = [20, 35, 25, 45, 30, 65, 50, 85, 75, 95],
}: Card24Props) {
  const [isFollowing, setIsFollowing] = useState(false);

  // Generate SVG path for the mini activity chart
  const padding = 10;
  const width = 280;
  const height = 60;
  const points = activityData.map((val, idx) => {
    const x = padding + (idx * (width - padding * 2)) / (activityData.length - 1);
    const y = height - padding - (val * (height - padding * 2)) / 100;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const areaD = `${pathD} L ${width - padding},${height} L ${padding},${height} Z`;

  return (
    <div
      className={cn(
        "w-full max-w-sm overflow-hidden",
        "rounded-3xl",
        "border border-zinc-200/60 dark:border-zinc-800/80",
        "bg-white dark:bg-zinc-950",
        "shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
        "transition-all duration-300",
      )}
    >
      {/* Banner */}
      <div className="relative h-28 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        <img
          src={bannerUrl}
          alt="profile banner"
          className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent dark:from-zinc-950/20" />

        {/* Status Badge */}
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          Open to work
        </span>
      </div>

      {/* Profile Header & Avatar */}
      <div className="px-6 pb-6 relative">
        <div className="flex justify-between items-end -mt-10 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white dark:border-zinc-950 bg-zinc-100 shadow-md">
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-indigo-600 rounded-lg text-white shadow-xs">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={cn(
                "h-9 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-[0.97]",
                isFollowing
                  ? "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-xs hover:shadow-indigo-500/20",
              )}
            >
              {isFollowing ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Follow</span>
                </>
              )}
            </button>

            <button
              className={cn(
                "h-9 w-9 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors",
              )}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {name}
          </h3>
          <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{handle}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-2">{bio}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-zinc-100 dark:border-zinc-900">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {stat.value}
              </span>
              <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mini Chart */}
        <div className="space-y-2 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Weekly Engagement
              </span>
            </div>
            <div className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4%</span>
            </div>
          </div>

          <div className="h-[60px] w-full relative bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl overflow-hidden">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Shaded Area */}
              <path d={areaD} fill="url(#chartGlow)" />
              {/* Path Line */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
