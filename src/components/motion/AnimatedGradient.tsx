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
      {/* Base background — adapts to dark/light mode */}
      <div className="absolute inset-0 bg-[var(--animated-bg)] transition-colors duration-300" />

      {/* Orb 1 — violet, top-left */}
      <div
        className="docs-gradient-orb absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full"
        style={{
          background: "var(--orb-1-bg)",
          opacity: intensity,
          animation: "synapse-orb-1 20s ease-in-out infinite",
        }}
      />

      {/* Orb 2 — fuchsia, top-right */}
      <div
        className="docs-gradient-orb absolute -top-20 -right-40 h-[500px] w-[500px] rounded-full"
        style={{
          background: "var(--orb-2-bg)",
          opacity: intensity,
          animation: "synapse-orb-2 25s ease-in-out infinite",
        }}
      />

      {/* Orb 3 — blue, bottom-right */}
      <div
        className="docs-gradient-orb absolute -bottom-60 right-20 h-[700px] w-[700px] rounded-full"
        style={{
          background: "var(--orb-3-bg)",
          opacity: intensity,
          animation: "synapse-orb-3 30s ease-in-out infinite",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: "var(--vignette-bg)",
        }}
      />

      <style>{`
        :root {
          --animated-bg: #faf9fe;
          --orb-1-bg: radial-gradient(circle, rgba(109,40,217,0.05) 0%, transparent 70%);
          --orb-2-bg: radial-gradient(circle, rgba(192,38,211,0.04) 0%, transparent 70%);
          --orb-3-bg: radial-gradient(circle, rgba(67,56,202,0.03) 0%, transparent 70%);
          --grid-line-color: rgba(139, 92, 246, 0.025);
          --vignette-bg: radial-gradient(ellipse_at_center, transparent 40%, rgba(250, 249, 254, 0.5) 100%);
        }
        .dark {
          --animated-bg: #09001a;
          --orb-1-bg: radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%);
          --orb-2-bg: radial-gradient(circle, rgba(192,38,211,0.14) 0%, transparent 70%);
          --orb-3-bg: radial-gradient(circle, rgba(67,56,202,0.12) 0%, transparent 70%);
          --grid-line-color: rgba(255, 255, 255, 0.015);
          --vignette-bg: radial-gradient(ellipse_at_center, transparent 40%, rgba(9, 0, 26, 0.6) 100%);
        }
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
