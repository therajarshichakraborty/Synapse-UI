import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button12Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button12({ className, children = "Neon Button", ...props }: Button12Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-8",
        "bg-black dark:bg-white",
        "text-lime-400 dark:text-lime-600",
        "border-2 border-lime-400 dark:border-lime-600",
        "rounded-lg",
        "transition-all duration-300",
        "shadow-[0_0_10px_rgba(196,181,253,0.5)]",
        "hover:shadow-[0_0_20px_rgba(196,181,253,0.8)]",
        "font-bold",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
