import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface Button14Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button14({
  className,
  children = "Electric Button",
  ...props
}: Button14Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-6",
        "bg-gradient-to-r from-yellow-400 to-orange-500",
        "text-white",
        "hover:shadow-xl hover:shadow-yellow-500/40",
        "rounded-lg",
        "transition-all duration-300",
        "group",
        "font-bold",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Zap className={cn("w-4 h-4", "group-hover:animate-pulse")} />
        <span>{children}</span>
      </div>
    </Button>
  );
}
