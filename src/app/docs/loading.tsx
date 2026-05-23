export default function DocsLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-zinc-200 dark:border-zinc-800" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-fuchsia-500 dark:border-t-fuchsia-400 animate-spin" />
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium animate-pulse">
          Loading documentation…
        </p>
      </div>
    </div>
  );
}
