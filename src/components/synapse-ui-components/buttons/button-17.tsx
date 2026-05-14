import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button19Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button19({
  className,
  children = "Border Button",
  ...props
}: Button19Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-8",
        "bg-gradient-to-br from-pink-600 to-red-600",
        "text-white",
        "border-2 border-pink-300/30",
        "hover:border-pink-300/60",
        "rounded-lg",
        "transition-all duration-300",
        "shadow-lg shadow-pink-600/30",
        "hover:shadow-xl hover:shadow-pink-600/50",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
