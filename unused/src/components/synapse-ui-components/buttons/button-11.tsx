import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface Button11Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button11({
  className,
  children = "Chevron Button",
  ...props
}: Button11Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-6",
        "bg-slate-900 dark:bg-slate-50",
        "text-slate-50 dark:text-slate-900",
        "hover:bg-slate-800 dark:hover:bg-slate-100",
        "rounded-lg",
        "transition-all duration-300",
        "group",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span>{children}</span>
        <ChevronRight
          className={cn(
            "w-4 h-4",
            "transition-transform duration-300",
            "group-hover:translate-x-1",
          )}
        />
      </div>
    </Button>
  );
}
