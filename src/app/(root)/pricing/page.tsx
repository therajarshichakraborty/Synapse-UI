import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Synapse UI is free and open source.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        Free &amp; Open Source
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Synapse UI is completely free. Copy any component into your project and customize it to
        fit your brand.
      </p>
      <div className="mt-10 w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Community
        </p>
        <p className="mt-2 text-5xl font-bold">$0</p>
        <p className="mt-2 text-muted-foreground">Forever free, MIT licensed</p>
        <ul className="mt-6 space-y-2 text-left text-sm text-muted-foreground">
          <li>150+ copy-paste components</li>
          <li>Tailwind CSS v4 + shadcn/ui</li>
          <li>Dark mode support</li>
          <li>No account required</li>
        </ul>
        <Button asChild className="mt-8 w-full">
          <Link href="/docs">Browse Components</Link>
        </Button>
      </div>
    </div>
  );
}
