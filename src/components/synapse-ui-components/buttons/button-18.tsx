import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button17Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button17({
  className,
  children = "Minimal Button",
  ...props
}: Button17Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-6",
        "bg-transparent",
        "text-gray-700 dark:text-gray-300",
        "border-b-2 border-gray-700 dark:border-gray-300",
        "hover:border-gray-900 dark:hover:border-gray-100",
        "hover:text-gray-900 dark:hover:text-gray-100",
        "rounded-none",
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
