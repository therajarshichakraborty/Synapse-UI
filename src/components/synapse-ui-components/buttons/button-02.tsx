import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button02Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button02({
  className,
  children = "Premium Button",
  ...props
}: Button02Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-8",
        "bg-gradient-to-r from-blue-600 to-indigo-600",
        "text-white",
        "hover:shadow-lg hover:shadow-indigo-500/50",
        "rounded-lg",
        "transition-all duration-300",
        "border border-indigo-400/20",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
}
