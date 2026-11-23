import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button10Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button10({
  className,
  children = "Ripple Button",
  ...props
}: Button10Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-8",
        "bg-blue-600 dark:bg-blue-700",
        "text-white",
        "rounded-lg",
        "transition-all duration-300",
        "overflow-hidden",
        "group",
        "before:content-['']",
        "before:absolute",
        "before:top-1/2",
        "before:left-1/2",
        "before:w-0",
        "before:h-0",
        "before:-translate-x-1/2",
        "before:-translate-y-1/2",
        "before:bg-white/30",
        "before:rounded-full",
        "group-hover:before:w-96",
        "group-hover:before:h-96",
        "before:transition-all",
        "before:duration-500",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
}
