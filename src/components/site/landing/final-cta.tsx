import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { GitHubIcon } from "@/components/site/icons";
import { siteConfig } from "@/config/site";

export function FinalCta() {
  return (
    <section className="px-4 pt-10 pb-20 sm:px-6 sm:pb-24 md:pb-32">
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#09090b] px-6 py-20 text-center text-white ring-1 ring-white/10 sm:py-24 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/40 to-transparent"
        />

        <p className="font-mono text-[12px] tracking-[0.08em] text-white/50 uppercase">
          Get started in a minute
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2.25rem,1.5rem+3vw,4rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance">
          Start building something <span className="text-white/45">people remember.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-white/60 sm:text-[1.0625rem]">
          Copy the components, own the code, ship today. No signup, no license key.
        </p>

        <div className="mx-auto mt-10 flex max-w-xs flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
          <Link
            href="/docs/installation"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-[15px] font-medium text-[#09090b] shadow-[0_8px_30px_-8px_rgba(255,255,255,0.35)] transition-[transform,opacity] hover:opacity-95 active:scale-[0.98]"
          >
            Get started
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-[15px] font-medium text-white ring-1 ring-white/15 transition-colors ring-inset hover:bg-white/[0.06]"
          >
            <GitHubIcon className="size-4" /> Star on GitHub
          </a>
        </div>

        <p className="mt-10 font-mono text-[13px] text-white/45">
          <span className="text-white/30">$</span> npx synapse-ui-cli@latest init
        </p>
      </div>
    </section>
  );
}
