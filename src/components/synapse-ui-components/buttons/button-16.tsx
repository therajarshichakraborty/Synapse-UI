import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button16Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button16({
  className,
  children = "Expand Button",
  ...props
}: Button16Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-8",
        "bg-violet-600 dark:bg-violet-700",
        "text-white",
        "hover:px-10",
        "rounded-lg",
        "transition-all duration-300",
        "shadow-lg shadow-violet-600/30",
        "group",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 transition-all duration-300">{children}</span>
    </Button>
  );
}
