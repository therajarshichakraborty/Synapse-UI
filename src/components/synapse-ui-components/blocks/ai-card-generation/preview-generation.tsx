"use client";

import Image from "next/image";

export function Preview({ isLoading, imageUrl }: { isLoading: boolean; imageUrl: string }) {
  if (isLoading) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-200" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
      <Image
        src={imageUrl}
        alt="Generated preview"
        fill
        className="object-cover"
        sizes="(max-width: 24rem) 100vw, 24rem"
      />
    </div>
  );
}
