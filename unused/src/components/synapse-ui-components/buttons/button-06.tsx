import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button06Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button06({
  className,
  children = "Slide Button",
  ...props
}: Button06Props) {
  return (
    <Button
      className={cn(
        "relative h-11 px-8",
        "bg-zinc-900 dark:bg-zinc-50",
        "text-zinc-50 dark:text-zinc-900",
        "rounded-lg",
        "transition-all duration-300",
        "overflow-hidden",
        "group",
        "before:content-['']",
        "before:absolute",
        "before:top-0",
        "before:left-0",
        "before:w-full",
        "before:h-full",
        "before:bg-gradient-to-r",
        "before:from-transparent",
        "before:via-white/30",
        "before:to-transparent",
        "before:-translate-x-full",
        "group-hover:before:translate-x-full",
        "before:transition-transform",
        "before:duration-500",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
}
