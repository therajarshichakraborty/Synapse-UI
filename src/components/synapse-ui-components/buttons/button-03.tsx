import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button03Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button03({
  className,
  children = "Ghost Button",
  ...props
}: Button03Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-6",
        "bg-transparent",
        "text-zinc-900 dark:text-zinc-50",
        "border-2 border-zinc-900 dark:border-zinc-50",
        "hover:bg-zinc-900 dark:hover:bg-zinc-50",
        "hover:text-zinc-50 dark:hover:text-zinc-900",
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
