"use client";

export function ErrorGeneration({ error }: { error: string }) {
  return (
    <div className="mx-4 mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
      {error}
    </div>
  );
}
