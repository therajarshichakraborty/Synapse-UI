import { cn } from "@/lib/utils";

export type SpotlightProps = {
  className?: string;
  /** Fill color of the beam. Defaults to the brand blue. */
  fill?: string;
};

/**
 * A soft light beam that sweeps in from the top-left on mount.
 * Place inside a `relative overflow-hidden` container.
 */
export function Spotlight({ className, fill = "var(--color-glow-blue)" }: SpotlightProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 left-0 z-0 h-[169%] w-[138%] opacity-0 animate-spotlight motion-reduce:animate-none motion-reduce:opacity-100 lg:w-[84%]",
        className,
      )}
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#synapse-spotlight-blur)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.18"
        />
      </g>
      <defs>
        <filter
          id="synapse-spotlight-blur"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}
