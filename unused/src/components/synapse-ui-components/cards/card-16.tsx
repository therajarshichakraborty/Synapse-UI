import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface Feature {
  name: string;
  included: boolean;
}

interface Card14Props {
  title?: string;
  price?: string;
  billing?: string;
  features?: Feature[];
  cta?: string;
  highlighted?: boolean;
}

export default function Card_16({
  title = "Professional",
  price = "$29",
  billing = "/month",
  features = [
    { name: "Unlimited projects", included: true },
    { name: "Advanced analytics", included: true },
    { name: "API access", included: false },
  ],
  cta = "Get Started",
  highlighted = false,
}: Card14Props) {
  return (
    <div
      className={cn(
        "w-full max-w-sm",
        "bg-white dark:bg-zinc-900",
        "border",
        highlighted
          ? "border-zinc-300 dark:border-zinc-600 ring-2 ring-zinc-900 dark:ring-zinc-100"
          : "border-zinc-200/50 dark:border-zinc-800/50",
        "rounded-xl shadow-sm",
        highlighted && "shadow-md",
        "p-6",
        "transition-all duration-300",
        "hover:shadow-md dark:hover:shadow-zinc-900/50",
      )}
    >
      {highlighted && (
        <div className="mb-3 inline-block text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
          Popular
        </div>
      )}
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
      <div className="mb-5">
        <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{price}</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">{billing}</span>
      </div>
      <button
        className={cn(
          "w-full py-2.5 rounded-lg font-medium text-sm mb-6 transition-colors",
          highlighted
            ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
            : "border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
        )}
      >
        {cta}
      </button>
      <div className="space-y-3">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            {feature.included ? (
              <Check className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            ) : (
              <X className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />
            )}
            <span
              className={cn(
                "text-sm",
                feature.included
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-400 dark:text-zinc-600",
              )}
            >
              {feature.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
