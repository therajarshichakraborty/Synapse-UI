"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Spotlight radius in px */
  spotlightRadius?: number;
  /** Color of the spotlight radial gradient */
  spotlightColor?: string;
  /** Whether to add glow box-shadow on hover */
  withGlow?: boolean;
  glowColor?: string;
}

/**
 * Mouse-tracking spotlight card — creates the illusion of a light source
 * moving inside the card following the cursor.
 * Used for component preview cards, sidebar items, and feature cards.
 */
export function SpotlightCard({
  children,
  className,
  spotlightRadius = 280,
  spotlightColor = "rgba(139, 92, 246, 0.08)",
  withGlow = true,
  glowColor = "rgba(139, 92, 246, 0.15)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const background = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(${spotlightRadius}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={
        withGlow
          ? {
              boxShadow: isHovered
                ? `0 0 50px ${glowColor}, 0 0 100px ${glowColor.replace("0.15", "0.05")}, inset 0 0 1px rgba(255,255,255,0.08)`
                : "0 0 0px rgba(0,0,0,0), inset 0 0 1px rgba(255,255,255,0.04)",
            }
          : {}
      }
      transition={{ boxShadow: { duration: 0.3 } }}
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{ background, opacity: isHovered ? 1 : 0 }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
