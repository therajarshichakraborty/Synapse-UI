"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Nextjs from "@/components/Icons/nextjs";
import ReactIcon from "@/components/Icons/react";
import ShadcnIcon from "@/components/Icons/shadcn";
import Motion from "../Icons/motion";
import Link from "next/link";

const icons = [
  {
    key: "TailwindCSS",
    delay: "100ms",
    colorClass: "text-blue-600 dark:text-blue-400",
    label: "TailwindCSS",
    content: (
      <svg
        viewBox="0 0 54 33"
        className="w-8 h-8"
        aria-labelledby="tailwindcss-icon-title"
        role="img"
      >
        <title id="tailwindcss-icon-title">TailwindCSS</title>
        <g clipPath="url(#prefix__clip0)">
          <path
            fill="#38bdf8"
            fillRule="evenodd"
            d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
            clipRule="evenodd"
          />
        </g>
      </svg>
    ),
  },
  {
    key: "Motion",
    delay: "250ms",
    colorClass: "text-yellow-500 dark:text-[#F5EA1E]",
    label: "Motion",
    href: "https://www.youtube.com/watch?v=Njyx5ZuwEHI&list=RDNjyx5ZuwEHI&start_radio=1",
    content: <Motion width={32} height={32} />,
  },
  {
    key: "ShadcnUI",
    delay: "350ms",
    colorClass: "text-black dark:text-white",
    label: "Shadcn/UI",
    content: <ShadcnIcon className="w-8 h-8 text-black dark:text-white" aria-label="Shadcn/ui" />,
  },
  {
    key: "Nextjs",
    delay: "450ms",
    colorClass: "text-black dark:text-white",
    label: "Next.js",
    content: <Nextjs className="w-8 h-8" aria-label="Next.js" />,
    gridClass: "col-span-1 col-start-1 md:col-auto",
  },
  {
    key: "React",
    delay: "550ms",
    colorClass: "text-black dark:text-white",
    label: "React.js",
    content: <ReactIcon className="w-8 h-8" aria-label="React" />,
    gridClass: "col-span-1 col-start-3 md:col-auto",
  },
];

export default function Features() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="w-full max-w-none flex flex-col justify-start items-center z-10 mx-auto">
      <div className="grid grid-cols-3 md:flex md:flex-wrap items-center justify-start gap-6 md:gap-8 w-[95%] mx-auto py-4">
        {icons.map(({ key, delay, colorClass, label, content, href, gridClass }) => (
          <div
            key={key}
            className={cn(
              colorClass,
              "relative flex flex-col items-center gap-2",
              "transition-all duration-500 ease-out",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              gridClass,
            )}
            style={{ transitionDelay: delay }}
          >
            {href ? (
              <Link href={href} target="_blank">
                {content}
              </Link>
            ) : (
              content
            )}
            <span
              className={cn(
                "text-xs text-center mt-1 whitespace-nowrap text-black dark:text-white",
                "transition-transform duration-200 ease-out hover:scale-110",
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
