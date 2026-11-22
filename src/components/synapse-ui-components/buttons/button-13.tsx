import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button13Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button13({ className, children = "Soft Button", ...props }: Button13Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-8",
        "bg-cyan-100 dark:bg-cyan-950",
        "text-cyan-600 dark:text-cyan-300",
        "hover:bg-cyan-200 dark:hover:bg-cyan-900",
        "rounded-lg",
        "transition-all duration-300",
        "font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
