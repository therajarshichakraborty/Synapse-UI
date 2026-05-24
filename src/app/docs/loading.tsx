export default function DocsLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center gap-5">
        {/* Animated logo mark */}
        <div className="relative w-12 h-12">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-violet-500/20" />
          {/* Spinning gradient arc */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
            style={{
              borderTopColor: "oklch(0.62 0.26 290)",
              borderRightColor: "oklch(0.62 0.27 320)",
              animationDuration: "1s",
            }}
          />
          {/* Glow pulse */}
          <div
            className="absolute inset-1 rounded-full animate-pulse"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
          />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
          </div>
        </div>

        {/* Skeleton lines */}
        <div className="w-48 space-y-2.5">
          <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent animate-[shimmer_1.5s_ease-in-out_infinite]" />
          </div>
          <div className="h-1.5 w-3/4 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent animate-[shimmer_1.5s_ease-in-out_infinite_0.2s]" />
          </div>
          <div className="h-1.5 w-5/6 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent animate-[shimmer_1.5s_ease-in-out_infinite_0.4s]" />
          </div>
        </div>

        <p className="text-xs text-zinc-600 font-medium tracking-wide animate-pulse">
          Loading…
        </p>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
