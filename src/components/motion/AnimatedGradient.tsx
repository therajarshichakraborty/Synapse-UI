import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  /** Intensity 0–1 */
  intensity?: number;
}

/**
 * Shared animated mesh gradient background.
 * Uses pure CSS @keyframes for GPU-composited animation (no JS animation loop).
 * Matches the landing page #09001a background exactly.
 */
export function AnimatedGradient({ className, intensity = 1 }: AnimatedGradientProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Base deep purple background — matches landing page */}
      <div className="absolute inset-0 bg-[#09001a]" />

      {/* Orb 1 — violet, top-left */}
      <div
        className="docs-gradient-orb absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)",
          opacity: intensity,
          animation: "synapse-orb-1 20s ease-in-out infinite",
        }}
      />

      {/* Orb 2 — fuchsia, top-right */}
      <div
        className="docs-gradient-orb absolute -top-20 -right-40 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(192,38,211,0.14) 0%, transparent 70%)",
          opacity: intensity,
          animation: "synapse-orb-2 25s ease-in-out infinite",
        }}
      />

      {/* Orb 3 — blue, bottom-right */}
      <div
        className="docs-gradient-orb absolute -bottom-60 right-20 h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(67,56,202,0.12) 0%, transparent 70%)",
          opacity: intensity,
          animation: "synapse-orb-3 30s ease-in-out infinite",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(9,0,26,0.6)_100%)]" />

      <style>{`
        @keyframes synapse-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(80px, 60px) scale(1.1); }
          66%       { transform: translate(-40px, 100px) scale(0.95); }
        }
        @keyframes synapse-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-60px, 80px) scale(1.08); }
          66%       { transform: translate(40px, -50px) scale(0.92); }
        }
        @keyframes synapse-orb-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-80px, -60px) scale(1.12); }
          70%       { transform: translate(60px, 30px) scale(0.88); }
        }
      `}</style>
    </div>
  );
}
