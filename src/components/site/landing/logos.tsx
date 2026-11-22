import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const NextLogo = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 0a12 12 0 1 0 6.35 22.18L8.97 9.5v8.5H7.2V6.8h1.77l10.5 14.27A12 12 0 0 0 12 0Zm4.23 6.8h1.77v8.4l-1.77-2.4z" />
  </svg>
);
export const ReactLogo = (p: P) => (
  <svg viewBox="-11.5 -10.23 23 20.46" fill="none" stroke="currentColor" aria-hidden="true" {...p}>
    <circle r="2.05" fill="currentColor" stroke="none" />
    <ellipse rx="11" ry="4.2" />
    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
  </svg>
);
export const TailwindLogo = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.47 6 12 6Zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.47 12 7 12Z" />
  </svg>
);
export const TypeScriptLogo = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M1.5 1.5h21v21h-21zM13.6 12.2v-1.6H6.9v1.6h2.4v7.1h1.9v-7.1zm.7 6.6c.3.2.7.3 1.1.4.4.1.9.1 1.3.1.5 0 .9 0 1.3-.1.4-.1.7-.3 1-.5.3-.2.5-.5.7-.8.2-.3.2-.7.2-1.2 0-.3 0-.6-.1-.9l-.4-.7c-.2-.2-.4-.4-.7-.5l-.9-.5-.7-.3-.5-.3-.3-.3c-.1-.1-.1-.2-.1-.4 0-.1 0-.2.1-.3l.3-.2.4-.2h.5l.4.1.4.1.4.2.3.2v-1.8c-.3-.1-.6-.2-.9-.2-.3-.1-.7-.1-1.2-.1-.4 0-.9 0-1.2.1-.4.1-.7.3-1 .5-.3.2-.5.5-.7.8-.2.3-.3.7-.3 1.2 0 .6.2 1.1.5 1.5.3.4.9.7 1.6 1l.8.4.5.3.3.3.1.4c0 .1 0 .2-.1.3l-.2.2-.4.2h-.6c-.4 0-.8-.1-1.1-.2-.4-.1-.7-.4-1-.6z" />
  </svg>
);
export const MotionLogo = (p: P) => (
  <svg viewBox="0 0 1103 386" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M416.5 0 198.5 385.7H0L170.2 84.5C196.5 37.8 262.4 0 317.2 0Zm486.8 96.4C903.3 43.2 947.8 0 1002.6 0s99.3 43.2 99.3 96.4-44.4 96.4-99.3 96.4-99.3-43.2-99.3-96.4ZM453.7 0h198.5L434.3 385.7H235.8Zm234.5 0h198.5L716.6 301.1c-26.4 46.7-92.2 84.5-147 84.5h-99.3Z" />
  </svg>
);
export const RadixLogo = (p: P) => (
  <svg viewBox="0 0 25 25" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 25a8 8 0 1 1 0-16v16ZM12 0H4v8h8V0ZM17 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
  </svg>
);
export const VercelLogo = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="m12 2 11 19H1z" />
  </svg>
);

export const BunLogo = (p: P) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    aria-hidden="true"
    {...p}
  >
    <path d="M12 4.5c5.2 0 9 3.4 9 7.6 0 4.1-3.8 7.4-9 7.4s-9-3.3-9-7.4c0-4.2 3.8-7.6 9-7.6Z" />
    <path
      d="M9 4.9c.4 1 .4 2 0 3M12.5 4.5c.5 1.1.5 2.3 0 3.4M15.8 5.2c.3.9.3 1.8 0 2.7"
      strokeLinecap="round"
    />
    <circle cx="9.3" cy="12.6" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="14.7" cy="12.6" r="0.9" fill="currentColor" stroke="none" />
    <path d="M10.6 14.6c.8.7 2 .7 2.8 0" strokeLinecap="round" />
  </svg>
);

export const techLogos = [
  { name: "Next.js", Logo: NextLogo },
  { name: "React", Logo: ReactLogo },
  { name: "Tailwind CSS", Logo: TailwindLogo },
  { name: "TypeScript", Logo: TypeScriptLogo },
  { name: "Motion", Logo: MotionLogo },
  { name: "Radix UI", Logo: RadixLogo },
  { name: "Vercel", Logo: VercelLogo },
  { name: "Bun", Logo: BunLogo },
];
