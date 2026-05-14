import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button07Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button07({
  className,
  children = "Filled Button",
  ...props
}: Button07Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-8",
        "bg-gradient-to-br from-emerald-400 to-teal-600",
        "text-white",
        "hover:shadow-xl hover:shadow-teal-600/40",
        "rounded-lg",
        "transition-all duration-300",
        "font-semibold",
        "tracking-wide",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
