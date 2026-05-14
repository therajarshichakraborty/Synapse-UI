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
        "bg-fuchsia-100 dark:bg-fuchsia-950",
        "text-fuchsia-600 dark:text-fuchsia-300",
        "hover:bg-fuchsia-200 dark:hover:bg-fuchsia-900",
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
