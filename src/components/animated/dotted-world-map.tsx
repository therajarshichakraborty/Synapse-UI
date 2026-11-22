"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type MapPoint = { lat: number; lng: number; label?: string };
export type MapConnection = { from: MapPoint; to: MapPoint };

// Coarse land mask: rows of [startLng, endLng] ranges every 6 degrees of latitude (+78 to -54).
const LAND: [number, number][][] = [
  [
    [-73, -12],
    [20, 60],
    [95, 140],
  ],
  [
    [-165, -60],
    [-50, -20],
    [10, 180],
  ],
  [
    [-168, -55],
    [-45, -25],
    [5, 180],
  ],
  [
    [-160, -60],
    [-10, 40],
    [45, 160],
  ],
  [
    [-140, -55],
    [-10, 45],
    [50, 145],
  ],
  [
    [-128, -65],
    [-10, 40],
    [42, 135],
  ],
  [
    [-125, -70],
    [-10, 35],
    [40, 128],
  ],
  [
    [-118, -76],
    [-17, 37],
    [44, 122],
    [128, 142],
  ],
  [
    [-112, -80],
    [-17, 50],
    [55, 92],
    [97, 122],
  ],
  [
    [-106, -84],
    [-17, 43],
    [70, 80],
    [97, 110],
    [118, 126],
  ],
  [
    [-92, -78],
    [-17, 42],
    [77, 80],
    [98, 106],
    [120, 126],
  ],
  [
    [-80, -50],
    [-10, 44],
    [95, 120],
    [125, 140],
  ],
  [
    [-80, -35],
    [8, 42],
    [100, 120],
    [130, 150],
  ],
  [
    [-80, -35],
    [12, 40],
    [115, 152],
  ],
  [
    [-74, -40],
    [13, 36],
    [113, 154],
  ],
  [
    [-72, -48],
    [16, 32],
    [114, 152],
    [165, 178],
  ],
  [
    [-72, -56],
    [18, 28],
    [140, 148],
    [170, 176],
  ],
  [[-74, -62]],
  [[-74, -66]],
  [[-70, -66]],
  [[-60, 60]],
  [[-180, 180]],
];

function project(lat: number, lng: number, w: number, h: number) {
  return { x: ((lng + 180) / 360) * w, y: ((78 - lat) / 156) * h };
}

export type DottedWorldMapProps = {
  connections?: MapConnection[];
  className?: string;
  dotColor?: string;
};

/** A dotted world map with animated arcs between points. */
export function DottedWorldMap({
  connections = [],
  className,
  dotColor = "var(--dot-color)",
}: DottedWorldMapProps) {
  const reduce = useReducedMotion();
  const W = 800;
  const H = 400;
  const step = 8;

  const dots = React.useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let y = 0; y < H; y += step) {
      const lat = 78 - (y / H) * 156;
      const row = LAND[Math.min(LAND.length - 1, Math.floor((78 - lat) / 7.1))] ?? [];
      for (let x = 0; x < W; x += step) {
        const lng = (x / W) * 360 - 180;
        if (lat < -50 && lat > -62) continue;
        if (row.some(([a, b]) => lng >= a && lng <= b))
          out.push({ x: x + step / 2, y: y + step / 2 });
      }
    }
    return out;
  }, []);

  const arc = (c: MapConnection) => {
    const a = project(c.from.lat, c.from.lng, W, H);
    const b = project(c.to.lat, c.to.lng, W, H);
    const mx = (a.x + b.x) / 2;
    const my = Math.min(a.y, b.y) - Math.abs(a.x - b.x) * 0.25 - 20;
    return { d: `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`, a, b };
  };

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="size-full"
        role="img"
        aria-label="World map with connections"
      >
        <defs>
          <linearGradient id="map-arc" x1="0" x2="1">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0" />
            <stop offset="20%" stopColor="#93c5fd" />
            <stop offset="80%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <mask id="map-fade">
            <rect width={W} height={H} fill="url(#map-radial)" />
          </mask>
          <radialGradient id="map-radial">
            <stop offset="60%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>
        </defs>
        <g mask="url(#map-fade)">
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={1.3} fill={dotColor} />
          ))}
        </g>
        {connections.map((c, i) => {
          const { d, a, b } = arc(c);
          return (
            <g key={i}>
              <motion.path
                d={d}
                fill="none"
                stroke="url(#map-arc)"
                strokeWidth={1.4}
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.3 * i, ease: "easeOut" }}
              />
              {[a, b].map((p, j) => (
                <g key={j}>
                  <circle cx={p.x} cy={p.y} r={2.5} fill="#3b82f6" />
                  {!reduce && (
                    <circle cx={p.x} cy={p.y} r={2.5} fill="#3b82f6" opacity={0.5}>
                      <animate
                        attributeName="r"
                        from="2.5"
                        to="9"
                        dur="2s"
                        begin="0s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.5"
                        to="0"
                        dur="2s"
                        begin="0s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
