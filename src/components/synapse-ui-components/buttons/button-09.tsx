import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button09Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button09({
  className,
  children = "Scale Button",
  ...props
}: Button09Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-8",
        "bg-indigo-500 dark:bg-indigo-600",
        "text-white",
        "hover:bg-indigo-600 dark:hover:bg-indigo-700",
        "hover:scale-105",
        "rounded-lg",
        "transition-all duration-300",
        "shadow-lg shadow-indigo-500/30",
        "active:scale-95",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
