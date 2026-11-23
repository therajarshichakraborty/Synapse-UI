import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface Button04Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button04({
  className,
  children = "Sparkle Button",
  ...props
}: Button04Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-6",
        "bg-amber-500 dark:bg-amber-600",
        "text-white",
        "hover:bg-amber-600 dark:hover:bg-amber-700",
        "rounded-lg",
        "transition-all duration-300",
        "group",
        "shadow-lg shadow-amber-500/30",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Sparkles
          className={cn("w-4 h-4", "group-hover:rotate-12 transition-transform duration-300")}
        />
        <span>{children}</span>
      </div>
    </Button>
  );
}
