import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button18Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button18({
  className,
  children = "Metal Button",
  ...props
}: Button18Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-8",
        "bg-gradient-to-b from-gray-400 to-gray-600",
        "text-white",
        "hover:shadow-2xl",
        "rounded-lg",
        "transition-all duration-300",
        "font-bold",
        "shadow-lg shadow-gray-600/40",
        "active:shadow-md",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
}
