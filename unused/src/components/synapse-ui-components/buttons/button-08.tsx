import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button08Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button08({
  className,
  children = "Outline Button",
  ...props
}: Button08Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-6",
        "bg-transparent",
        "text-indigo-600 dark:text-indigo-400",
        "border-2 border-indigo-600 dark:border-indigo-400",
        "hover:bg-indigo-600 dark:hover:bg-indigo-400",
        "hover:text-white",
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
