"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  animate?: boolean;
}

/**
 * Premium Glowing Border Card.
 * Renders a card with an animated gradient border and a deep backdrop blur body.
 * On hover, it casts a soft blurred ambient glow behind the card.
 */
export function GlowCard({
  children,
  className,
  glowColor = "from-violet-500 via-fuchsia-500 to-rose-500",
  animate = true,
}: GlowCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative group rounded-xl p-[1px] overflow-hidden transition-all duration-300",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow shadow */}
      <div
        className={cn(
          "absolute -inset-10 -z-10 rounded-3xl opacity-0 blur-3xl transition-opacity duration-500 pointer-events-none bg-gradient-to-r",
          glowColor,
          isHovered && "opacity-15",
        )}
      />

      {/* Border gradient */}
      <div
        className={cn(
          "absolute inset-0 -z-10 rounded-xl bg-gradient-to-r",
          glowColor,
          animate && "animate-glow-spin",
        )}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Main card body */}
      <div className="relative h-full w-full rounded-[11px] bg-zinc-950/90 hover:bg-zinc-950/80 backdrop-blur-xl border border-white/5 p-6 transition-colors duration-300">
        {children}
      </div>

      <style>{`
        @keyframes glow-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-glow-spin {
          animation: glow-spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
