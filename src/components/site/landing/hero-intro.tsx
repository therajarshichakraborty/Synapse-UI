import * as React from "react";

/**
 * Staggered on-load reveal for the hero copy. CSS-driven, so it starts on first paint
 * (no hydration wait, good for LCP) and is disabled by the global reduced-motion rule.
 */
export function HeroIntro({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      {React.Children.map(children, (child, i) => (
        <div
          className="w-full animate-in fade-in-0 slide-in-from-bottom-3 fill-mode-both duration-700 ease-out"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
