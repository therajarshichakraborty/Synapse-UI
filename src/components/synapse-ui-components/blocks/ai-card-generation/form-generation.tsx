"use client";

interface CardSettings {
  style: string;
  backgroundColor: string;
  lighting: string;
  pose: string;
  aspectRatio: string;
}

const fieldClass =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-500";

export function FormGeneration({
  onSubmit,
  settings,
  onSettingsChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  settings: CardSettings;
  onSettingsChange: (next: CardSettings) => void;
}) {
  const update = <K extends keyof CardSettings>(key: K, value: CardSettings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-3">
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Style
          <select
            className={fieldClass}
            value={settings.style}
            onChange={(e) => update("style", e.target.value)}
          >
            <option value="artistic">Artistic</option>
            <option value="realistic">Realistic</option>
            <option value="minimal">Minimal</option>
          </select>
        </label>
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Background
          <select
            className={fieldClass}
            value={settings.backgroundColor}
            onChange={(e) => update("backgroundColor", e.target.value)}
          >
            <option value="studio">Studio</option>
            <option value="outdoor">Outdoor</option>
            <option value="abstract">Abstract</option>
          </select>
        </label>
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Lighting
          <select
            className={fieldClass}
            value={settings.lighting}
            onChange={(e) => update("lighting", e.target.value)}
          >
            <option value="studio">Studio</option>
            <option value="soft">Soft</option>
            <option value="dramatic">Dramatic</option>
          </select>
        </label>
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Pose
          <select
            className={fieldClass}
            value={settings.pose}
            onChange={(e) => update("pose", e.target.value)}
          >
            <option value="profile">Profile</option>
            <option value="front">Front</option>
            <option value="three-quarter">Three-quarter</option>
          </select>
        </label>
        <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Aspect ratio
          <select
            className={fieldClass}
            value={settings.aspectRatio}
            onChange={(e) => update("aspectRatio", e.target.value)}
          >
            <option value="4:5">4:5</option>
            <option value="1:1">1:1</option>
            <option value="16:9">16:9</option>
          </select>
        </label>
      </div>
      <button
        type="submit"
        className="mt-auto h-10 rounded-xl bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
      >
        Generate
      </button>
    </form>
  );
}
