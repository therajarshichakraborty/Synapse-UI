"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type SparklesProps = {
  className?: string;
  /** Particles per 10,000 px². */
  density?: number;
  /** Particle color. Defaults to the current text color. */
  color?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
};

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  twinkle: number;
};

/** Twinkling particles on a canvas. Draws a single still frame when reduced motion is on. */
export function Sparkles({
  className,
  density = 6,
  color,
  minSize = 0.4,
  maxSize = 1.4,
  speed = 0.25,
}: SparklesProps) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let particles: Particle[] = [];
    let frame = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((width * height * density) / 10000);
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: minSize + Math.random() * (maxSize - minSize),
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.02 + Math.random() * 0.04,
      }));
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color ?? getComputedStyle(canvas).color;
      for (const p of particles) {
        if (!reduce) {
          p.x = (p.x + p.vx + width) % width;
          p.y = (p.y + p.vy + height) % height;
          p.phase += p.twinkle;
        }
        ctx.globalAlpha = 0.25 + ((Math.sin(p.phase) + 1) / 2) * 0.75;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      frame++;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      void frame;
    };
  }, [color, density, maxSize, minSize, reduce, speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full text-foreground/80", className)}
    />
  );
}
