"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { CreditCard, Wifi } from "lucide-react";

interface Card23Props {
  cardHolder?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  brand?: string;
}

export default function Card_23({
  cardHolder = "ALEXANDER VANE",
  cardNumber = "•••• •••• •••• 8824",
  expiry = "12/29",
  cvv = "•••",
  brand = "SYNAPSE PLATINUM",
}: Card23Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 150, damping: 20 });

  // Shine position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse positions from center (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Rotate values (max 20 degrees)
    x.set(relativeX * 30);
    y.set(-relativeY * 30);

    // Light flare position
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Background gradient tracking mouse position for holographic shine
  const shineBackground = useMotionTemplate`
    radial-gradient(
      280px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 100%
    )
  `;

  const holographicGradient = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(200, 200, 200, 0.05) 50%,
      transparent 100%
    )
  `;

  return (
    <div className="flex items-center justify-center p-4 perspective-1000">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative w-[340px] h-[210px] rounded-2xl cursor-pointer select-none overflow-hidden",
          "border border-white/20 dark:border-white/10",
          "bg-gradient-to-br from-white/10 to-white/5 dark:from-zinc-950/40 dark:to-zinc-900/20",
          "backdrop-blur-xl shadow-2xl transition-all duration-100 ease-out",
        )}
      >
        {/* Holographic light layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: shineBackground }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: holographicGradient }}
        />

        {/* Ambient base design lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-400 via-zinc-200 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800" />

        {/* Card Content Grid */}
        <div
          className="absolute inset-0 p-6 flex flex-col justify-between z-20"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-widest text-white/50 dark:text-zinc-500 uppercase">
                {brand}
              </span>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-8 h-6 bg-zinc-500/20 rounded-md border border-zinc-500/40 flex items-center justify-center">
                  <div className="w-5 h-4 border border-zinc-500/50 rounded-xs grid grid-cols-3 gap-0.5 p-0.5 opacity-80">
                    <div className="border-r border-b border-zinc-500/40" />
                    <div className="border-r border-b border-zinc-500/40" />
                    <div className="border-b border-zinc-500/40" />
                    <div className="border-r border-zinc-500/40" />
                    <div className="border-r border-zinc-500/40" />
                    <div className="border-zinc-500/40" />
                  </div>
                </div>
                <Wifi className="w-4 h-4 text-white/60 dark:text-zinc-400 rotate-90" />
              </div>
            </div>

            <div className="flex flex-col items-end">
              <CreditCard className="w-7 h-7 text-white/80 dark:text-zinc-300" />
            </div>
          </div>

          {/* Card Number */}
          <div className="my-2">
            <span className="text-lg font-medium tracking-[0.2em] text-white dark:text-zinc-100 font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {cardNumber}
            </span>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[8px] tracking-wider text-white/40 dark:text-zinc-500 uppercase">
                Card Holder
              </span>
              <span className="text-xs font-semibold tracking-wide text-white/90 dark:text-zinc-200 uppercase mt-0.5 font-sans">
                {cardHolder}
              </span>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[8px] tracking-wider text-white/40 dark:text-zinc-500 uppercase">
                  Expires
                </span>
                <span className="text-xs font-semibold text-white/90 dark:text-zinc-200 mt-0.5 font-mono">
                  {expiry}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[8px] tracking-wider text-white/40 dark:text-zinc-500 uppercase">
                  CVV
                </span>
                <span className="text-xs font-semibold text-white/90 dark:text-zinc-200 mt-0.5 font-mono">
                  {cvv}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
